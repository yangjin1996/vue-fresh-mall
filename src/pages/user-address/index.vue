<template>
<div class="wrap">
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <user-address></user-address>
  <router-link tag="div" to="/add-address" class="add-address" v-if="showAddAddress">
    <span class="iconfont">&#xe626; </span>添加新地址
  </router-link>
</div>
</template>

<script>
import CommonHeader from'@/components/Header';
import UserAddress from'./UserAddress';
import {Token} from '@/utils/token';
const USER_TOKEN = Token.getToken()
export default {
  components:{
    CommonHeader,
    UserAddress
  },
  data() {
    return {
      backUrl:'',
      back:true,
      title:'我的地址',
      addressList:[],
      showAddAddress:true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted() {
    this.getUserAddress();
  },
  // computed: {
  //   addressNum(){
  //     this.showAddAddress = this.address.length <= 10 ? true : false
  //     return this.address.length
  //   }
  // },
  methods: {
    async getUserAddress(){
      await this.axios.get('shose/address?type=2',{
        headers:{
          token:USER_TOKEN
        }
      }).then(res => {
        this.addressList = res.data.data.address
      })
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap{
  padding-top:1rem;
  box-sizing: border-box;
  .add-address{
    width:100%;
    height:.8rem;
    background-color: $color-a;
    position: fixed;
    left:0;
    bottom: 0;
    font-size: .28rem;
    color:#fff;
    @include d-flex;
    .iconfont{
      font-size: .26rem;
      margin-right:.1rem;
    }
  }
}
</style>