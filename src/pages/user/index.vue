<template>
<div class='wrap'>
  <common-header :title="title" :back="back"></common-header>
  <common-footer :current="current"></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
export default {
  components:{
    CommonHeader,
    CommonFooter,
  },
  data() {
    return {
      title:'我的',
      back:true,
      current:3,
    }
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
</style>