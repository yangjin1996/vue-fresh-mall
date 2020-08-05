<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <ul class="container-box">
    <li class="goods">
      <div class="order-num">
        <span>订单编号：123456789</span>
        <span></span>
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
  <div class="reasons">
    <p class="detail">售后原因</p>
    <div class="text">
      <textarea class="text-area" placeholder="请清晰详细说明售后的原因......" v-model="textNumber"></textarea>
      <div class="count-num"><span>{{textNumber.length}}</span>/<span ref="maxNumber">{{maxNumber}}</span></div>
    </div>
  </div>
  <div class="files">
    <p class="detail">上传</p>
    <div class="text">
      上传图片
    </div>
  </div>
  <div class="submmit">
    提交售后
  </div>
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
      backUrl:'/',
      back:true,
      title:'申请售后',
      textNumber:'',
      maxNumber:200
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap{
  padding-top:.8rem;
  box-sizing: border-box;
  .container-box{
    padding:.2rem;
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
  .reasons{
    width:100%;
    height:3.6rem;
    padding:.2rem;
    background-color: #fff;
    box-sizing: border-box;
    .detail{
      padding-bottom:.2rem;
      box-sizing: border-box;
      color:#333;
      font-size: .28rem;
    }
    .text{
      height:2.6rem;
      margin:0 .1rem;
      position: relative;
      .text-area{
        width:100%;
        height:100%;
        background-color: #eee;
        border-radius: .1rem;
        resize: none;
        padding:.25rem;
        box-sizing: border-box;
      }
    }
    .count-num{
      position: absolute;
      right:.3rem;
      bottom:.3rem;
      font-size:.24rem;
      color:#909090;
    }
  }
  .files{
    width:100%;
    height:2.8rem;
    padding:.2rem;
    margin-top:.2rem;
    background-color: #fff;
    box-sizing: border-box;
    .detail{
      padding-bottom:.2rem;
      box-sizing: border-box;
      color:#333;
      font-size: .28rem;
    }
    .text{
      width:2rem;
      height:2rem;
      margin-left:.1rem;
      border-radius: 0.05rem;
      background-color: #eee;
      @include d-flex;
      font-size: .26rem;
      color:#909090;
    }
  }
  .submmit{
    width:90%;
    height:.8rem;
    margin:0 auto;
    margin-top:.2rem;
    font-size: .28rem;
    background-color: $color-a;
    color:#fff;
    border-radius: .05rem;
    @include d-flex;
  }
}
</style>