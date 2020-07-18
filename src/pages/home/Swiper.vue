<template>
<swiper v-if="swiperList.length > 0" :options="swiperOptions" class="swiper-list">
  <swiper-slide v-for="(item,keys) of swiperList" :key="keys" class="swiper-cell">
    <img :src="item.img" class="swiper-img">
  </swiper-slide>
  <div v-if="swiperList.length > 0" class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
export default {
  props:{
    swiperList:{
      type:Array
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        // observer:true,
        // observeParents:true,
        // autoplay:1000,
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay:2000
      },
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.swiper-list{
  // height:3.2rem;
  margin:0 .2rem;
  border-radius: .1rem;
  .swiper-cell{
    width:100%;
    height:3rem;
    .swiper-img{
      width:100%;
      height:100%;
      border-radius: .1rem;
    }
  }
}
// .swiper-pagination{
//   // width:100%;
//   // height:.5rem;
//   // background-color: red;
//   // z-index: 2;
// }
</style>