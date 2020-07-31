import ModelCmp from'./Model'
const model = {
  install (Vue) {
    const ModelConstructor = Vue.extend(ModelCmp)
    const vm = new ModelConstructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)
    //弹窗插件共有5个参数 showMask控制弹窗遮罩层的显示与消失，弹窗分为两种类型，
    // 第一种类型为选择模式（有title，btn，success三个参数,success为点击确定之后执行的回调函数）
    // 第二种为提示弹窗，提示某种操作成功，2s后自动消失
    Vue.prototype.$showModel = function({showMask=false,title = '',btn = {confirm:'',cancel:''},success = null,showText = '',}){
      if(btn.confirm !== '' && btn.cancel !== ''){
        vm.visible = true;
        vm.selectSrc = true;
        vm.showMask = showMask;
        vm.title = title;
        vm.btn = btn;
        vm.$off('model');
        vm.$on('model',function(result){
          success && success(result);
        })
      }else{
        vm.visible = true;
        vm.selectSrc = false;
        vm.showMask = showMask;
        vm.showText = showText;
        setTimeout(function(){
          vm.visible = false
        },2000)
      }
    }
  }
}
export default model