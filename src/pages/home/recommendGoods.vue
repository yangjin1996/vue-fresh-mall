<template>
<div class="recommend-goods">
  <h2>--推荐商品--</h2>
  <ul class="recommend-list">
    <li v-for="(item,index) of goodsList" :key="index" class="recommend-cell">
      <img :src="item.img" alt="">
      <div class="goods-info">
        <h3>{{item.name}}</h3>
        <p class="goods-sale-num">已售{{item.sale_num}}箱</p>
        <p class="goods-price">￥{{item.price}}</p>
        <span class="cart iconfont">&#xe63b;</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props:{
    goodsList:{
      type:Array
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.recommend-goods{
  margin-bottom: 1rem;
  h2{
    padding:.1rem 0;
    font-size: .28rem;
    color:$color-a;
    font-weight: 600;
    text-align: center;
  }
  .recommend-list{
    margin: .2rem;
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
          color:$color-b;
          font-weight: 600;
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
}
</style>