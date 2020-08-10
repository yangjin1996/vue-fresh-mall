<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :title="title" :back="back"></common-header>
  <div class="menu">
    <div class="news" :class="{'on':check}" @click="changeCheck(true)">推送广告</div>
    <div class="news" :class="{'on':!check}"  @click="changeCheck(false)">新闻事件</div>
  </div>
  <ul class="news-list" v-if="check">
    <li>
      <div class="content-left">
        <div class="iconfont">&#xe610;</div>
        <div class="text">
          <p class="title">消息名称</p>
          <p>消息简介</p>
          <p>12月1日</p>
        </div>
      </div>
      <span class="iconfont">&#xe60e;</span>
    </li>
  </ul>
  <ul class="news-list" v-else>
    <li>
      <div class="content-left">
        <div class="iconfont">&#xe610;</div>
        <div class="text">
          <p class="title">新闻名称</p>
          <p>新闻简介</p>
          <p>12月2日</p>
        </div>
      </div>
      <span class="iconfont">&#xe60e;</span>
    </li>
  </ul>
</div>
</template>

<script>
import CommonHeader from'@/components/Header';
export default {
  components:{
    CommonHeader
  },
  data(){
    return {
      title:"消息中心",
      back:true,
      backUrl:"/",
      check:true,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  methods:{
    changeCheck(check){
      if(this.check === check) return;
      this.check = check
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.header{
  border-bottom:none;
}
.menu{
  width:100%;
  height:1.6rem;
  padding-top:.8rem;
  font-size:.28rem;
  color:#333;
  background-color: #fff;
  box-sizing:border-box;
  @include d-flex($justify-c:space-around,$aligin-i:flex-end);
  .news{
    width:1.18rem;
    padding-bottom:.3rem;
    border-bottom: 2px solid #fff;
    box-sizing:border-box;
  }
  .on{
    color:$color-a;
    border-bottom: 2px solid $color-a;
    box-sizing:border-box;
  }
}
  .news-list{
    width:100%;
    padding:.2rem;
    box-sizing:border-box;
    li{
      width:100%;
      height:1.8rem;
      padding:.3rem .2rem;
      background-color: #fff;
      box-sizing:border-box;
       @include d-flex($justify-c:space-between);
      .content-left{
        width:0;
        flex:1;
        @include d-flex($justify-c:flex-start);
        .iconfont{
          width:.95rem;
          height:1.2rem;
          color:#fff;
          font-size:.5rem;
          border-radius: .1rem;
          background-color: $color-a;
          @include d-flex;
        }
        .text{
          height:1.2rem;
          margin-left:.3rem;
          padding:.05rem 0;
          box-sizing:border-box;
          @include d-flex($flex-d:column,$justify-c:space-between,$aligin-i:flex-start);
          p{
            font-size:.24rem;
            color:$color-n;
          }
          .title{
            font-size:.28rem;
            color:#333;
          }
        }
      }
      .iconfont{
        font-size:.4rem;
        color:#333;
      }
    }
  }
</style>