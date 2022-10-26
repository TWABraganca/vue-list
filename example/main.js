import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import VueList from '../src/main.js'
Vue.use(VueList)

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
