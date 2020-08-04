<template>
<div class="wrapper">
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="container">
    <div class="order-status">
      <div class="time">
        <p class="icon">
          <span class="iconfont">&#xe606;</span>
          <span class="text">待支付</span>
        </p>
        <p>
          剩余<span class="text">1小时59分30秒</span>订单自动关闭
        </p>
      </div>
      <div class="pay">待支付</div>
    </div>
    <div class="address-container">
      <span class="iconfont address-icon">&#xe614;</span>
      <div class="address">
        <div class="user-msg">小舞</div>
        <div class="phone">15236547896</div>
        <div class="detail-address">湖南省长沙市</div>
      </div>
      <span class="iconfont">&#xe60e;</span>
    </div>
    <div class="goods-container">
      <ul class="container-box">
        <li class="goods">
          <img class="goods-img" src="">
          <div class="goods-info">
            <p class="goods-title">火龙果</p>
            <p class="goods-market-peice">￥132.00</p>
            <p class="goods-price">￥96</p>
          </div>
          <span class="cart iconfont">X2</span>
        </li>
        <li class="border-bottom money-info box">
          <span>商品金额</span>
          <span class="total-money">￥96</span>
        </li>
        <li class="border-bottom number-info box">
          <span>商品数量</span>
          <span class="total-num">2件</span>
        </li>
        <li class="border-bottom money-info box order-menu">
          <span>订单编号：<span ref="orderNum">123456789</span></span>
          <span class="total-money" @click="copyNum">复制</span>
        </li>
        <li class="border-bottom number-info box">
          <span>下单时间：2020-07-25</span>
          <span class="total-num"></span>
        </li>
      </ul>
    </div>
  </div>
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
      title:'订单详情',
      back:true,
      backUrl:'/',
      
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path;
    })
  },
  methods: {
    copyNum(){
      let text = this.$refs.orderNum.innerText;
      console.log(text)
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100vw;
  height:100vh;
  padding-top:.8rem;
  box-sizing: border-box;
  .container{
    padding:.2rem;
    box-sizing: border-box;
  }
  .order-status{
    width:100%;
    height:1.3rem;
    padding:.2rem;
    margin-bottom:.2rem;
    box-sizing: border-box;
    background-color: #fff;
    @include d-flex($justify-c:space-between);
    .time{
      height:100%;
      @include d-flex($flex-d:column,$justify-c:space-between,$aligin-i:flex-start);
      .icon{
        @include d-flex($justify-c:space-between);
        .iconfont{
          color:#33b5fa;
          font-size: .32rem;
        }
        .text{
          margin-left:.2rem;
        }
      }
      .text{
        color:$color-a;
      }
    }
    .pay{
      width:1.2rem;
      height: .54rem;
      border-radius: .1rem;
      background-color: $color-a;
      color:#fff;
      @include d-flex;
      font-size: .3rem;
    }
  }
  .address-container{
    width:100%;
    height:2.15rem;
    padding:.4rem .2rem;
    background-color: #fff;
    @include d-flex($justify-c:space-between);
    box-sizing: border-box;
    .iconfont{
      font-size:.4rem;
      color:#666;
    }
    .address{
      width:0;
      flex:1;
      height:100%;
      margin-left:.35rem;
      @include d-flex($flex-d:column,$justify-c:space-between,$aligin-i:flex-start);
      .user-msg{
        font-size:.32rem;
        color:#2b2b2b;
        font-weight: bold;
      }
      .phone{
        font-size:.32rem;
        color:#2b2b2b;
        font-weight: bold;
      }
      .detail-address{
        line-height: .4rem;
        font-size:.28rem;
        color:$color-s;
      }
    }
    .add-address{
      display: flex;
      width: 0;
      flex: 1;
      margin-left:.32rem;
      font-size: .32rem;
      color:#2b2b2b;
      font-weight: bold;
    }
    .address-icon{
      color:#26b0fa;
    }
  }
  .goods-container{
    width:100%;
    margin-top:.2rem;
    overflow: hidden;
    .goods{
      width:100%;
      height:2.6rem;
      margin-bottom:.2rem;
      padding:.45rem .2rem;
      box-sizing:border-box;
      background-color:#fff;
      display:flex;
      position:relative;
      .goods-info{
        width:3.35rem;
        margin-left:.2rem;
        padding:.25rem 0;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        .goods-title{
          font-size:.28rem;
          color:#2b2b2b;
          font-weight:550;
          width:2.8rem;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
        .goods-market-peice{
          height:0;
          flex:1;
          font-size:.26rem;
          margin-top:.15rem;
          text-decoration: line-through;
          color:#2b2b2b;
          font-weight:550;
        }
        .goods-price{
          color:#ef8203;
        }
      }
      .cart{
        font-size:.26rem;
        color:#666;
        position:absolute;
        right:.2rem;
        bottom:.6rem;
      }
      .goods-img{
        width:1.8rem;
        height:1.8rem;
        border-radius:.1rem;
      }
    }
  }
  .box{
    width:100%;
    height:.9rem;
    padding:.4rem .2rem;
    background-color: #fff;
    box-sizing: border-box;
    @include d-flex($justify-c:space-between);
    span{
      font-size:.28rem;
      color:#2b2b2b;
    }
    .total-money{
      font-size:.24rem;
      color:#ef8203;
    }
    .total-num{
      font-size:.24rem;
      color:#666;
    }
  }
  .order-menu{
    margin-top:.2rem;
  }
}

</style>