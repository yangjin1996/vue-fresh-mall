<template>
<div v-if="showLoading" class="mask" :class="{show:Mask}">
  <img class="container" v-if="!Mask" src="./loading-bubbles.svg" alt="">
  <div class="container icon" v-else>
    <img src="./loading.gif" alt="">
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      showLoading:false,
      Mask:false
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
  z-index: 10000;
  .container{
    width:25%;
    height:25%;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
}
.show{
  background-color: rgba(0,0,0,0);
}
.container.icon{
  width:1rem;
  height:1rem;
  border-radius: .1rem;
  background-color: rgba($color: #000000, $alpha: 0);
  @include d-flex;
  img{
    width:.8rem;
    height:.8rem;
  }
}
</style>