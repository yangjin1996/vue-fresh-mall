<template>
<div class='wrap' v-show="Consignment === 'consignment'">
  <ul class="container-box">
    <li class="goods" v-for="order of consignmentData" :key="order.id">
      <div class="order-num">
        <span>订单编号：{{order.order_no}}</span>
        <span>待发货</span>
      </div>
      <div class="order-detail" v-for="item of order.goods" :key="item.goods_id" @click = toGoodsDetail(item.goods_id)>
        <img class="goods-img" :src="item.goods_img">
        <div class="goods-info">
          <p class="goods-title">{{item.goods_name}}</p>
          <p class="goods-market-peice">{{item.goods_price}}</p>
          <p class="goods-price">￥{{item.goods_price}}</p>
        </div>
        <span class="cart iconfont">X{{item.buy_number}}</span>
      </div>
      <div class="time">
        <span>时间：{{getOrderTime(order.create_time)}}</span>
        <p>共计{{order.goods.length}}件<span class="total-money">￥{{order.total_price}}</span></p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props:{
    Consignment:String,
    consignmentData:Array
  },
  methods: {
    getOrderTime(dates){
      let date = new Date(dates);
      let year=date.getFullYear();// getFullYear() 返回年
      let month=date.getMonth()+1;// getMonth() 返回月份 (0 ~ 11)
      let day = date.getDate();// getDate() 返回日 (1 ~ 31)
      // let hours=date.getHours(); // getHours() 返回小时 (0 ~ 23)
      // let minutes=date.getMinutes();// getMinutes() 返回分(0 ~ 59)
      // let seconds=date.getSeconds();// getSeconds() 返回秒(0 ~ 59)
      return year + '.' + month + '.' + day;
    },
    toGoodsDetail(goods_id){
      this.$router.push({
        path:'/goods-detail',
        query:{
          goods_id
        }
      })
    }
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.container-box{
  padding:0 .2rem;
  box-sizing: border-box;
  .goods{
    width:100%;
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
      margin-top:.32rem;
      @include d-flex($justify-c:space-between);
      .total-money{
        color:#ef8203;
      }
    }
    .order-detail{
      width:100%;
      padding:0 .1rem;
      margin-top:.3rem;
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