<template>
<div class="wrapper">
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="container">
    <input type="text" placeholder="请输入账号(长度为2-6位)" @blur="checkName" v-model.trim="Name">
    <span v-show="Name" class="iconfont" @click="deleteName">&#xe64a;</span>
  </div>
  <div class="container password-container">
    <input :type="typeF" placeholder="请输入6位登陆密码" @blur="checkPwd" v-model.trim="Password">
    <div class="icon">
      <span v-show="Password" class="iconfont delete" @click="deletePassword">&#xe64a;</span>
      <span class="iconfont" @click="changeF">{{typeF === 'password' ? '&#xe608;' : '&#xe64f;'}}</span>
    </div>
  </div>
  <div class="container password-container">
    <input :type="typeS" placeholder="请确认登陆密码" @blur="checkconfirmPwd" v-model.trim="confirmPwd">
    <div class="icon">
      <span v-show="confirmPwd" class="iconfont delete" @click="deleteConfirmPwd">&#xe64a;</span>
      <span class="iconfont" @click="changeS">{{typeS === 'password' ? '&#xe608;' : '&#xe64f;'}}</span>
    </div>
  </div>
  <div class="container">
    <input type="text" placeholder="请输入昵称" @blur="checknickname" v-model.trim="nickname">
    <span v-show="nickname" class="iconfont" @click="deleteNickname">&#xe64a;</span>
  </div>
  <div class="login" @click="register">注册</div>
  <router-link tag="div" to="/login" class="register" @click="register">去登陆</router-link>
</div>

</template>

<script>
import CommonHeader from'@/components/Header';
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      title:'账户登陆',
      backUrl:'/',
      back:true,
      Name:'',
      Password:'',
      typeF:'password',
      typeS:'password',
      confirmPwd:'',
      nickname:''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  methods: {
    changeF(){
      this.typeF = this.typeF === 'password' ? 'text' : 'password'
    },
    changeS(){
      this.typeS = this.typeS === 'password' ? 'text' : 'password'
    },
    deleteName(){
      this.Name = ''
    },
    deletePassword(){
      this.Password = ''
    },
    deleteConfirmPwd(){
      this.confirmPwd = ''
    },
    deleteNickname(){
      this.nickname = ''
    },
    checkName(){
      if(this.Name.length < 2 || this.Name.length > 8){
        this.$showModel({
          showText:"账号应为2-8位",
          showMask:true
        })
      }
      return
    },
    checkPwd(){
      if(this.Password.length !== 6){
        this.$showModel({
          showText:"密码长度为6",
          showMask:true
        })
      }
      return
    },
    checkconfirmPwd(){
      if(this.confirmPwd !== this.Password){
        this.$showModel({
          showText:"两次输入的密码不一致",
          showMask:true
        })
      }
      return
    },
    checknickname(){
      if(this.nickname === ''){
        event.target.focus()
        this.$showModel({
          showText:"昵称不能为空",
          showMask:true
        })
      }
      return
    },
    async register(){
      const data = {
        username:this.Name,
        password:this.Password,
        confirmPwd:this.confirmPwd,
        nickname:this.nickname
      }
      this.$showLoading(true,true)
      await this.axios.post(`shose/user/register`,data).then(() => {
        this.$showLoading()
        this.$showModel({
          showText:'注册成功',
          showMask:true
        })
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  padding-top:1.1rem;
  background-color: #f5f5f5;
  .container{
    padding-left:.2rem;
    padding-right:.2rem;
    background-color: #fff;
    border-bottom:1px solid #ddd;
    box-sizing: border-box;
    @include d-flex($justify-c:space-between);
    input{
      width:80%;
      height:.9rem;
      border:none;
      outline: medium;
    }
  }
  .password-container{
    .icon{
      .delete{
        margin-right:.1rem;
      }
    }
  }
  .login{
    width:90%;
    height:.9rem;
    margin:0 auto;
    margin-top:.3rem;
    background-color: $color-a;
    @include d-flex;
    font-size: .32rem;
    color:#fff;
    border-radius: .1rem;
  }
  .register{
    width:100%;
    margin-top:.2rem;
    padding-right:5%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    color:$color-a;
    font-size: .28rem;
  }
}
span{
  font-size:.38rem;
}
</style>