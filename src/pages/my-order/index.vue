<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <ul class="nav">
    <li class="nav-cell" @click="category = 'consignment'" :class="{on : category === 'consignment'}">待发货</li>
    <li class="nav-cell" @click="category = 'received'" :class="{on : category === 'received'}">待收货</li>
    <li class="nav-cell" @click="category = 'finished'" :class="{on : category === 'finished'}">已完成</li>
    <li class="nav-cell" @click="category = 'after-sales'" :class="{on : category === 'after-sales'}">售后</li>
  </ul>
  <consignment :Consignment="category"></consignment>
  <received :Received="category"></received>
  <finished :Finished="category"></finished>
</div>
</template>

<script>
import CommonHeader from'@/components/Header';
import Consignment from'./Consignment';
import Received from'./Received';
import Finished from'./Finished';
export default {
  components:{
    CommonHeader,
    Consignment,
    Received,
    Finished
  },
  data() {
    return {
      backUrl:'/',
      back:true,
      title:'我的订单',
      category:'consignment'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.nav{
  padding-top:.8rem;
  margin-bottom: .2rem;
  width:100%;
  height:.8rem;
  background-color: #fff;
  @include d-flex($justify-c:space-around);
  .nav-cell{
    font-size:.28rem;
    color:#666;
    padding: .25rem 0;
    border-bottom: 2px solid #fff;
    box-sizing: border-box;
  }
  .on{
    color:$color-a;
    border-bottom: 2px solid $color-a;
  }
}
</style>