<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <ul class="nav">
    <li class="nav-cell" @click="category = 'consignment';status = 1" :class="{on : category === 'consignment'}">已付款</li>
    <li class="nav-cell" @click="category = 'received';status = 2" :class="{on : category === 'received'}">待发货</li>
    <li class="nav-cell" @click="category = 'finished';status = 3" :class="{on : category === 'finished'}">待收货</li>
    <li class="nav-cell" @click="category = 'finish';status = 4" :class="{on : category === 'finish'}">已完成</li>
  </ul>
  <div class="wrapper-container" ref="container">
    <div>
      <transition name="fade">
        <div v-if="pullingDown" class="loading">加载中 <img src="@/assets/images/loading.gif"></div>
      </transition>
      <consignment :Consignment="category" :consignmentData="consignmentData"></consignment>
      <received :Received="category" :receivedData="receivedData"></received>
      <finished :Finished="category" :finishedData="finishedData"></finished>
      <after-sales :Finish="category" :finishData="finishData"></after-sales>
      <transition name="fade">
        <div v-if="pullingUp" class="loading">加载中 <img src="@/assets/images/loading.gif"></div>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import {Token} from '@/utils/token';
import CommonHeader from'@/components/Header';
import Consignment from'./Consignment';
import Received from'./Received';
import Finished from'./Finished';
import AfterSales from'./AfterSales';
export default {
  components:{
    CommonHeader,
    Consignment,
    Received,
    Finished,
    AfterSales
  },
  data() {
    return {
      backUrl:'/',
      back:true,
      title:'我的订单',
      category:'consignment',
      page:1,
      count:8,
      total:0,
      status:1,
      type:'',
      scroll:null,
      consignmentData:[],
      finishedData:[],
      receivedData:[],
      finishData:[],
      pullingDown:false,
      pullingUp:false,
      goodsList:[
        {img:"@/assets/images/loading.gif"},
        {img:"@/assets/images/loading.gif"},
      ],
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.category = to.query.category || 'consignment'
      vm.backUrl = from.path
    })
  },
  mounted() {
    this.initPage()
  },
  methods: {
    async initPage(status){
      this.getBscrollBoxHeight();
      if(!status){
        this.getOrderData(1);
        this.getOrderData(2);
        this.getOrderData(3);
        this.getOrderData(4);
      }else{
        this.getOrderData(status);
      }
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
      this.scroll.on('pullingDown',() => {
        this.pullingDown = true;
        this.type = 'down';
        this.initPage(this.status);
      });
      this.scroll.on('pullingUp',() => {
        console.log('pullingUp');
        this.pullingUp = true;
        this.type = 'up';
        this.getOrderData(this.status)
      })
    },
    getBscrollBoxHeight(){
      let bodyHeight = document.body.clientHeight;
      const html = document.querySelector('html');
      let WindowHeight = bodyHeight / parseFloat(html.style.fontSize);
      let BscBoxHeight = WindowHeight - 2.2 + 'rem';
      this.$refs.container.style.height = BscBoxHeight
    },
    async getOrderData(status){
      const USER_TOKEN = Token.getToken()
      let orderList;
      if(this.type === ''){
         this.$showLoading(true);
      }else if (this.type === 'up') {
        if(this.page < Math.ceil(this.total / 8)){
          this.page++
        }else{
          this.pullingUp = false;
          this.scroll.finishPullUp();
          return
        }
      }else if(this.type === 'down'){
        this.page = 1;
      }
      await this.axios.get('api/user/order?type=2',{
        params:{
          page:this.page,
          count:this.count,
          type:status
        },
        headers:{
          token:USER_TOKEN
        }
      }).then(res => {
        orderList = res.data.data;
        if(this.type === ''){
          this.$showLoading(false);
        }else{
          this.pullingDown = false;
          this.pullingUp = false;
          this.scroll.finishPullUp();
          this.scroll.finishPullDown();
        }
      })
      if(status === 1){
        if(this.type === 'down'){
          this.consignmentData = [];
        }
        this.consignmentData = this.consignmentData.concat(orderList.list)
        this.total = orderList.total
      }else if(status === 2){
        if(this.type === 'down'){
          this.receivedData = [];
        }
        this.receivedData = this.receivedData.concat(orderList.list)
        this.total = orderList.total
      }else if(status === 3){
        if(this.type === 'down'){
          this.finishedData = [];
        }
        this.finishedData = this.finishedData.concat(orderList.list)
        this.total = orderList.total
      }else if(status === 4){
        if(this.type === 'down'){
          this.finishData = [];
        }
        this.finishData = this.finishData.concat(orderList.list)
        this.total = orderList.total
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to{
  transform: scale(0);
}
.wrapper-container{
  width:100%;
  overflow: hidden;
}
.loading{
  font-size:.2rem;
  color:#999;
  padding-bottom:.2rem;
  text-align:center;
  img{
    width:.3rem;
    height:.3rem;
  }
}
.wrap{
  padding-top: 1.8rem;
  box-sizing: border-box;
}
.nav{
  padding-top:.8rem;
  margin-bottom: .2rem;
  width:100%;
  height:.8rem;
  background-color: #fff;
  @include d-flex($justify-c:space-around);
  position: fixed;
  left:0;
  top:0;
  z-index: 2;
  .nav-cell{
    font-size:.28rem;
    color:#666;
    padding: .25rem 0;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
  }
  .on{
    color:$color-a;
    border-bottom: 1px solid $color-a;
  }
}
</style>