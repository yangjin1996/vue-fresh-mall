<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <div v-if="cartGoodsList.length === 0" class="wrap-container">
    <div class="container">
      <img src="@/assets/images/noGoods.png">
      <h3>你还没有相关订单</h3>
      <p>可以去看看有哪些想买的~</p>
      <router-link tag="div" class="jump" to="/">去逛逛</router-link>
    </div>
  </div>
  <div v-show="cartGoodsListLength" class="cart-goods" ref="cartGoods">
    <ul class="goods-container">
      <li 
        class="goods" 
        v-for="(item,index) of cartGoodsList" 
        :key="index"
        @click="toGoodsDetail(item.id)">
        <div class="select-buttom" @click.stop="changeStatus(item)">
           <span v-show="item.selected" class="iconfont">&#xe627;</span>
        </div>
				<img class="goods-img" v-lazy="item.img">
				<div class="goods-info">
					<p class="goods-title">{{item.name}}</p>
					<p class="goods-market-price">{{item.market_price}}</p>
					<p class="goods-price">￥{{item.price}}</p>
				</div>
				<div class="button">
          <span class="iconfont reduce" @click.stop="reduceNumber(item)">&#xe60c;</span>
          <span class="number">{{item.buyNumber}}</span>
          <span class="iconfont add" @click.stop="addNumber(item)">&#xe626;</span>
        </div>
			</li>
    </ul>
  </div>
  <div class="pay-container" v-show="cartGoodsList.length && selected">
    <div class="pay-left">
      <div class="select-buttom" @click="selectedAll">
        <span v-show="selectedAllButtn" class="iconfont">&#xe627;</span>
      </div>
      <span class="all-selected">全选</span>
    </div>
    <div class="pay-right">
      <span class="total-money">合计：</span>
      <span class="money">￥{{totalMoney}}元</span>
      <div class="pay" @click="toConfirmOrder">去支付</div>
    </div>
  </div>
  <common-footer :current="current"></common-footer>
</div>
</template>

