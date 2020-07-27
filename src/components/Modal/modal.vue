<template>
<div class="mask" v-if="visible">
  hahh
</div>
</template>

<script>
export default {
  data() {
    return {
      visible:false
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.mask{
  width:100%;
  height:100%;
  background-color: red;
}
</style>