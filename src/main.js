import Vue from 'vue'
import App from './App.vue'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局配置elementui的dialog不能通过点击遮罩层关闭
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI);
// 引入封装的router
import router from '@/router/index'

Vue.config.productionTip = false


// 总线
import Bus from '@/utils/bus.js'
Vue.use(Bus)

import '@/permission'

export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
