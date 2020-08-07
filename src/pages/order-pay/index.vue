<template>
<div class="wrapper">
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="icon">
    <span class="iconfont">&#xe627;</span>
    <span class="text">下单成功</span>
  </div>
  <div class="order-msg">
    <div class="order">
      <p>订单编号:</p>
      <span class="num">{{orderNo}}</span>
    </div>
    <div class="order">
      <p>订单金额</p>
      <span class="money">￥{{totalMoney.toFixed(2)}}</span>
    </div>
  </div>
  <p class="status">您的订单已成功提交，请等待平台发货</p>
  <router-link tag="div" to="/" class="back-mall">
    返回商城
  </router-link>
</div>
</template>

<script>
import CommonHeader from '@/components/Header';
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      title:'下单成功',
      back:true,
      backUrl:'/cart',
      orderNo:0,
      totalMoney:0,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.orderNo = to.query.orderNo;
      vm.totalMoney = to.query.total;
    })
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100vw;
  height:100vh;
  background-color: #fff;
}
.icon{
  padding-top:2rem;
  @include d-flex($flex-d:column);
  .iconfont{
    font-size: 1.2rem;
    color:$color-a;
  }
  .text{
    font-size: .36rem;
    color:$color-a;
    margin-top:.3rem;
    font-weight: bold;
  }
}
.order-msg{
  margin-top:.66rem;
  padding:0 .35rem;
  @include d-flex($justify-c:space-between);
  box-sizing: border-box;
  color:#999;
  font-size:.28rem;
  .order{
   @include d-flex($justify-c:space-between); 
   span{
     margin-left:.1rem;
   }
   .num{
     color:#333;
   }
   .money{
     color:#ef8203;
   }
  }
}
.status{
  text-align: center;
  margin-top:.44rem;
  font-size: .32rem;
  color:#666;
}
.back-mall{
  width:3rem;
  height:.7rem;
  margin:0 auto;
  margin-top:.64rem;
  background-color: $color-a;
  font-size: .32rem;
  color:#fff;
   @include d-flex;
   border-radius: .1rem; 
}
</style>