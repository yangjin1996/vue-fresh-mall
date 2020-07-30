<template>
<div class="container-box">
  <div class="container">
    <span class="iconfont">&#xe6b1;</span>
    <span class="text">商品不存在</span>
  </div>
  <router-link tag="div" class="back-home iconfont" to="/">看看其他商品 &#xe60e;</router-link>
</div>
</template>

<script>
export default {

}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.container-box{
  padding-top:1.2rem;
  width:100%;
  height:3rem;
  .container{
    @include d-flex($flex-d:column);
    .iconfont{
      font-size:60px;
      color:#999;
    }
    .text{
      margin-top:.3rem;
      font-size:.3rem;
      color:#999;
    }
  }
  .back-home{
    margin:0 auto;
    margin-top:.5rem;
    width:3rem;
    height:.6rem;
    background-color: $color-a;
    border-radius: .1rem;
    color:#fff;
    @include d-flex;
  }
}
</style>