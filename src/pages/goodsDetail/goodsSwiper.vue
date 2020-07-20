<template>
<swiper v-if="goodsSwiperList.length > 0" :options="swiperOptions" class="swiper-list">
  <swiper-slide v-for="(item,keys) of goodsSwiperList" :key="keys" class="swiper-cell">
    <img :src="item" class="swiper-img">
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { swiper,swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props:{
    goodsSwiperList:{
      type:Array
    },
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptions: {
        pagination : {
          el:'.swiper-pagination',
          type:'fraction'
        },
        loop: true,
      },
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
/deep/.swiper-pagination{
  color:rgba(0,0,0,0.5);
}
/deep/.swiper-pagination-current{
  color:rgba(0,0,0,0.7);
}
/deep/.swiper-pagination-total{
  color:rgba(0,0,0,0.5);
}
.swiper-list{
  padding-top:.8rem;
  box-sizing:border-box;
  .swiper-cell{
    width:100vw;
    height:100vw;
    .swiper-img{
      width:100vw;
      height:100vw;
    }
  }
}
/deep/.swiper-pagination-bullet{
  background:#fff;
}
</style>