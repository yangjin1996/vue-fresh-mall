import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/index.vue'
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
    component: () => import('../pages/search/index.vue')
  },
  {
    path: '/goods-detail',
    name: 'GoodsDetail',
    component: () => import('../pages/goods-detail/index.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../pages/user/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../pages/cart/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../pages/category/index.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../pages/message/index.vue')
  },
  {
    path: '/confirm-order',
    name: 'ConfirmOrder',
    component: () => import('../pages/confirm-order/index.vue')
  },
  {
    path: '/goods-notfind',
    name: 'goodsNotfind',
    component: () => import('../pages/goods-notfind/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/register/index.vue')
  },
  {
    path: '/user-address',
    name: 'UserAddress',
    component: () => import('../pages/user-address/index.vue')
  },
  {
    path: '/add-address',
    name: 'AddAddress',
    component: () => import('../pages/add-address/index.vue')
  },
  {
    path: '/order-pay',
    name: 'OrderPay',
    component: () => import('../pages/order-pay/index.vue')
  },
  {
    path: '/abnormal-pay',
    name: 'AbnormalPay',
    component: () => import('../pages/abnormal-pay/index.vue')
  },
  {
    path: '/my-order',
    name: 'MyOrder',
    component: () => import('../pages/my-order/index.vue')
  },
  {
    path: '/after-sales-detail',
    name: 'AfterSalesDetail',
    component: () => import('../pages/after-sales-detail/index.vue')
  },
  {
    path: '/order-detail',
    name: 'OrderDetail',
    component: () => import('../pages/order-detail/index.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//登陆验证
const AUTH_ROUTER_NAME = [
  'ConfirmOrder',
  'User',
  'Message',
  'ConfirmOrder',
  'UserAddress',
  'AddAddress',
  'OrderPay',
  'AbnormalPay',
  'MyOrder',
  'AfterSalesDetail',
  'OrderDetail'
]
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
