import ModelCmp from'./Model'
const model = {
  install (Vue) {
    const ModelConstructor = Vue.extend(ModelCmp)
    const vm = new ModelConstructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)
    Vue.prototype.$showModel = function({title = '',btn = {confirm:'',cancel:''},success = null,showText = '',showMask=false}){
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