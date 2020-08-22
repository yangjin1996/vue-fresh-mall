<template>
<swiper v-if="swiperList.length > 0" :options="swiperOptions" class="swiper-list">
  <swiper-slide v-for="(item,keys) of swiperList" :key="keys" class="swiper-cell">
    <img :src="item.img" class="swiper-img" @click="toGoods(keys)">
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { swiper,swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props:{
    swiperList:{
      type:Array
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptions: {
        pagination : {
          el:'.swiper-pagination'
        },
        loop: true,
        autoplay:true
      },
    }
  },
  methods: {
    toGoods(keys){
      if(keys === 0){
        this.$router.push('/category?cat_id=27')
      }else if(keys === 1){
        this.$router.push('/goods-detail?goods_id=82')
      }else if(keys === 2){
        this.$router.push('/category?cat_id=29')
      }else if(keys === 3){
        this.$router.push('/goods-detail?goods_id=95')
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.swiper-list{
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
/deep/.swiper-pagination-bullet{
  background:#fff;
}
</style>