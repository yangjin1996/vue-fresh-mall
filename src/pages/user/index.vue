<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <div id="wrapper-container">
    <div class="atatar-container">
      <div class="avatar-img"></div>
      <div class="vip-container">
        <span class="nickname">小进进</span>
        <div class="vip-msg iconfont">&#xe600;代理</div>
      </div>
    </div>
    <div class="order-container">
      <div class="my-order border-bottom">
        <span>我的订单</span>
        <div class="all-order"><p>查看全部</p><span class="iconfont">&#xe60e;</span></div>
      </div>
      <ul class="order-status">
        <li>
          <span class="iconfont">&#xe601;</span>
          <p>待发货</p>
        </li>
        <li>
          <span class="iconfont">&#xe6b1;</span>
          <p>待收货</p>
        </li>
        <li>
          <span class="iconfont">&#xe63f;</span>
          <p>已完成</p>
        </li>
        <li>
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
      <li>
        <div class="context">
          <span class="iconfont">&#xe637;</span>
          <p>消息中心</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </li>
      <li>
        <div class="context">
          <span class="iconfont">&#xe656;</span>
          <p>收货地址</p>
        </div>
        <span class="iconfont">&#xe60e;</span>
      </li>
    </ul>
  </div>
  <common-footer :current="current"></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
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
      width:1.2rem;
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
</style>