import LoadingCmp from'./Loadings'
const loading = {
  install (Vue) {
    const LoadingConstructor = Vue.extend(LoadingCmp)
    const vm = new LoadingConstructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)
    //loading加载动画有两个参数，第一个参数是控制整个动画的显示与消失（默认值为false，默认不显示），
    // 第二个参数控制动画效果（默认为false，默认的动画为旋转加载动画，有遮罩层，若改为true,动画切换为无遮罩层的加载中小动画），
    Vue.prototype.$showLoading = function(showLoading = false,Mask = false){
      vm.showLoading = showLoading;
      vm.Mask = Mask;
    }
  }
}
export default loading