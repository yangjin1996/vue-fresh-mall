// 项目入口
<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>

export default {}
</script>
<style lang="scss">
@import './assets/scss/border';
@import './assets/scss/reset';
@import './assets/scss/global';
@import './assets/scss/iconfont';
body,html{
  width:100%;
  height:100%;
  font-family:'PingFangSCB'!important;
}
body{
  background-color: #f5f5f5;
}
</style>
