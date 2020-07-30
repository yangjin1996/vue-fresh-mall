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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
