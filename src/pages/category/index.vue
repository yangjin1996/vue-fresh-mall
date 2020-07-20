<template>
<div>
  hhh
  <!-- <common-header :backUrl="backUrl"></common-header>
  <loadings :showLoading="showLoading"></loadings> -->
</div>
</template>

<script>
// import Loadings from '@/components/Loading/Loadings'
// import CommonHeader from'@/components/Header';
export default {
  comments:{
    // Loadings,
    // CommonHeader
  },
  data() {
    return {
      backUrl:'',
      showLoading:true,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
</style>