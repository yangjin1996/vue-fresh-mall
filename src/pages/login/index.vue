<template>
<div class="wrapper">
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="container name-container">
    <input type="text" placeholder="请输入账号(长度为2-6位)" @blur="checkName" v-model.trim="Name">
    <span v-show="Name" class="iconfont" @click="deleteName">&#xe64a;</span>
  </div>
  <div class="container password-container">
    <input :type="type" placeholder="请输入6位登陆密码" @blur="checkPwd" v-model.trim="Password">
    <div class="icon">
      <span v-show="Password" class="iconfont delete" @click="deletePassword">&#xe64a;</span>
      <span class="iconfont" @click="change">{{type === 'password' ? '&#xe608;' : '&#xe64f;'}}</span>
    </div>
  </div>
  <div class="login" @click="login">登陆</div>
  <router-link tag="div" :to="'/register?url=' + loginRedirecte" class="to-register">免费注册</router-link>
</div>

</template>

<script>
import CommonHeader from'@/components/Header';
import {Token} from'@/utils/token';
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
      type:'password',
      loginRedirecte:'/',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
      vm.loginRedirecte = to.query.url
    })
  },
  methods: {
    change(){
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    deleteName(){
      this.Name = ''
    },
    deletePassword(){
      this.Password = ''
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
    async login(){
      const data = {
        username:this.Name,
        password:this.Password
      }
      this.$showLoading(true)
      await this.axios.post('shose/user/login',data).then(res => {
        if(res.data.error_msg === 'ok'){
          res.data.error_msg = '登陆成功';
          const token = res.data.data.token
          Token.setToken(token,1)
          this.$router.push(this.loginRedirecte)
          this.$showLoading()
        }
        this.$showModel({
          showText:res.data.error_msg,
          showMask:true
        })
      }).catch(err => {
        console.log(err)
      })
    },
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
  .to-register{
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