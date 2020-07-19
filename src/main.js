import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import BScroll from 'better-scroll'
//?
if(process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = 'http://api.4yue.top/index.php/';
}else {
  axios.defaults.baseURL = 'http://api.4yue.top/index.php/';
}
axios.defaults.appkey = 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM';
// axios.defaults.timeout = 8000;
Vue.prototype.$BScroll = BScroll;
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

// document.addEventListener('DOMContentLoaded',() => {
  const html = document.querySelector('html');
  const fontSize = window.innerWidth / 7.5;
  html.style.fontSize = fontSize + 'px';
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
