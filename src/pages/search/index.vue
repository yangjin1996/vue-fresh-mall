<template>
<div>
	<common-header :title="title" :back="back"></common-header>
	<div class="wrapper">
		<div class="search-bar">
			<span class="search-icon iconfont">&#xe6c7;</span>
			<input class="search" type="text" placeholder="搜索商品" autofocus v-model="showDelateIcon" />
			<span v-show="showDelateIcon" class="delete-icon iconfont" @click="showDelateIcon = null">&#xe64a;</span>
		</div>
		<div class="search-goods">搜索</div>
	</div>
	<div class="searchGoodsList">
		<ul class="searchGoods">
			<li class="goods">
				<img class="goods-img" src="">
				<div class="goods-info">
					<p class="goods-title">苹果苹果苹果苹果苹果苹果苹果</p>
					<p class="goods-weight">200g/袋</p>
					<p class="goods-price">￥29.9</p>
				</div>
				<span class="cart iconfont">&#xe63b;</span>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
	import CommonHeader from '@/components/Header'
export default {
	data() {
		return {
			title:'搜索',
			back:true,
			showDelateIcon:null,
		}
	},
	components:{
		CommonHeader
	},
	mounted() {
		this.searchGoods();
	},
	methods: {
		searchGoods(){

		},
	},
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100%;
  height:.9rem;
  padding:.15rem .2rem;
  background-color: #f5f5f5;
	display:flex;
  position: fixed;
  top:.8rem;
  z-index: 2;
  box-sizing: border-box;
}
.search-bar{
	font-size:.26rem;
	color:$color-n;
  overflow: hidden;
  height:.6rem;
  background-color: #fff;
  border-radius: .3rem;
	position:relative;
  display: flex;
	flex:1;
  align-items: center;
	.search::placeholder{
		color:$color-n;
    font-size: .26rem;
		font-weight:600;
	}
  .search-icon{
    color:$color-b;
    margin:0 .2rem;
  }
	.search{
		flex:1;
		font-family:'PingFangSCB';
		font-size:.26rem;
		color:#999;
	}
	.delete-icon{
		position:absolute;
		right:.2rem;
		color:$color-n;
		font-size:.32rem;
	}
}
.search-goods{
	width:1.2rem;
	height:.6rem;
	font-size:.26rem;
	color:#fff;
	margin-left:.2rem;
  background-color: $color-a;
  border-radius: .3rem;
  display: flex;
  align-items: center;
	justify-content:center;
}
.searchGoodsList{
	margin:0 .2rem;
	padding-top:1.7rem;
	box-sizing:border-box;
	.searchGoods{
		width:100%;
		.goods{
			width:100%;
			height:3.1rem;
			margin-bottom:.2rem;
			padding:.45rem .2rem;
			box-sizing:border-box;
			background-color:yellow;
			display:flex;
			position:relative;
			.goods-info{
				width:3.35rem;
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
</style>