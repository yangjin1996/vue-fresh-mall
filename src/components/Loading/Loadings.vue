<template>
<div v-if="showLoading" class="mask">
  <img src="./loading-bubbles.svg" alt="">
</div>
</template>

<script>
export default {
  props:{
    showLoading:{
      type:Boolean,
      default:true
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.mask{
  width:100%;
  height:100vh;
  background-color: rgba(0,0,0,.2);
  position: fixed;
  top:0;
  left:0;
  z-index: 9;
  img{
    width:25%;
    height:25%;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
}
</style>