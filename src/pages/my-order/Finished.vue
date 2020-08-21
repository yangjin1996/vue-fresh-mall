<template>
<div v-show="Finished === 'finished'">
  <ul class="container-box" v-show="finishedData.length > 0">
    <li class="goods-container" v-for="order of finishedData" :key="order.id" @click= "$router.push('/order-detail?id=' + order.id)">
      <div class="order-num">
        <span>订单编号：{{order.order_no}}</span>
        <span>待收货</span>
      </div>
      <div class="order-detail" v-for="item of order.goods" :key="item.goods_id">
        <img class="goods-img" :src="item.goods_img">
        <div class="goods-info">
          <p class="goods-title">{{item.goods_name}}</p>
          <p class="goods-market-peice">{{item.goods_price}}</p>
          <p class="goods-price">￥{{item.goods_price}}</p>
        </div>
        <span class="cart iconfont">X{{item.buy_number}}</span>
      </div>
      <div class="time">
        <span>时间：{{order.create_time|dateFormat}}</span>
        <p>共计{{order.goods.length}}件<span class="total-money">￥{{order.total_price}}</span></p>
      </div>
      <div class="operation">
        <p class="button" @click.stop="receivedGoods(order.id)">确认收货</p>
      </div>
    </li>
  </ul>
  <div class="no-goods" v-show="!finishedData.length">
    <img src="../../assets/images/no-goods.png">
    <p>没有查询到相关订单哦！</p>
  </div>
</div>
</template>

<script>
import {dateFormat} from '@/utils/function';
import {Token} from '@/utils/token';
export default {
  props:{
    Finished:String,
    finishedData:Array
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY-mm-dd',new Date(date * 1000))
    }
  },
  methods: {
    receivedGoods(id){
      this.$showModel({
        title:'是否确认收货？',
        btn : {confirm:'确认收货',cancel:'取消'},
        success: res => {
          if(res.confirm){
            this.confirmOrder(id);
            this.deleteData(id);
          }
        }
      })
    },
    deleteData(id){
      let idList = this.finishedData.map(res => {
        return res.id
      })
      let index = idList.indexOf(id);
      this.finishedData.splice(index,1)
    },
    async confirmOrder(id) {
      const USER_TOKEN = Token.getToken()
      this.$showLoading(true)
      await this.axios.post('api/user/orderConfirm?type=2',{id},{
        headers:{
          token:USER_TOKEN
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.$showLoading()
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
  .goods-container{
    width:100%;
    padding:.2rem;
    margin-bottom:.2rem;
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
      line-height: .35rem;
      margin-top: .25rem;
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
          width:3.5rem;
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
    .operation{
      width:100%;
      display: flex;
      justify-content: flex-end;
      color:#fff;
      font-size: .28rem;
      .button{
        width:2rem;
        height:.55rem;
        margin-top:.35rem;
        background-color: $color-a;
        @include d-flex;
        border-radius: .05rem;
      }
    }
  }
}
.no-goods{
  width:100%;
  height:4rem;
  @include d-flex($flex-d:column);
  img{
    width:2rem;
    height:2rem;
  }
  p{
    font-size:.3rem;
    color: #999;
    margin-top:.2rem;
  }
}
</style>