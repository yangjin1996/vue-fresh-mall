<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :title="title" :back="back"></common-header>
  <div class="menu">
    <div class="news" :class="{'on':check}" @click="changeCheck(true)">推送广告</div>
    <div class="news" :class="{'on':!check}"  @click="changeCheck(false)">新闻事件</div>
  </div>
  <div class="wrapper-container" ref="container">
    <ul class="news-list" v-if="check">
      <li class="news-cell" v-for="item of newsList" :key="item.id">
        <div class="content-left">
          <div class="iconfont">&#xe610;</div>
          <div class="text">
            <p class="title">{{item.title}}</p>
            <p class="content">{{item.content}}</p>
            <p>{{item.time|dateFormat}}</p>
          </div>
        </div>
        <span class="iconfont"></span>
      </li>
    </ul>
    <ul class="news-list" v-else>
      <li class="news-cell">
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
</div>
</template>

<script>
import {Token} from'@/utils/token';
import CommonHeader from'@/components/Header';
import {dateFormat} from '@/utils/function'
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
      newsList:[],
      scroll:null
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY-mm-dd',new Date(date * 1000))
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted() {
    this.getNewsData();
    this.getBscrollBoxHeight();
    this.scroll = new this.$BScroll('.wrapper-container',{
      scrollY: true,
      click: true,
      probeType: 3,
      pullDownRefresh:{
        threshold: -10, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        stop: 0
      },
      pullUpLoad: {
        threshold: 50, 
      },
    });
  },
  methods:{
    changeCheck(check){
      if(this.check === check) return;
      this.check = check
    },
    async getNewsData(){
      const USER_TOKEN = Token.getToken()
      const newsList = await this.axios.get('shose/notice?type=2',{
        headers:{
          token:USER_TOKEN
        },
        params:{
          pages:1,
          count:8
        }
      })
      this.newsList = newsList.data.data.list
    },
    getBscrollBoxHeight(){
      let bodyHeight = document.body.clientHeight;
      const html = document.querySelector('html');
      let WindowHeight = bodyHeight / parseFloat(html.style.fontSize);
      let BscBoxHeight = WindowHeight - 1.6 + 'rem';
      this.$refs.container.style.height = BscBoxHeight
    },
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.header{
  border-bottom:none;
}
.wrapper-container{
  width:100%;
  overflow: hidden;
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
    .news-cell{
      width:100%;
      height:1.8rem;
      padding:.2rem .2rem;
      margin-bottom: .1rem;
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
            &.content{
              line-height: .35rem;
            }
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