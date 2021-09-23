import Vue from 'vue'
import App from './App.vue'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import Vuesax from 'vuesax'
import { Plugin } from 'vue-fragment'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import store from './store/store'

Vue.use(VueTelInput);
Vue.use(Plugin)
Vue.config.productionTip = false
Vue.use(Vuesax, {
  theme:{
    colors:{
      primary:'#5b3cc4',
      success:'rgb(23, 201, 100)',
      danger:'rgb(242, 19, 93)',
      warning:'rgb(255, 130, 0)',
      dark:'rgb(36, 33, 69)'
    }
  }})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
