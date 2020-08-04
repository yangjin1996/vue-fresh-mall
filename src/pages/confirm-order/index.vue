<template>
<div class='wrap'>
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="wrpper-container">
    <router-link tag="div" class="address-container" to="/user-address">
      <span class="iconfont address-icon">&#xe614;</span>
      <div class="address" v-if="Object.keys(this.address).length">
        <div class="user-msg">{{address.name}}</div>
        <div class="phone">{{address.phone}}</div>
        <div class="detail-address">{{address.province+address.city+address.area+address.address}}</div>
      </div>
      <div v-else class="add-address">
        请选择收货地址
      </div>
      <span class="iconfont">&#xe60e;</span>
    </router-link>
    <div class="goods-container" ref="goodsContainer">
      <ul class="container-box">
        <li class="goods" v-for="item of goodsList" :key="item.id">
          <img class="goods-img" :src="item.img">
          <div class="goods-info">
            <p class="goods-title">{{item.name}}</p>
            <p class="goods-market-peice">{{item.market_price}}</p>
            <p class="goods-price">￥{{item.price}}</p>
          </div>
          <span class="cart iconfont">X{{item.buyNumber}}</span>
        </li>
        <li class="border-bottom money-info box">
          <span>商品金额</span>
          <span class="total-money">￥{{totalMoney.toFixed(2)}}</span>
        </li>
        <li class="border-bottom number-info box">
          <span>商品数量</span>
          <span class="total-num">{{goodsNum}}件</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="buy-goods boorder-top">
    <div class="sum">
      总金额：<span class="sum-num">￥{{totalMoney.toFixed(2)}}</span>
    </div>
    <div class="sum-btn" @click="submmitOrder">立即购买</div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header';
import { Storage } from'@/utils/storage.js';
import {Token} from '@/utils/token';
const USER_TOKEN = Token.getToken()
export default {
  components:{
    CommonHeader
  },
  data(){
    return {
      title:'确认订单',
      back:true,
      backUrl:"/cart",
      address:{},
      AddressId:0,
      goodsList:[],
      totalMoney:0,
      goodsNum:0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(Object.keys(to.params).length !== 0){
        vm.address = to.params
        vm.$showLoading();
      }else{
        vm.getUserAddress();
      }
    })
    
  },
  mounted(){
    this.$showLoading(true);
    this.getGoodsList();
    let unitHeight = parseFloat(document.querySelector('html').style.fontSize);
    this.$refs.goodsContainer.style.height = window.innerHeight - (0.8 + 0.4 + 2.15 + 1)*unitHeight + 'px';
    this.scroll = new this.$BScroll('.goods-container',{
      scrollY: true,
      click: true,
      probeType: 3,
    });
  },
  methods:{
    async getUserAddress(){
      const address = await this.axios.get('shose/address/default?type=2',{
        headers:{
          token:USER_TOKEN
        }
      });
      this.address = address.data.data || {}
      this.$showLoading();
    },
    getGoodsList(){
      let data = Storage.getItem('confirm-order')
      this.goodsList = data.cartGoodsList;
      this.totalMoney = data.totalMoney;
      this.goodsNum = data.goodsNum;
    },
    async submmitOrder(){
      if(USER_TOKEN === ''){
        this.$router.push({
          path:'/login'
        })
        return
      }
      if(Object.keys(this.address).length === 0){
        this.$showModel({
          showMask:true,
          showText:'请选择地址'
        })
        return
      }
      if(this.goodsList.length === 0){
        this.$showModel({
          showMask:true,
          showText:'请选择商品'
        })
        return
      }
      let data = {};
      data.goods = [];
      data.address_id = this.address.id;
      this.goodsList.forEach(item => {
        data.goods.push({
          goods_id:item.id,
          count:item.buyNumber
        })
      });
      this.$showLoading(true);
      const res = await this.axios.post('shose/order?type=2',data,{
        headers:{
          token:USER_TOKEN
        }
      }).finally(() => {
        this.$showLoading(false)
      })
      console.log(res)
      let deleteCartGoods = Storage.getItem('cartGoodsList')
      let buyGoods = this.goodsList.map(item => {
        return item.id
      })
      buyGoods.forEach((item,index) => {
        if(deleteCartGoods.includes(item.id) !== -1){
          deleteCartGoods.splice(index,1)
          if(deleteCartGoods.length > 0){
            Storage.setItem('cartGoodsList',deleteCartGoods)
          }else{
            sessionStorage.removeItem('cartGoodsList')
          }
        }
      })
      if(res.data.data.pass){
        const data = {
          orderNo:res.data.data.order_no,
          total:this.totalMoney,
          orderId:res.data.data.order_id
        }
        this.$router.replace({
          path:'/order-pay',
          query:data
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap{
  padding-top:.8rem;
  box-sizing: border-box;
  .wrpper-container{
    padding:.2rem .2rem 0 .2rem;
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
  }
  .buy-goods{
    width:100%;
    height:1rem;
    background-color: #fff;
    @include d-flex($justify-c:space-between);
    .sum{
      width:0;
      flex: 1;
      height:100%;
      padding-left:.2rem;
      font-size:.26rem;
      color:#666;
      box-sizing: border-box;
      @include d-flex($justify-c:flex-start);
      span{
        color:#ef8203;
      }
    }
    .sum-btn{
      width:3rem;
      height:100%;
      font-size:.3rem;
      color:#fff;
      background-color: $color-a;
      @include d-flex;
    }
    .abnormal{
      color:#d8d8d8;
    }
  }
}
.container-box{
  padding-bottom: .2rem;
  box-sizing: border-box;
}
</style>