import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/index.vue'
import Search from '../pages/search/index.vue'
import GoodsDetail from '../pages/goods-detail/index.vue'
import Cart from '../pages/cart/index.vue'
import User from '../pages/user/index.vue'
import Category from '../pages/category/index.vue'
import Message from '../pages/message/index.vue'
import ConfirmOrder from '../pages/confirm-order/index.vue'
import goodsNotfind from '../pages/goods-notfind/index.vue'
import Login from '../pages/login/index.vue'
import Register from '../pages/register/index.vue'
import UserAddress from '../pages/user-address/index.vue'
import AddAddress from '../pages/add-address/index.vue'
import OrderPay from '../pages/order-pay/index.vue'
import AbnormalPay from '../pages/abnormal-pay/index.vue'
import {Token} from '../utils/token'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/goods-detail',
    name: 'GoodsDetail',
    component: GoodsDetail
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/confirm-order',
    name: 'ConfirmOrder',
    component: ConfirmOrder
  },
  {
    path: '/goods-notfind',
    name: 'goodsNotfind',
    component: goodsNotfind
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user-address',
    name: 'UserAddress',
    component: UserAddress
  },
  {
    path: '/add-address',
    name: 'AddAddress',
    component: AddAddress
  },
  {
    path: '/order-pay',
    name: 'OrderPay',
    component: OrderPay
  },
  {
    path: '/abnormal-pay',
    name: 'AbnormalPay',
    component: AbnormalPay
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//登陆验证
const AUTH_ROUTER_NAME = ['ConfirmOrder','User']
router.beforeEach((to,from,next) => {
  if(AUTH_ROUTER_NAME.includes(to.name)){
    const token = Token.getToken('token')
    if(token === ''){
      const url = to.path
      next(`/login?url=${url}`)
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router
