<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <goods-swiper :goodsSwiperList="goodsSwiperList"></goods-swiper>
  <div class="goods-mes">
    <div class="goods-info">
      <h3 class="goods-title">龙果火火龙果火龙果火龙果火龙果龙果火龙果火龙果火龙果</h3>
      <p class="goods-note">源于自然</p>
      <p class="goods-price">代理价：<span>￥20.00</span></p>
    </div>
    <div class="sale-num">
      <span class="select-num">选择数量</span>
      <div class="button">
        <span class="iconfont reduce">&#xe60c;</span>
        <span class="number">1</span>
        <span class="iconfont add">&#xe626;</span>
      </div>
    </div>
  </div>
  <div class="goods-img">
    <h3><span>—— </span>商品详情<span> ——</span></h3>
    <img v-for="(item,index) of goodsSwiperList" :src="item.img" :key="index" />
  </div>
  <div class="user-option">
    <p class="option add-cart">加入购物车</p>
    <p class="option buy-goods">立即购买</p>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import GoodsSwiper from './goodsSwiper'
export default {
  components:{
    CommonHeader,
    GoodsSwiper
  },
  data() {
    return {
      title:'商品详情',
      back:true,
      goodsSwiperList:[
        {img:'https://i01piccdn.sogoucdn.com/d0a46525f7ce3fa1'},
        {img:'https://i02piccdn.sogoucdn.com/911f2849130888fb'},
        {img:'https://i01piccdn.sogoucdn.com/0f310b544e93dfe3'}
      ]
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.goods-mes{
  width:100%;
  .goods-info{
    width:100%;
    height:1.8rem;
    padding:.2rem;
    box-sizing:border-box;
    background-color:#fff;
    .goods-title{
      color:#2d2d2d;
      font-size:.26rem;
      font-weight:550;
      @include text-overflow;
    }
    .goods-note{
      font-size:.24rem;
      color:$color-n;
      margin:.2rem 0 .4rem 0;
    }
    .goods-price{
      color:#2d2d2d;
      font-size:.26rem;
      font-weight:550;
      span{
        color:#ef8203;
      }
    }
  }
  .sale-num{
    width:100%;
    height:.8rem;
    margin:.2rem 0;
    font-weight:550;
    background-color:#fff;
    padding:.24rem .2rem;
    box-sizing:border-box;
    color:#2d2d2d;
    font-size:.26rem;
    @include d-flex($justify-c:space-between);
    .button{
      width:1.4rem;
      height:.4rem;
      @include d-flex($justify-c:space-between);
      .iconfont{
        font-size:.24rem;
        font-weight:600;
        display:inline-block;
        width:.4rem;
        height:.4rem;
        @include d-flex;
      }
      .reduce{
        background-color:#eee;
        color:#a9a9a9;
      }
      .add{
        background-color:$color-a;
        color:#fff;
      }
      .number{
        font-size:.28rem;
      }
    }
  }
}
 .goods-img{
    width:100%;
    margin-bottom:1.2rem;
    h3{
      height:.6rem;
      line-height:.6rem;
      text-align:center;
      font-size:.26rem;
      color:#666;
      font-weight:550;
      span{
        color:$color-n;
      }
    }
    img{
      width:100%;
    }
  }
  .user-option{
    width:100%;
    height:1rem;
    display:flex;
    position:fixed;
    left:0;
    bottom:0;
    .option{
      color:#fff;
      font-size:.26rem;
      width:50%;
      height:1rem;
      @include d-flex;
    }
    .add-cart{
      background-color:#ef8203;
    }
    .buy-goods{
      background-color:$color-a;
    }
  }
</style>