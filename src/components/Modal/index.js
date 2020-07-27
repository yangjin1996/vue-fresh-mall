import ModalCmp from'./modal.vue'
const modal = {
  install(Vue){
    const ModalConstructor = Vue.extend(ModalCmp)
    const vm = new ModalConstructor
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)
    Vue.prototype.$showModal = function(){
      vm.visible = true
    }
  }
}
export default{
  modal
}