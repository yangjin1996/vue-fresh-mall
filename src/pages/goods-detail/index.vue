<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :title="title" :back="back"></common-header>
  <goods-swiper :goodsSwiperList="goodsSwiperList"></goods-swiper>
  <div class="goods-mes">
    <div class="goods-info">
      <h3 class="goods-title">{{goods.goods_name}}</h3>
      <p class="goods-note">市场价：<span>{{goods.market_price}}</span></p>
      <p class="goods-price">代理价：<span>￥{{goods.goods_price}}</span></p>
    </div>
    <div class="sale-num">
      <span class="select-num">选择数量</span>
      <div class="button">
        <span class="iconfont reduce" @click="reduceNumber">&#xe60c;</span>
        <span class="number">{{buyNumber}}</span>
        <span class="iconfont add" @click="addNumber">&#xe626;</span>
      </div>
    </div>
  </div>
  <div class="goods-img">
    <h3><span>—— </span>商品详情<span> ——</span></h3>
    <img v-for="(item,index) of goods.content" :src="item" :key="index" />
  </div>
  <div class="user-option">
    <p class="option add-cart" @click="addCart(goods)">加入购物车</p>
    <p class="option buy-goods" @click="buyGoods">立即购买</p>
  </div>
  <loadings :showLoading="showLoading"></loadings>
</div>
</template>

<script>
import { Storage } from'@/utils/storage.js';
import { Token } from'@/utils/token.js';
import Loadings from '@/components/Loading/Loadings'
import CommonHeader from '@/components/Header'
import GoodsSwiper from './goodsSwiper'
export default {
  components:{
    Loadings,
    CommonHeader,
    GoodsSwiper
  },
  data() {
    return {
      showLoading:true,
      title:'商品详情',
      backUrl:'/',
      back:true,
      goodsSwiperList:[
        '@/assets/images/loading-bubbles.svg',
      ],
      cartGoodsList:[],
      goods:{},
      goods_id:0,
      buyNumber:1,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted() {
    this.getGoodsDetail();
    this.getBuynumber();
  },
  methods: {
    async getGoodsDetail(){
      // 商品详情
      this.goods_id = this.$route.query.goods_id;
      await this.axios.get(`api/goods?goods_id=${this.goods_id}?type=2`).then(res => {
        this.goodsSwiperList = res.data.data.gallery;
        this.goodsImg = res.data.data.goods.content;
        this.goods = res.data.data.goods;
        this.showLoading = false;
      }).catch(() => {
        this.$router.push('/goods-notfind')
      })
    },
    getBuynumber(){
      const id = this.$route.query.goods_id;
      const goodsList = Storage.getItem('cartGoodsList');
      let exeGoods = goodsList.map(val => {
        return val.id;
      })
      let index = exeGoods.indexOf(parseInt(id));
      if(index !== -1){
        this.buyNumber = goodsList[index].buyNumber;
      }
    },
    addCart(item){
      item = this.initToCartGoods(item);
      const goodsList = Storage.getItem('cartGoodsList');
      let list = [];
      let exeGoods = goodsList.map(val => {
        return val.id;
      });
      let index = exeGoods.indexOf(item.id);
      if(index !== -1){
        goodsList[index].buyNumber = this.buyNumber;
        list = goodsList;
      }else{
        item.buyNumber = this.buyNumber;
        list = goodsList;
        list.unshift(item);
      }
      this.cartGoodsList = list;
      Storage.setItem('cartGoodsList',this.cartGoodsList);
      this.$showModel({
        showText:"添加购物车成功"
      })
    },
    buyGoods(){
      const token = Token.getToken('token')
      if(token === ''){
        this.$router.push({
          name:'Login',
          params:'/goods-detail'
        })
      }else{
        this.goods = this.initToCartGoods(this.goods);
        this.goods.buyNumber = this.buyNumber;
        let Money = this.buyNumber * this.goods.price;
        Money = Money.toFixed(2) * 1;
        this.$router.push({
          name:'ConfirmOrder',
          params:{
            cartGoodsList:[this.goods],
            totalMoney:Money,
            goodsNum:this.goods.buyNumber,
          }
        })
      }
    },
    initToCartGoods(item){
      const id = item.goods_id;
      const img = item.goods_img;
      const name = item.goods_name;
      const price = item.goods_price;
      const market_price = item.market_price;
      const sale_num = item.sale_num;
      item = {};
      item.id = id;
      item.img = img;
      item.name = name;
      item.price = price;
      item.market_price = market_price;
      item.sale_num = sale_num;
      return item;
    },
    reduceNumber(){
      if(this.buyNumber === 1){
        return
      }else{
        this.buyNumber -= 1;
      }
    },
    addNumber(){
      this.buyNumber += 1
    },
  }
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
      span{
        text-decoration: line-through;
      }
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