<script>
import { Storage } from'@/utils/storage.js';
import CommonHeader from '@/components/Header';
import CommonFooter from '@/components/Footer';
export default {
  components:{
    CommonHeader,
    CommonFooter,
  },
  data() {
    return {
      title:'购物车',
      back:true,
      current:2,
      scroll:'',
      cartGoodsList:[],
      selected:true,
      selectedAllButtn:true,
      cartGoods:[],
      buyNumber:1,
      totalMoney:0,
      swiperOptions: {
        loop: false,
        autoplay:false
      },
    }
  },
  methods: {
    getCartGoodsList(){
      let cartGoodsListData = Storage.getItem('cartGoodsList');
      cartGoodsListData.forEach(item => {
        item.selected = true;
        this.totalMoney += item.price*item.buyNumber;
        this.totalMoney = this.totalMoney.toFixed(2)*1;
      });
      this.cartGoodsList = cartGoodsListData;
    },
    toGoodsDetail(goods_id){
      this.$router.push({
        path:'/goods-detail',
        query:{
          goods_id
        }
      })
    },
    changeStatus(item){
      item.selected = !item.selected;
      let price = (item.price*item.buyNumber).toFixed(2)*1;
      if(!item.selected){
        this.totalMoney -= price;
      }else{
        this.totalMoney += price;
      };
      this.selectedAllButtn = !this.cartGoodsList.some(item => {
        return item.selected === false
      })
    },
    selectedAll(){
      this.selectedAllButtn = !this.selectedAllButtn;
      if(this.selectedAllButtn === true){
        this.cartGoodsList.forEach(item => {
          item.selected = true;
          this.totalMoney += parseFloat(item.price)*item.buyNumber;
        });
        this.totalMoney = this.totalMoney.toFixed(2)*1;
        this.cartGoodsList.forEach(item => {
          item.selected = true;
        })
      }else{
        this.totalMoney = 0;
        this.cartGoodsList.forEach(item => {
          item.selected = false;
        })
      }
    },
    reduceNumber(item){
       if(item.buyNumber === 1){
         return
       }
      this.totalMoney -= item.price * 1;
      this.totalMoney = this.totalMoney.toFixed(2)*1
      let cartGoodsListData = Storage.getItem('cartGoodsList');
      let indexList = cartGoodsListData.map(val => {
        return val.id;
      })
      item.buyNumber--;
      let index = indexList.indexOf(item.id);
      cartGoodsListData[index].buyNumber = item.buyNumber;
      Storage.setItem('cartGoodsList',cartGoodsListData);
    },
    addNumber(item){
      this.totalMoney += item.price * 1;
      this.totalMoney = this.totalMoney.toFixed(2)*1
      let cartGoodsListData = Storage.getItem('cartGoodsList');
      let indexList = cartGoodsListData.map(val => {
        return val.id;
      })
      item.buyNumber++;
      let index = indexList.indexOf(item.id);
      cartGoodsListData[index].buyNumber = item.buyNumber;
      Storage.setItem('cartGoodsList',cartGoodsListData);
    },
    toConfirmOrder(){
      this.$router.push({
        name:'ConfirmOrder',
        params:{
          cartGoodsList:this.cartGoodsList,
          totalMoney:this.totalMoney,
          goodsNum:this.cartGoodsList.length,
        }
      })
    },
    // touch(){
    //   // console.log('touch',Event.targetTouches[0].pageX,Event.targetTouches[0].pageY)
    // },
    initScroll(){
      let unitHeight = parseFloat(document.querySelector('html').style.fontSize);
      this.$refs.cartGoods.style.height = window.innerHeight - 2*unitHeight + 'px';
      this.scroll = new this.$BScroll('.cart-goods',{
        scrollY: true,
        click: true,
        probeType: 3,
      });
    }
  },
  computed:{
    cartGoodsListLength(){
      return !!this.cartGoodsList.length;
    }
  },
  mounted() {
    this.getCartGoodsList();
    this.initScroll();
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap{
  padding-top:.8rem;
  height:100vh;
  box-sizing:border-box;
}
.wrap-container{
  width:100vw;
  height:100%;
  background-color:#fff;
  .container{
    width:3rem;
    margin:0 auto;
    padding-top:3rem;
    text-align:center;
    img{
      width:2.5rem;
      height:2.5rem;
    }
    h3{
      text-align:center;
      font-size:.26rem;
      font-weight:550;
      color:#666;
      margin:.4rem 0 .2rem 0;
    }
    p{
      text-align:center;
      font-size:.24rem;
      color:#999;
      margin-bottom:.4rem;
    }
    .jump{
      width:2rem;
      height:.5rem;
      margin:0 auto;
      color:#fff;
      font-size:.28rem;
      font-weight:500;
      background-color:$color-a;
      border-radius:.1rem;
      @include d-flex;
    }
  }
}
.cart-goods{
  width:100%;
  height:100%;
  background-color:#f5f5f5;
  box-sizing:border-box;
  .goods-container{
    width:100%;
    padding:.2rem;
    box-sizing:border-box;
    .goods{
			width:100%;
			height:3.1rem;
			margin-bottom:.2rem;
			padding:.45rem .2rem;
			box-sizing:border-box;
			background-color:#fff;
			display:flex;
      align-items:center;
			position:relative;
			.goods-info{
				width:3.35rem;
        height:100%;
				margin-left:.2rem;
				padding:.3rem 0;
				box-sizing:border-box;
				display:flex;
				flex-direction:column;
				justify-content:space-between;
				.goods-title{
					font-size:.24rem;
					color:#2b2b2b;
					font-weight:550;
					width:2.5rem;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
				}
				.goods-market-price{
					font-size:.26rem;
					color:#aaa;
          text-decoration:line-through;
				}
        .goods-price{
          color:#ef8203;
        }
			}
      .button{
        width:1.4rem;
        height:.4rem;
        position:absolute;
        right:.2rem;
        bottom:.45rem;
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
			.cart{
				font-size:.5rem;
				color:$color-a;
				position:absolute;
				right:.2rem;
				bottom:.6rem;
			}
			.goods-img{
				width:2.15rem;
				height:2.15rem;
				border-radius:.1rem;
			}
		}
  }
}
.pay-container{
  width:100%;
  height:1rem;
  background-color:#fff;
  padding:.1rem .2rem;
  box-sizing:border-box;
  @include d-flex($justify-c:space-between);
  position:fixed;
  bottom:1rem;
  left:0;
  .pay-left{
    width:1.2rem;
    @include d-flex($justify-c:space-between);
    .all-selected{
      font-size:.26rem;
      color:#999;
    }
  }
  .pay-right{
    width:4rem;
    @include d-flex($justify-c:space-between);
    .total-money{
      font-size:.28rem;
      color:#666;
    }
    .money{
      color:#ef8203;
      font-size:.28rem;
    }
    .pay{
      width:1.6rem;
      height:.8rem;
      color:#fff;
      font-size:.32rem;
      background-color:$color-a;
      border-radius:.1rem;
      @include d-flex;
    }
  }
}

.select-buttom{
  width:.4rem;
  height:.4rem;
  border-radius:50%;
  border:2px solid #ccc;
  margin-right:.2rem;
  @include d-flex;
  box-sizing:border-box;
  span{
    font-size:.38rem;
    color:$color-a;
  }
}
</style>