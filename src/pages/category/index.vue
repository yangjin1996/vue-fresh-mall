<template>
<div>
  <common-header :title="title" :back="back" :backUrl="backUrl"></common-header>
  <loadings :showLoading="showLoading"></loadings>
  <div class="wrapper">
    <ul class="sidebar">
      <li v-for="(item,index) of navList" :key="index" class="sidebar-cell" :class="item.cat_id === currentCatId ? 'on' : ''">{{item.name}}</li>
    </ul>
  </div>
</div>
</template>

<script>
import { Storage } from'@/utils/storage';
import Loadings from '@/components/Loading/Loadings'
import CommonHeader from'@/components/Header';
export default {
  components:{
    Loadings,
    CommonHeader
  },
  data() {
    return {
      title:'商品分类',
      back:true,
      backUrl:'',
      showLoading:false,
      navList:[],
      currentCatId:0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path;
    })
  },
  methods: {
    async getCatgoryGoods(){
      const nav = Storage.getItem('navList');
      if(nav === '[]'){
        const navList = await this.axios.get('api/navigate?type=2');
        this.navList = navList.data.data
        Storage.setItem('navList',this.navList)
      }else{
        this.navList = nav;
      }
    },
  },
  mounted() {
    this.currentCatId = this.$route.query.cat_id * 1;
    this.getCatgoryGoods();
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100vw;
  height:100vh;
  padding-top:.8rem;
  
  background-color:#fff;
  box-sizing:border-box;
  .sidebar{
    width:1.88rem;
    border-right:1px solid #eee;
    padding-right:.2rem;
    box-sizing:border-box;
    @include d-flex(column,flex-start,center);
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
  
}
</style>