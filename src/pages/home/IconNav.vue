<template>
<div class="icon-container">
  <div class="icon-nav" :style="'width:'+ width +'rem'">
    <div class="icon-cell" v-for="(item,i) of navList" :key="i" @click="toCategory(item.cat_id)">
      <img :src="item.img">
      <span>{{item.name}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    navList:{
      type:Array
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new this.$BScroll('.icon-container',{
        scrollX: true,
        click: false,
        probeType: 3,
        bounce: true,
        // momentumLimitDistance: 5,
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        },
        // mouseWheel: true,
    });
  },
  methods: {
    toCategory(cat_id){
      this.$router.push({
        path:'/category',
        query:{
          cat_id
        }
      })
    },
  },
  computed: {
    width(){
      return this.navList.length * 2
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';

/deep/.bscroll-horizontal-scrollbar{
  width:1.4rem!important;
  height:.1rem!important;
  margin:0 auto; 
  background-color:#eee!important;
  border-radius:.05rem!important;
  opacity:1!important;
  box-sizing:border-box;
}
/deep/.bscroll-horizontal-scrollbar{
  bottom:0;
    /deep/.bscroll-indicator{
      width:.3rem!important;
      height:.1rem!important;
      border-radius:.05rem!important;
      background-color:$color-a!important;
      opacity:1!important;
    }
  
}
.icon-container{
  width:100%;
  height:1.8rem;
  padding:.3rem;
  box-sizing:border-box;
  position:relative;
  .icon-nav{
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon-cell{
      width:2rem;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }
    img{
      width:.9rem;
      height:.9rem;
      border-radius: .15rem;
      margin-bottom:.15rem;
    }
    span{
      font-size: .24rem;
      color:#1a1a1a;
      font-weight:550;
    }
  }
}
</style>