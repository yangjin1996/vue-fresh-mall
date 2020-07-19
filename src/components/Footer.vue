<template>
<div class="footer-wrapper">
  <ul class="footer">
    <li class="footer-cell" :class="current==1 ? 'on' : ''" @click="fn('/')">
      <span class="iconfont">&#xe65b;</span>
      <p>线上商城</p>
    </li>
    <li class="footer-cell" :class="current==2 ? 'on' : ''" @click="fn('/cart')">
      <span class="iconfont">&#xe636;</span>
      <p>购物车</p>
    </li>
    <li class="footer-cell" :class="current==3 ? 'on' : ''" @click="fn('/user')">
      <span class="iconfont">&#xe62b;</span>
      <p>我的</p>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props:{
    current:Number
  },
  methods: {
    fn(url){
        if(!(this.$router.currentRoute.path === url)){
          this.$router.push({
          path:url,
        });
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.footer-wrapper{
  width:100%;
  height:$footer-h;
  background-color: #fff;
  border-top:1px solid $color-c;
  color:$color-s;
  position: fixed;
  bottom: 0;
  .footer{
    width:100%;
    height:100%;
    padding: .12rem 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    .on{
      color:$color-a;
    }
    .footer-cell{
      width:1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .iconfont{
        font-size: .4rem;
      }
      p{
        font-size: .2rem;
      }
    }
  }
}
</style>