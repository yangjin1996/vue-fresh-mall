<template>
<div class="wrapper">
  <ul>
    <li class="address-container">
      <span class="name">小进进</span>
      <span class="phone">13525642584</span>
      <p class="address">湖南省长沙市天心区先锋街道鑫源越成58栋608号湖南省长沙市天心区先锋街道鑫源越成58栋608号</p>
      <div class="operation">
        <span class="iconfont">&#xe7a1; 编辑</span>
        <span class="iconfont">&#xe78d; 删除</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  // props:{
  //   addressList:{
  //     type:Array,
  //     default:{}
  //   }
  // },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  padding: .2rem;
  width:100%;
  box-sizing: border-box;
  .address-container{
    width:100%;
    height:2.3rem;
    padding:.2rem;
    margin-bottom: .2rem;
    box-sizing: border-box;
    background-color: #fff;
    font-size: .28rem;
    line-height: .4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name{
      font-size: .28rem;
      font-weight: 550;
    }
    .phone{
      font-size: .28rem;
      font-weight: 550;
    }
    .address{
      line-height: .35rem;
      display: flex;
      height:0;
      flex:1;
    }
    .operation{
      width:100%;
      height:.32rem;
      color:$color-a;
      font-size: .26rem;
      @include d-flex($justify-c:space-between);
      span{
        font-size: .26rem;
      }
    }
  }
}
</style>