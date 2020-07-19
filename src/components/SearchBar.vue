<template>
<div class="wrapper">
  <routerLink class="search-bar" tag="div" to="/search">
    <span class="search-icon iconfont">&#xe6c7;</span>
    <span class="search">搜索商品</span>
  </routerLink>
</div>
</template>

<script>
export default {
  methods:{
    
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100%;
  height:$search-h;
  padding:.15rem .42rem;
  background-color: #f5f5f5;
  position: fixed;
  top:.8rem;
  z-index: 2;
  box-sizing: border-box;
}
.search-bar{
  overflow: hidden;
  height:.6rem;
  background-color: #fff;
  border-radius: .3rem;
  display: flex;
  align-items: center;
  .search-icon{
    font-size:.3rem;
    color:$color-b;
    margin:0 .2rem;
  }
  .search{
    color:$color-n;
    font-size: .26rem;
  }
}
</style>