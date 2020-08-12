<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <div id="wrapper-container">
    <div class="atatar-container">
      <div class="avatar-img">
        <img :src="userInfo.avatar">
        <input class="avatar-bar" type="file" accept="image/*" @change="selectAvatar">
      </div>
      <div class="vip-container">
        <span class="nickname">{{userInfo.nickname}}</span>
        <div class="vip-msg iconfont">&#xe600;代理</div>
      </div>
      <div class="coding">
        <span class="iconfont icon" @click="showCo">&#xe7a0;</span>
        <div class="show" v-show="Code">
          <div class="showImg">
            <img src="../../assets/images/coding.png" alt="">
            <span class="iconfont delete" @click="hideCode">&#xe64a; </span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-container">
      <router-link tag="div" to="/my-order" class="my-order border-bottom" >
        <span>我的订单</span>
        <div class="all-order"><p>查看全部</p><span class="iconfont">&#xe60e;</span></div>
      </router-link>
      <ul class="order-status">
        <li @click="toConsignment">
          <span class="iconfont">&#xe601;</span>
          <p>待发货</p>
        </li>
        <li @click="toReceived">
          <span class="iconfont">&#xe6b1;</span>
          <p>待收货</p>
        </li>
        <li @click="toFinished">
          <span class="iconfont">&#xe63f;</span>
          <p>已完成</p>
        </li>
        <li @click="toAfterSales">
          <span class="iconfont">&#xe624;</span>
          <p>售后</p>
        </li>
      </ul>
    </div>
    <ul class="list">
      <li>
        <div class="context">
          <span class="iconfont">&#xe602;</span>
          <p>我的提成</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </li>
      <li>
        <div class="context">
          <span class="iconfont">&#xe65f;</span>
          <p>会员中心</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </li>
      <router-link tag="li" to="/message">
        <div class="context">
          <span class="iconfont">&#xe637;</span>
          <p>消息中心</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </router-link>
      <router-link tag="li" to="/user-address">
        <div class="context">
          <span class="iconfont">&#xe656;</span>
          <p>收货地址</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </router-link>
    </ul>
  </div>
  <div class="sign-out" @click="chooseDate">退出登录</div>
  <awesome-picker
  ref="picker"
  type="date"
  :colorConfirm="'#8fc321'"
  @confirm="handlePickerConfirm">
</awesome-picker>
  <common-footer :current="current"></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header';
