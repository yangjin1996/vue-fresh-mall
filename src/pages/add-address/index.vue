<template>
<div class="wrapper">
  <common-header :backUrl="backUrl" :back="back" :title="title"></common-header>
  <div class="container">
    <div class="cell">
      <span>收货人:</span><input class="input" type="text" placeholder="姓名" v-model="name">
    </div>
    <div class="cell">
      <span>联系电话:</span><input class="input" type="text" placeholder="手机或固话" v-model="phone">
    </div>
    <div class="cell">
      <span>选择地区:</span>
      <div class="input choose-add" @click="showChooseAddress = true">
        <span class="iconfont">{{province+' '+city+' '+area ? province+' '+city+' '+area : '省市区'}} &#xe60e;</span>
      </div>
    </div>
    <div class="cell">
      <span>详细地址:</span><input class="input" type="text" placeholder="街道（门牌号）" v-model="address">
    </div>
    <div class="cell">
      <span>设为默认地址:</span>
      <div class="switch-container">
        <input type="checkbox" id="user-switch" v-model="isDefault">
        <label for="user-switch"></label>
      </div>
    </div>
  </div>
  <transition name="address-mask">
    <div class="choose-address" v-if="showChooseAddress">
      <div class="mask" @click="showChooseAddress = false">
        <div @click.stop>
          <v-distpicker type="mobile" @selected="getAddress"></v-distpicker>
        </div>
      </div>
    </div>
  </transition>
  <div class="save" @click="saveAddress">保存</div>
</div>
</template>

<script>
import CommonHeader from'@/components/Header';
import VDistpicker from 'v-distpicker';
import { Token } from '@/utils/token';
const USER_TOKEN = Token.getToken()
export default {
  name:"AddAddress",
  components:{
    CommonHeader,
    VDistpicker
  },
  data() {
    return {
      backUrl:'',
      back:true,
      title:'添加地址',
      showChooseAddress:false,
      province:'',
      city:'',
      area:'',
      name:'',
      phone:'',
      address:'',
      isDefault:true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  methods: {
    getAddress(data){
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    validate(){
      if(this.name === ''){
        this.$showModel({
          showText:'姓名为空',
          showMask:true
        })
        return false
      };
      if(this.phone === ''){
        this.$showModel({
          showText:'电话号码为空',
          showMask:true
        })
        return false
      };
      if(this.province === ''){
        this.$showModel({
          showText:'请选择地区（省）',
          showMask:true
        })
        return false
      };
      if(this.city === ''){
        this.$showModel({
          showText:'请选择地区（市）',
          showMask:true
        })
        return false
      };
      if(this.area === ''){
        this.$showModel({
          showText:'请选择地区（区）',
          showMask:true
        })
        return false
      };
      if(this.addressDetail === ''){
        this.$showModel({
          showText:'请填写详细地址',
          showMask:true
        })
        return false
      };
      return true
    },
    async saveAddress(){
      let validateData = this.validate();
      let data = {
        name : this.name,
        phone : this.phone,
        province : this.province || '',
        city : this.city || '',
        area : this.area || '',
        address : this.address,
        is_default : this.isDefault ? 1 : 0
      }
      if(validateData){
        this.$showLoading(true);
        await this.axios.post('shose/address/add?type=2',data,{
          headers:{
            token:USER_TOKEN
          }
        }).then(() => {
          this.$router.push({
            path:this.backUrl
          })
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.$showLoading()
        })
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.address-mask-enter-active,
.address-mask-leave-active{ 
  opacity: 1;
  transition: opacity .5s;
}
.address-mask-enter,
.address-mask-leave-to{
  opacity: 0;
}
.wrapper{
  padding-top:.9rem;
  box-sizing: border-box;
  .container{
    width:100%;
    padding:.2rem;
    box-sizing: border-box;
    .cell{
      height:.7rem;
      margin-bottom: .1rem;
      background-color: #fff;
      border-radius: .1rem;
      @include d-flex($justify-c:space-between);
      span{
        width:1.9rem;
        height:100%;
        padding-left:.1rem;
        box-sizing: border-box;
        font-size: .28rem;
        color:#666;
         @include d-flex($justify-c:flex-start);
      }
      .input{
        height:100%;
        display: flex;
        width:0;
        flex:1;
        outline: medium;
        color:#666;
        font-size:.28rem;
      }
      .input.choose-add{
        span{
          width:100%;display: flex;
          width: 0;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
        }
      }
      ::-webkit-input-placeholder{
        color:#ccc;
      }
    }
  }
}
.switch-container{
  height: .5rem;
  width: 1rem;
  display: inline-block;
  overflow: hidden;
}
.switch-container input{
  display: none
}
.switch-container label{
  display: block;
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.25);
  cursor: pointer;
  border-radius: .5rem;
  transition: all .4s ease;
}
.switch-container label:before{
  content:'';
  display: block;
  border-radius: .5rem;
  height: .42rem;
  width: .42rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
  transition: all .4s ease;
  background-color: #fff;
  position: relative;
  right: -2px;
  top: 2px;
}

.switch-container input:checked~label:before{
  right: -.5rem;
  background-color: #fff;
}

.switch-container input:checked~label{
  background-color: $color-a;
}
.choose-address{
  width:100%;
  height:100%;
  position: fixed;
  left:0;
  top:0;
  z-index: 10002;
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    /deep/ .distpicker-address-wrapper{
      width:100%;
      height:50%;
      position: absolute;
      left:0;
      top:50%;
      background-color: #fff;
    }
  }
}

/deep/ .address-container{
  overflow: auto;
  height:100%;
}
.save{
  width:90%;
  height:.8rem;
  border-radius: .1rem;
  margin:0 auto;
  color:#fff;
  background-color: $color-a;
  font-size:.3rem;
  @include d-flex;
}
</style>