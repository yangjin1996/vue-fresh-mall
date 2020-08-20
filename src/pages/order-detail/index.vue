<template>
<div class="page">
  <common-header :backUrl="backUrl" :title="title" :back="back"></common-header>
  <div class="header-container">
    <div class="order-status">
      <span class="iconfont">&#xe70f;</span>
      <span class="status-text">{{handelStatus(order.status)}}</span>
    </div>
    <div class="order-address">
      <div class="consignee-info">
        <p>收货人：{{address.name}}</p>
        <p>{{address.phone}}</p>
      </div>
      <div class="address-info">
        <span class="iconfont">&#xe656;</span>
        <span class="address">收货地址：{{address.province+address.city+address.area+address.address}}</span>
      </div>
    </div>
  </div>
  <div class="header-bar"></div>
  <ul class="goods-list">
    <li class="goods" v-for="item of order.goods" :key="item.goods_id" @click="$router.push('/goods-detail?id=' + item.goods_id)">
      <div class="order-detail">
        <img class="goods-img" :src="item.goods_img">
        <div class="goods-info">
          <p class="goods-title">{{item.goods_name}}</p>
          <p class="goods-market-peice">{{item.goods_price}}</p>
          <p class="goods-price">￥{{item.goods_price}}</p>
        </div>
        <span class="cart iconfont">X{{item.buy_number}}</span>
      </div>
    </li>
  </ul>
  <div class="order-msg">
    <div class="order-num">
      <span class="menu">订单编号：</span>
      <span class="content">{{order.order_no}}</span>
    </div>
    <div class="order-num">
      <span class="menu">下单时间：</span>
      <span class="content">{{order.create_time|dateFormat}}</span>
    </div>
  </div>
  <div class="operate-container">
    <div class="operate" @click="userOperate(order)">{{handelOperate(order.status)}}</div>
  </div>
</div>
</template>

<script>
import {Token} from'@/utils/token';
import CommonHeader from'@/components/Header';
import {dateFormat} from '@/utils/function'
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      id:0,
      backUrl:'/',
      title:'订单详情',
      back:true,
      order:{},
      address:{}
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY-mm-dd HH:MM:SS',new Date(date * 1000))
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted() {
    this.id = parseInt(this.$route.query.id)
    this.getOrder()
  },
  methods: {
    async getOrder(){
      const token = Token.getToken()
      this.$showLoading(true);
      await this.axios.get('shose/order',{
        params:{
          id:this.id
        },
        headers:{
          token
        }
      }).then(res => {
        this.order = res.data.data.order;
        this.address = res.data.data.order.address;
        this.$showLoading();
      })
    },
    handelStatus(status){
      if(status === 1){
        return '待发货'
      }
      if(status === 2){
        return '待收货'
      }
      if(status === 1){
        return '已完成'
      }
    },
    handelOperate(status){
      if(status === 1){
        return '提醒发货'
      }
      if(status === 2){
        return '确认收货'
      }
      if(status === 1){
        return '申请售后'
      }
    },
    userOperate(item){
      if(item.status === 1){
        this.$showModel({
          showText: "提醒卖家发货消息成功",
          showMask:false
        })
        return
      }
      if(item.status === 2){
        this.$showModel({
          title:'是否确认收货？',
          btn : {confirm:'确认收货',cancel:'取消'},
          success:res => {
            if(res.confirm){
              console.log(item.status)
            }
          }
        })
      }
      if(item.status === 3){
        console.log(item.status)
        // this.$router.push({
        //   path:'/after-sales-detail',
        //   query:{
        //     finishedData:JSON.stringify(this.finishedData)
        //   }
        // })
      }
      
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  padding-top: $Header-h;
  box-sizing: border-box;
  .header-container{
    width:100%;
    height:2.15rem;
    padding:.4rem .2rem;
    box-sizing: border-box;
    background-color: $color-a;
    position: relative;
    .order-status{
      color:#fff;
      @include d-flex($justify-c:flex-start);
      span{
        font-size: .32rem;
        &.iconfont{
          font-size: .5rem;
        }
        &.status-text{
          margin-left:.2rem;
        }
      }
    }
    .order-address{
      width:90%;
      height:2.04rem;
      padding:.4rem .2rem;
      border:1px solid #f5f5f5;
      box-sizing: border-box;
      background-color: #fff;
      position: absolute;
      top:1.1rem;
      left:5%;
      @include d-flex($flex-d:column,$justify-c:space-between,$aligin-i:flex-start);
      .consignee-info{
        width:100%;
        padding-left:.4rem;
        box-sizing: border-box;
        font-size: .28rem;
        color:#1a1a1a;
        @include d-flex($justify-c:space-between);
      }
      .address-info{
        width:100%;
        color:#666;
        @include d-flex($justify-c:flex-start,$aligin-i:flex-start);
        .iconfont{
          font-size:.28rem;
        }
        .address{
          font-size:.28rem;
          margin-left:.2rem;
        }
      }
    }
  }
  .header-bar{
    width:100%;
    height:.97rem;
    background-color: #fff;
  }
  .goods-list{
    width:100%;
    margin-top:.2rem;
    .goods{
      width:100%;
      height:2.6rem;
      background-color: #fff;
      padding:.4rem;
      box-sizing: border-box;
      margin-bottom: .1rem;
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
    }
  }
  .order-msg{
    width:100%;
    margin-top:.2rem;
    padding: 0 .2rem;
    background-color: #fff;
    box-sizing: border-box;
    .order-num{
      width:100%;
      height:.8rem;
      @include d-flex($justify-c:space-between);
      .menu{
        font-size: .28rem;
        color:#999;
      }
      .content{
        font-size: .28rem;
        color:#333;
      }
    }
  }
  .operate-container{
    width:100%;
    height:.97rem;
    padding-right:.2rem;
    background-color: #fff;
    box-sizing: border-box;
    @include d-flex($justify-c:flex-end);
    position: fixed;
    left:0;
    bottom: 0;
    .operate{
      width:1.52rem;
      height:.47rem;
      color:#fff;
      font-size: .26rem;
      background-color: $color-a;
      border-radius: .05rem;
      @include d-flex;
    }
  }
}

</style>