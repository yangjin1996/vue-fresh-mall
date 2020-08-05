<template>
<div class='wrap' v-show="Consignment === 'consignment'">
  <ul class="container-box">
    <li class="goods">
      <div class="order-num">
        <span>订单编号：123456789</span>
        <span>待发货</span>
      </div>
      <div class="order-detail">
        <img class="goods-img" src="">
        <div class="goods-info">
          <p class="goods-title">11152639874526357</p>
          <p class="goods-market-peice">11</p>
          <p class="goods-price">￥123</p>
        </div>
        <span class="cart iconfont">X1</span>
      </div>
      <div class="time">
        <span>时间：2020年3月5日</span>
        <p>共计1件<span class="total-money">￥80.00</span></p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props:{
    Consignment:String
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.container-box{
  padding:0 .2rem;
  box-sizing: border-box;
  .goods{
    width:100%;
    height:3.4rem;
    padding:.2rem;
    margin-bottom: .2rem;
    background-color: #fff;
    color:#6b6b6b;
    box-sizing: border-box;
    @include d-flex($flex-d:column,$justify-c:space-between);
    .order-num{
      width:100%;
      @include d-flex($justify-c:space-between);
    }
    .time{
      width:100%;
      @include d-flex($justify-c:space-between);
      .total-money{
        color:#ef8203;
      }
    }
    .order-detail{
      width:100%;
      padding:0 .1rem;
      height:1.8rem;
      display: flex;
      box-sizing: border-box;
      position: relative;
      .goods-img{
        width:1.8rem;
        height:1.8rem;
        border-radius: .1rem;
        background-color: red;
      }
      .goods-info{
        padding:.2rem;
        display: flex;
        flex-direction: column;
        width:0;
        flex: 1;
        box-sizing: border-box;
        color:#2d2d2d;
        font-size: .28rem;
        .goods-title{
          width:2.2rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .goods-market-peice{
          margin-top:.2rem;
          display: flex;
          height:0;
          flex: 1;
          justify-content: flex-start;
        }
        .goods-price{
          font-size: .24rem;
          color:#ef8203;
        }
      }
      .cart{
        font-size: .24rem;
        color:#666;
        position: absolute;
        right:.2rem;
        bottom:.2rem;
      }
    }
    
  }
}
</style>