<template>
  <div class="header">
    <span v-if="back" class="back iconfont" @click="toBack">&#xe60a;</span>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'线上商城'
    },
    back:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    toBack () {

    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
@import '~@/assets/scss/iconfont';
.header{
  width:100%;
  height:.8rem;
  font-size: .32rem;
  color:$color-b;
  background-color: #fff;
  font-weight: 550;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  z-index: 2;
}
</style>