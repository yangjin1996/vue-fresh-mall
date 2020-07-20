<template>
<div class="wrap">
  <common-header :backUrl="backUrl"></common-header>
  <search-bar></search-bar>
  <div class="wrapper-container" ref="container">
    <div>
      <transition name="fade">
        <div v-if="pullDown" class="loading">加载中 <img src="@/assets/images/loading.gif"></div>
      </transition>
      <div class="nav">
        <home-swiper :swiperList="swiperList"></home-swiper>
        <icon-nav :navList="navList"></icon-nav>
      </div>
      <recommend-goods :goodsList="goodsList" :pullingUp="pullingUp"></recommend-goods>
    </div>
  </div>
  <the-footer :current="current"></the-footer>
  <loadings :showLoading="showLoading"></loadings>
</div>
</template>

<script>

import Loadings from '@/components/Loading/Loadings'
import CommonHeader from'@/components/Header';
import SearchBar from'@/components/SearchBar';
import HomeSwiper from'./Swiper';
import IconNav from'./IconNav';
import RecommendGoods from'./recommendGoods';
import TheFooter from'@/components/Footer';
import { Storage } from'@/utils/storage';
export default {
  components:{
    Loadings,
    CommonHeader,
    SearchBar,
    HomeSwiper,
    IconNav,
    RecommendGoods,
    TheFooter
  },
  data(){
    return {
      backUrl:'',
      current:1,
      pullDown:false,
      pullingUp:true,
      showLoading:true,
      swiperList:[],
      navList:[],
      goodsList:[
        {img:"@/components/loading-bubbles.svg"},
        {img:"@/components/loading-bubbles.svg"},
      ],
      scroll:null,
      page:1,
      total:0
    }
  },
  created() {
    this.showLoading = true;
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  methods:{
    getBscrollBoxHeight(){
      let bodyHeight = document.body.clientHeight;
      const html = document.querySelector('html');
      let WindowHeight = bodyHeight / parseFloat(html.style.fontSize);
      let BscBoxHeight = WindowHeight - 2.7 + 'rem';
      this.$refs.container.style.height = BscBoxHeight
    },
    //请求轮播图数据
    async getSwiper(){
      const swiper = Storage.getItem('swiperList');
      if(swiper === '[]'){
        const swiperList = await this.axios.get('http://api.4yue.top/index.php/api/swiper?type=2');
        this.swiperList = swiperList.data.data;
        Storage.setItem('swiperList',this.swiperList)
      }else{
        this.swiperList = swiper;
      }
    },
    //使用axios请求数据需先安装插件，地址：https://www.npmjs.com/package/axios（4.17）
    async getIconNav(){
      const nav = Storage.getItem('navList');
      if(nav === '[]'){
        const navList = await this.axios.get('api/navigate?type=2');
        this.navList = navList.data.data
        Storage.setItem('navList',this.navList)
      }else{
        this.navList = nav;
      }
    },
    //
    async getGoodsDetail(){
      //一级分类，二级分类（携带cat_id参数）
      // await this.axios.get(`api/goods_list?type=2&cat_id=27`).then(res => {
      //   console.log(res)
      // })
    },
    //请求推荐商品列表
    async getRecommendGoods(page, type=''){
      await this.axios.get(`api/goods_list?type=2&page=${page}&count=4`).then(res =>{
        if(type === ''){
          this.goodsList = []
        }
        this.goodsList = this.goodsList.concat(res.data.data.goods);
        this.total = res.data.data.total;
        if(this.scroll && type){
          if(type === 'down'){
            this.goodsList = this.goodsList.slice(-4);
            this.pullDown = false;
          }
          this.scroll.finishPullUp();
          this.scroll.finishPullDown();
          setTimeout(() => {
            this.scroll.refresh();
          }, 50)
        }
        this.showLoading = false;
      });
    },
  },
  mounted(){
    this.getBscrollBoxHeight();
    this.getSwiper();
    this.getIconNav();
    this.getRecommendGoods(this.page);
    this.getGoodsDetail()
    this.scroll = new this.$BScroll('.wrapper-container',{
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
    this.scroll.on('pullingDown',() => {
      this.pullDown = true;
      let page = Math.ceil(Math.random() * Math.ceil(this.total / 4))
      this.getRecommendGoods(page,'down')
      
    });
    this.scroll.on('pullingUp',() => {
      if(this.goodsList.length < this.total){
        this.page++;
        this.getRecommendGoods(this.page,'up');
      }else{
        this.pullingUp = false
      }
    })
  },

}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
@import '~@/assets/scss/iconfont';
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to{
  transform: scale(0);
}
.wrap {
  padding-top: 1.8rem;
  .wrapper-container{
    touch-action: none;
    overflow:hidden;
    .loading{
      font-size:.2rem;
      color:#999;
      padding-bottom:.2rem;
      text-align:center;
      img{
        width:.3rem;
        height:.3rem;
      }
    }
  }
  .nav{
    height:4.9rem;
    background-color: #fff;
  }
}


</style>