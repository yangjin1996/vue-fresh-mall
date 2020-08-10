<template>
<transition name="fade">
  <div class="mask" :class="{cover:showMask}" v-if="visible" @click="cancel">
    <div class="content" v-if="selectSrc">
      <div class="title">{{title}}</div>
      <div class="select">
        <div class="left-container" v-if="visible" @click.stop="cancelEv">{{btn.cancel}}</div>
        <div class="right-container" v-if="visible" @click.stop="confirmEv">{{btn.confirm}}</div>
      </div>
    </div>
    <div class="show" v-else >{{showText}}</div>
  </div>
</transition>
</template>

<script>
export default {
  data() {
    return {
      visible:false,
      selectSrc:false,
      showMask:false,
      showImg:true,
      showText:'',
      title:'',
      btn:{
        confirm:'',
        cancel:''
      }
    }
  },
  methods: {
    confirmEv(){
      this.visible = false
      const result = {
        confirm:true,
        cancel:false
      }
      this.$emit('model',result)
    },
    cancelEv(){
      this.visible = false
      const result = {
        confirm:false,
        cancel:true
      }
      this.$emit('model',result)
    },
    cancel(){
      this.visible = false
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.fade-enter-active,
.fade-leave-active{ 
  opacity: 1;
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.mask{
  width:100%;
  height:100%;
  background-color: rgba($color: #000000, $alpha: .2);
  position: fixed;
  left:0;
  top:0;
  z-index: 10001;
  @include d-flex;
  .content{
    width:3.6rem;
    height:1.7rem;
    background-color: #fff;
    .title{
      height:1rem;
      font-size:.24rem;
      border-bottom:1px solid #ccc;
      text-align:center;
      box-sizing: border-box;
      @include d-flex;
    }
    .select{
      @include d-flex($justify-c:space-between);
      .left-container,.right-container{
        width:50%;
        height:.8rem;
        font-size:.26rem;
        color:$color-a;
        @include d-flex;
      }
      .left-container{
        color:#ccc;
        border-right:1px solid #ccc;
        box-sizing: border-box;
      }
    }
  }
  .show{
    width:3.5rem;
    height:1rem;
    font-size:.26rem;
    color:#fff;
    text-align: center;
    border-radius: .1rem;
    background-color: rgba($color: #000000, $alpha: .7);
    @include d-flex;
  }
}
.cover{
  background-color: rgba($color: #000000, $alpha: 0);
}
</style>