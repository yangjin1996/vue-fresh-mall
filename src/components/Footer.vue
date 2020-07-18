<template>
<div class="footer-wrapper">
  <ul class="footer">
    <li class="footer-cell">
      <span class="iconfont">&#xe65b;</span>
      <p>线上商城</p>
    </li>
    <li class="footer-cell">
      <span class="iconfont">&#xe636;</span>
      <p>购物车</p>
    </li>
    <li class="footer-cell">
      <span class="iconfont">&#xe62b;</span>
      <p>我的</p>
    </li>
  </ul>
</div>
</template>

<script>
export default {

}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.footer-wrapper{
  width:100%;
  height:1rem;
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