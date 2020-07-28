import ModelCmp from'./Model'
const model = {
  install (Vue) {
    const ModelConstructor = Vue.extend(ModelCmp)
    const vm = new ModelConstructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)
    Vue.prototype.$showModel = function({title = '',btn = {confirm:'',cancel:''},success = null,showText = ''}){
      if(btn.confirm !== '' && btn.cancel !== ''){
        vm.visible = true;
        vm.selectSrc = true;
        vm.title = title;
        vm.btn = btn;
        vm.$off('model');
        vm.$on('model',function(result){
          success && success(result);
        })
      }else{
        vm.visible = true;
        vm.selectSrc = false;
        vm.showText = showText;
        setTimeout(function(){
          vm.visible = false
        },2000)
      }
    }
  }
}
export default model