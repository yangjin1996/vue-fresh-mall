<template>
<div>
  <common-header></common-header>
  <search-bar></search-bar>
  <div class="nav">
    <home-swiper :swiperList="swiperList"></home-swiper>
    <icon-nav :navList="navList"></icon-nav>
  </div>
  <recommend-goods :goodsList="goodsList"></recommend-goods>
  <the-footer></the-footer>
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
export default {
  data(){
    return {
      showLoading:true,
      swiperList:[],
      navList:[],
      goodsList:[],
    }
  },
  components:{
    Loadings,
    CommonHeader,
    SearchBar,
    HomeSwiper,
    IconNav,
    RecommendGoods,
    TheFooter
  },
  mounted(){
    this.showLoading = true;
    this.getSwiper();
    this.getIconNav();
    this.getRecommendGoods();
    this.showLoading = false;
  },
  methods:{
    //请求轮播图数据(本地存储还没设置)
    async getSwiper(){
      // const swiperList = localStorage.getItem('swiperList')
      //   if(swiperList){
      //       // this.swiperList = swiperList
      //   }else{
          const swiperList = await this.axios.get('http://api.4yue.top/index.php/api/swiper?type=2&appkey=f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM');
          this.swiperList = swiperList.data.data
          // this.swiperList = swiperList
          // localStorage.setItem('swiperList',swiperList)
        // }

    },
    //使用axios请求数据需先安装插件，地址：https://www.npmjs.com/package/axios（4.17）
    async getIconNav(){
        // const navList = Storage.getItem('navList')
        // if(navList){
        //     this.navList = navList
        // }else{
          // const navList;
            const navList = await this.axios.get('http://api.4yue.top/index.php/api/navigate?type=2&appkey=f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM');
            this.navList = navList.data.data
            // this.navList = navList
            // Storage.setItem('navList',navList)
        // }
        // console.log(navList)
    },
    //请求推荐商品列表
    async getRecommendGoods(){
      // const swiperList = localStorage.getItem('swiperList')
      //   if(swiperList){
      //       // this.swiperList = swiperList
      //   }else{
          const goodsList = await this.axios.get('http://api.4yue.top/index.php/api/goods_list?type=2&appkey=f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM');
          this.goodsList = goodsList.data.data.goods
          // this.swiperList = swiperList
          // localStorage.setItem('swiperList',swiperList)
        // }

    },
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
@import '~@/assets/scss/iconfont';
body{
  position: relative;
}
.nav{
  background-color: #fff;
  margin-top:1.8rem;
}

</style>