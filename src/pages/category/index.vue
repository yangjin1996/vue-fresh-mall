<template>
<div>
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <div class="wrapper">
    <ul class="sidebar">
      <li 
        v-for="(item,index) of navList" 
        :key="index" @click="switchBtn(item.cat_id)" 
        class="sidebar-cell" 
        :class="item.cat_id === currentCatId ? 'on' : ''">{{item.name}}
      </li>
    </ul>
    <div class="goodsList">
      <ul>
        <li v-for="(item,index) of goodsList" :key="index" class="goods" @click="toGoodsDetail(item.id)">
          <img class="goods-img" v-lazy="item.img">
          <div class="goods-info">
            <p class="goods-title">{{item.name}}</p>
            <p class="goods-weight">{{item.market_price}}</p>
            <p class="goods-price">￥{{item.price}}</p>
          </div>
          <div class="button">
            <span class="cart iconfont" @click.stop="addCart(item)">&#xe63b;</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { Storage } from'@/utils/storage';
import CommonHeader from'@/components/Header';
export default {
  name:"Category",
  components:{
    CommonHeader
  },
  data() {
    return {
      title:'商品分类',
      back:true,
      backUrl:'',
      navList:[],
      currentCatId:0,
      goodsList:[],
      cartGoodsList:[],
      buyNumber:1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path;
    })
  },
  methods: {
    async getCatgoryGoods(){
      this.$showLoading(true)
      const nav = Storage.getItem('navList');
      if(nav.length === 0){
        const navList = await this.axios.get('api/navigate?type=2');
        this.navList = navList.data.data;
        Storage.setItem('navList',this.navList);
        this.$showLoading()
      }else{
        this.navList = nav;
        this.$showLoading()
      }
    },
    async switchBtn(cat_id){
      //一级分类，二级分类（携带cat_id参数
      this.currentCatId = cat_id;
      const goods = Storage.getItem(`categorygoodsList${cat_id}`);
      if(goods.length === 0){
        this.$showLoading(true)
        await this.axios.get(`api/goods_list?type=2&cat_id=${cat_id}`).then(res => {
          this.goodsList = res.data.data.goods;
          Storage.setItem(`categorygoodsList${cat_id}`,this.goodsList);
        }).finally(() => {
          this.$showLoading(false)
        })
      }else{
        this.goodsList = goods;
        this.$showLoading(false)
      }
    },
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
      let exeGoods = goodsList.map(val => {
        return val.id;
      })
      let index = exeGoods.indexOf(item.id);
      if(index !== -1){
        goodsList[index].buyNumber += 1
        list = goodsList;
      }else{
        item.buyNumber = this.buyNumber;
        list = goodsList;
        list.unshift(item);
      }
      this.cartGoodsList = list;
      Storage.setItem('cartGoodsList',this.cartGoodsList);
      this.$showModel({
        title : '添加购物车成功,是否前往购物车？',
        btn: {confirm:'确定',cancel:'取消'},
        success:res => {
          if(res.confirm){
            this.$router.push('/cart')
          }
        }
      })
    },
  },
  mounted() {
    this.$showLoading(true)
    this.switchBtn(this.$route.query.cat_id);
    this.currentCatId = this.$route.query.cat_id * 1;
    this.getCatgoryGoods();
    this.scroll = new this.$BScroll('.goodsList',{
      scrollY: true,
      click: true,
      probeType: 3,
      pullDownRefresh:{
        threshold: -10, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        stop: 0
      },
      pullUpLoad: {
        threshold: 40, 
      },
    });
    this.$showLoading()
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.header{
  border:none;
}
.wrapper{
  width:100vw;
  height:100vh;
  padding-top:.8rem;
  background-color:#fff;
  box-sizing:border-box;
  display:flex;
  .sidebar{
    width:1.88rem;
    border-right:1px solid #eee;
    padding-right:.2rem;
    box-sizing:border-box;
    @include d-flex(column,flex-start,center);
    position: relative;
    left:0;
    top:0;
    .sidebar-cell{
      width:100%;
      height:.97rem;
      @include d-flex;
      font-size:.28rem;
      color:#2b2b2b;
      border-left:.07rem solid #fff;
      font-weight:550;
      box-sizing:border-box;
    }
    .on{
      border-left:.07rem solid $color-a;
    }
  }
  .goodsList{
    width:0;
    flex:1;
    height:100vh;
    padding:.4rem .2rem 0.8rem .4rem;
    box-sizing: border-box;
    .goods{
			width:100%;
			height:1.85rem;
			margin-bottom:.4rem;
			box-sizing:border-box;
			background-color:#fff;
			display:flex;
      align-items:center;
			position:relative;
			.goods-info{
				width:2.2rem;
        height:100%;
				margin-left:.2rem;
				padding:.25rem 0;
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
          text-decoration: line-through;
				}
        .goods-price{
          color:#ef8203;
        }
			}
      .button{
        width:1.4rem;
        height:.4rem;
        position:absolute;
        right:0;
        bottom:.45rem;
        @include d-flex($justify-c:space-between);
        .cart{
          font-size: .45rem;
          position: absolute;
          right:0;
          bottom: -.2rem;
          color:$color-a;
        }
      }
			.goods-img{
				width:1.85rem;
				height:1.85rem;
				border-radius:.1rem;
			}
		}
  }
}
</style>