import CommonFooter from '@/components/Footer';
import {Token} from '@/utils/token';
const USER_TOKEN = Token.getToken()
export default {
  components:{
    CommonHeader,
    CommonFooter,
  },
  data() {
    return {
      title:'个人中心',
      back:true,
      current:3,
      Code:false,
      userInfo:{}
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser(){
      this.$showLoading(true)
      await this.axios.get('api/user?type=2',{
        headers:{
          token:USER_TOKEN
        }
      }).then(res => {
        this.userInfo = {
          avatar:res.data.data.avatar,
          nickname:res.data.data.nickname,
        }
      }).finally(() => {
        this.$showLoading(false)
      })
    },
    toConsignment(){
      this.$router.push({
        path:'/my-order',
        query:{
          category:'consignment'
        }
      })
    },
    toReceived(){
      this.$router.push({
        path:'/my-order',
        query:{
          category:'received'
        }
      })
    },
    toFinished(){
      this.$router.push({
        path:'/my-order',
        query:{
          category:'finished'
        }
      })
    },
    toAfterSales(){
      this.$router.push({
        path:'/my-order',
        query:{
          category:'after-sales'
        }
      })
    },
    async selectAvatar(e){
      if(e.target.files.length > 0){
        const file = e.target.files[0];
        const allowType = ['jpg','png','jpeg','svg','gif'];
        const fileType = e.target.files[0].name.split('.').pop();
        if(!allowType.includes(fileType)){
          this.$showModel({
            showText:'图片类型错误'
          })
          return
        }
        
        const maxSize = 1024 * 1024;
        if(file.size > maxSize){
          this.$showModel({
            showText:'图片尺寸太大'
          })
          return
        }
        //上传头像
        let data = new FormData();
        data.append('image',file)
        this.$showLoading(true)
        await this.axios.post('api/user/avatar?type=2',data,{
          headers:{
            token:USER_TOKEN,
            'Content-Type':'multipart/form/data'
          }
        }).then(res => {
          this.userInfo.avatar = res.data.data.src
        }).finally(() => {
          this.$showLoading(false)
        })
      }
    },
    showCo(){
      this.Code = true
    },
    hideCode(){
      this.Code = false
    },
    chooseDate(){
      this.$refs.picker.show();
    },
    handlePickerConfirm(){

    }
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
#wrapper-container{
  width:100%;
  padding-top:.8rem;
  box-sizing: border-box;
}
.atatar-container{
  width:100%;
  height:2.4rem;
  background-color: $color-a;
  padding:.65rem .4rem;
  box-sizing: border-box;
  display: flex;
  .avatar-img{
    width:1.1rem;
    height:1.1rem;
    border-radius: 50%;
    border: 1px solid #d8917c;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    img{
      width:100%;
      height:100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .avatar-bar{
      width:100%;
      height:100%;
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0;
    }
  }
  .vip-container{
    width:0;
    flex:1;
    height:1.1rem;
    margin-left:.2rem;
    padding:.1rem 0;
    color:#fff;
    font-size:.28rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .vip-msg{
      width:1.2rem;
      height:.4rem;
      font-size:.2rem;
      border-radius: .2rem;
      background-color: #ef8203;
      @include d-flex;
    }
  }
  .coding{
    @include d-flex;
    .icon{
      font-size: .7rem;
    }
    .show{
      width:100vw;
      height:100vh;
      background-color: rgba($color: #000000, $alpha: .3);
      @include d-flex;
      position: fixed;
      left:0;
      top:0;
      z-index: 9;
      .showImg{
        padding:.2rem;
        width:1.2rem;
        height:1.2rem;
        background-color: #fff;
        img{
          width:100%;
          height:100%;
        }
        .delete{
          font-size: .4rem;
          position: absolute;
          top:58%;
          left:50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
.order-container{
  margin-top:.2rem;
  .my-order{
    height:.9rem;
    font-size: .28rem;
    color:#4c4c4c;
    background-color: #fff;
    padding:.28rem .2rem;
    box-sizing: border-box;
    @include d-flex($justify-c:space-between);
    .all-order{
      width:1.3rem;
      font-size: .2rem;
      color:#4c4c4c;
      @include d-flex($justify-c:space-between);
      .iconfont{
        font-size: .3rem;
        color:#4c4c4c;
      }
    }
  }
  .order-status{
    height:1.5rem;
    background-color: #fff;
    padding:.35rem;
    box-sizing: border-box;
    display: flex;
    @include d-flex($justify-c:space-around);
    li{
      height:100%;
      @include d-flex($flex-d:column,$justify-c:space-between);
      .iconfont{
        font-size:.4rem;
        color:#333;
      }
      p{
        font-size: .26rem;
        color:#666;
      }
    }
  }
}
.list{
  width:100%;
  height:3.6rem;
  margin-top:.2rem;
  padding:.2rem;
  background-color: #fff;
  box-sizing:border-box;
  @include d-flex($flex-d:column,$justify-c:space-between,$aligin-i:stretch);
  li{
    height:.4rem;
    @include d-flex($justify-c:space-between);
    .context{
      width:1.7rem;
      @include d-flex($justify-c:space-between);
      .iconfont{
        color:#333;
        font-size:.4rem;
      }
      p{
        font-size:.28rem;
        color:#333;
      }
    }
  }
}
.sign-out{
  width:90%;
  height:.8rem;
  border-radius: .1rem;
  background-color: $color-a;
  color:#fff;
  font-size: .3rem;
  @include d-flex;
  position: fixed;
  left:5%;
  bottom:2.6rem;
}
</style>