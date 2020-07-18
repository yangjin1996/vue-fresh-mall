<template>
  <div class="icon-container">
    <ul class="icon-nav">
      <li v-for="(item,index) of navList" :key="index" class="icon-cell">
        <img :src="item.img" alt="">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    navList:{
      type:Array
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.icon-container{
  height:1.3rem;
  padding:.3rem;
  .icon-nav{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    .icon-cell{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img{
        width:.9rem;
        height:.9rem;
        border-radius: .15rem;
      }
      span{
        font-size: .24rem;
        color:$color-b;
        font-weight:600;
      }
    }
  }
}
</style>