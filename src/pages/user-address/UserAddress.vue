<template>
<div class="wrapper" ref="container">
  <ul>
    <li 
    class="address-container" 
    v-for="item of addressList" 
    :key="item.id" 
    :class="{default:item.is_default}"
    @click="selectAddress(item)"
    >
      <span class="name">{{item.name}}</span>
      <span class="phone">{{item.phone}}</span>
      <p class="address">{{item.province+item.city+item.area+item.address}}</p>
      <div class="operation">
        <span class="iconfont">&#xe7a1; 编辑</span>
        <span class="iconfont">&#xe78d; 删除</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  data() {
    return {
      scroll:null
    }
  },
  props:{
    // addressList:{
    //   type:Array,
    //   default:[]
    // }
    addressList:Array
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    getBscrollBoxHeight(){
      let bodyHeight = document.body.clientHeight;
      const html = document.querySelector('html');
      let WindowHeight = bodyHeight / parseFloat(html.style.fontSize);
      let BscBoxHeight = WindowHeight - 1.6 + 'rem';
      this.$refs.container.style.height = BscBoxHeight
    },
    selectAddress(item){
      this.$router.push({
        name:'ConfirmOrder',
        params:{
          id:item.id,
          name : item.name,
          phone : item.phone,
          province : item.province,
          city : item.city,
          area : item.area,
          address:item.address
        }
      })
    },
    initScroll(){
      this.getBscrollBoxHeight();
      this.scroll = new this.$BScroll('.wrapper',{
        scrollY: true,
        click: true,
        probeType: 3,
        pullDownRefresh:{
          threshold: -10, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          stop: 0
        },
        pullUpLoad: {
          threshold: 40, 
        },
      });
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  padding: .2rem;
  width:100%;
  box-sizing: border-box;
  .address-container{
    width:100%;
    height:2.3rem;
    padding:.2rem;
    margin-bottom: .2rem;
    box-sizing: border-box;
    background-color: #fff;
    color:#666;
    font-size: .28rem;
    line-height: .4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name{
      font-size: .28rem;
      font-weight: 550;
    }
    .phone{
      font-size: .28rem;
      font-weight: 550;
    }
    .address{
      line-height: .35rem;
      display: flex;
      height:0;
      flex:1;
    }
    .operation{
      width:100%;
      height:.32rem;
      color:$color-a;
      font-size: .26rem;
      @include d-flex($justify-c:space-between);
      span{
        font-size: .26rem;
      }
    }
  }
  .default{
    background-color: $color-a;
    color:#fff;
    .operation{
      color:#fff;
    }
  }
}
</style>