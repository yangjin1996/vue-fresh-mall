<template>
<div class="recommend-goods">
  <h2>-- 推荐商品 --</h2>
  <ul class="recommend-list">
    <li v-for="(item,index) of goodsList" :key="index" class="recommend-cell" @click="toGoodsDetail(item.id)">
      <img v-lazy="item.img" alt="">
      <div class="goods-info">
        <h3>{{item.name}}</h3>
        <p class="goods-sale-num">已售{{item.sale_num}}箱</p>
        <p class="goods-price">￥{{item.price}}</p>
        <span class="cart iconfont" @click.stop="addCart(item)">&#xe63b;</span>
      </div>
    </li>
  </ul>
  <div v-if="goodsList.length && pullingUp" class="loading">加载中 <img src="@/assets/images/loading.gif"></div>
  <div v-else class="loading">已经到底了哦~</div>
</div>
</template>

<script>
import { Storage } from'@/utils/storage.js';
export default {
  props:{
    goodsList:{
      type:Array,
    },
    pullingUp:{
      type:Boolean,
    }
  },
  data() {
    return {
      cartGoodsList:[],
      buyNumber:1,
    }
  },
  methods: {
    toGoodsDetail(goods_id){
      this.$router.push({
        path:'/goods-detail',
        query:{
          goods_id
        }
      })
    },
    addCart(item){
      const goodsList = Storage.getItem('cartGoodsList');
      let list = [];
      if(goodsList !== '[]'){
        list = goodsList;
        list.push(item);
        this.cartGoodsList = list;
      }else{
        list.push(item);
        this.cartGoodsList = list;
      }
      Storage.setItem('cartGoodsList',this.cartGoodsList);
    },
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.recommend-goods{
  margin-bottom: 1rem;
  h2{
    padding-top:.2rem;
    font-size: .28rem;
    color:$color-a;
    text-align: center;
  }
  .recommend-list{
    margin: .2rem;
    margin-bottom:0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .recommend-cell{
      width:3.43rem;
      height:4.9rem;
      margin-bottom: .2rem;
      background-color: #fff;
      border-radius: .1rem;
      overflow: hidden;
      img{
        width:100%;
        height:3.45rem;
      }
      .goods-info{
        margin:.2rem;
        margin-top:0;
        position: relative;
        h3{
          line-height: .6rem;
          font-size: .28rem;
          color:#1a1a1a;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-sale-num{
          font-size: .24rem;
          color:#999;
        }
        .goods-price{
          margin-top:.2rem;
          font-size: .24rem;
          color:#ef8203;
        }
        .cart{
          font-size: .5rem;
          position: absolute;
          right:0;
          bottom: 0;
          color:$color-a;
        }
      }
    }
  }
  .loading{
    font-size:.2rem;
    color:#999;
    line-height:.5rem;
    padding-bottom:.2rem;
    text-align:center;
    img{
      width:.3rem;
      height:.3rem;
    }
  }
}
</style>