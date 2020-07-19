<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <div v-if="cartGoodsList" class="wrap-container">
    <div class="container">
      <img src="@/assets/images/noGoods.png">
      <h3>你还没有相关订单</h3>
      <p>可以去看看有哪些想买的~</p>
      <div class="jump">去逛逛</div>
    </div>
  </div>
  <div else class="cart-goods">
    <ul class="goods-container">
      <li class="goods">
        <div class="select-buttom" @click="selected = !selected">
           <span v-show="selected" class="iconfont">&#xe627;</span>
        </div>
				<img class="goods-img" src="">
				<div class="goods-info">
					<p class="goods-title">苹果苹果苹果果苹果苹果</p>
					<p class="goods-weight">200g/袋</p>
					<p class="goods-price">￥29.9</p>
				</div>
				<div class="button">
          <span class="iconfont reduce">&#xe60c;</span>
          <span class="number">1</span>
          <span class="iconfont add">&#xe626;</span>
        </div>
			</li>
    </ul>
  </div>
  <div class="pay-container" v-show="selected">
    <div class="pay-left">
      <div class="select-buttom" @click="selected = !selected">
        <span v-show="selected" class="iconfont">&#xe627;</span>
      </div>
      <span class="all-selected">全选</span>
    </div>
    <div class="pay-right">
      <span class="total-money">合计：</span>
      <span class="money">￥29.9元</span>
      <div class="pay">去支付</div>
    </div>
  </div>
  <common-footer :current="current"></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
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
      cartGoodsList:false,
      selected:true,
      cartGoods:[]
    }
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap-container{
  width:100vw;
  height:100vh;
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
  padding-top:.8rem;
  box-sizing:border-box;
  .goods-container{
    width:100%;
    height:100%;
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
				.goods-weight{
					font-size:.24rem;
					color:#2b2b2b;
					font-weight:550;
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
				border:1px solid yellow;
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