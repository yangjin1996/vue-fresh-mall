<template>
  <div class="header">
    <span v-if="back" :backUrl="backUrl" class="back iconfont" @click="toBack">&#xe60a;</span>
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
    },
    backUrl:{
      type:String,
      default:''
    }
  },
  methods:{
    toBack () {
      if(this.backUrl === ''){
        this.$router.push('/')
      }else{
        this.$router.push(this.backUrl)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
@import '~@/assets/scss/iconfont';
.header{
  width:100%;
  height:$Header-h;
  font-size: .32rem;
  color:$color-b;
  background-color: #fff;
  border:1px solid #eee;
  font-weight: 550;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  z-index: 5;
  box-sizing:border-box;
  .back{
    position:absolute;
    left:.2rem;
  }
}
</style>