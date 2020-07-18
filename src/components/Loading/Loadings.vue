<template>
<div v-if="showLoading" class="mask">
  <img src="./loading.gif" alt="">
</div>
</template>

<script>
export default {
  props:{
    showLoading:{
      type:Boolean,
      default:true
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.mask{
  width:100%;
  height:100vh;
  background-color: rgba(0,0,0,.1);
  position: fixed;
  top:0;
  left:0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width:1rem;
    height:1rem;
  }
}
</style>