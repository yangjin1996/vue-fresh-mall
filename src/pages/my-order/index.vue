<template>
<div class='wrap'>
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <ul class="nav">
    <li class="nav-cell" @click="category = 'consignment'" :class="{on : category === 'consignment'}">待发货</li>
    <li class="nav-cell" @click="category = 'received'" :class="{on : category === 'received'}">待收货</li>
    <li class="nav-cell" @click="category = 'finished'" :class="{on : category === 'finished'}">已完成</li>
    <li class="nav-cell" @click="category = 'after-sales'" :class="{on : category === 'after-sales'}">售后</li>
  </ul>
  <consignment :Consignment="category" :consignmentData="consignmentData"></consignment>
  <received :Received="category" :receivedData="receivedData"></received>
  <finished :Finished="category" :finishedData="finishedData"></finished>
</div>
</template>

<script>
import {Token} from '@/utils/token';
const USER_TOKEN = Token.getToken()
import CommonHeader from'@/components/Header';
import Consignment from'./Consignment';
import Received from'./Received';
import Finished from'./Finished';
export default {
  components:{
    CommonHeader,
    Consignment,
    Received,
    Finished,
  },
  data() {
    return {
      backUrl:'/',
      back:true,
      title:'我的订单',
      category:'consignment',
      orderList:[],
      consignmentData:[],
      finishedData:[],
      receivedData:[]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.category = to.query.category || 'consignment'
      vm.backUrl = from.path
    })
  },
  mounted() {
    this. getOrderData()
  },
  methods: {
    async getOrderData(){
      this.$showLoading(true);
      await this.axios.get('api/user/order?type=2',{//'shose/order?type=2'
        params:{},
        headers:{
          token:USER_TOKEN
        }
      }).then(res => {
        this.orderList = res.data.data.list;
        if(this.orderList.length === 0){
          this.$showModel({
            showText:'没有订单'
          })
        }else{
          //存储订单数据
          this.formatData(this.orderList)
        }
        this.$showLoading(false)
      })
    },
    formatData(data){
      // 1表示待发货，2表示待收货，3表示已完成
      // this.consignmentData = data.filter(item => {
      //   return item.status === 1
      // });
      // this.receivedData = data.filter(item => {
      //   return item.status === 2
      // });
      // this.finishedData = data.filter(item => {
      //   return item.status === 3
      // });
      this.consignmentData = data.slice(0,3);
      this.receivedData = data.slice(3,5);
      this.finishedData = data.slice(5);
    }
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
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
  }
  .on{
    color:$color-a;
    border-bottom: 1px solid $color-a;
  }
}
</style>