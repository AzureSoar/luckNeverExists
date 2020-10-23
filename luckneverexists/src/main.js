import Vue from 'vue'
import App from './App.vue'
import LuckDraw from 'vue-luck-draw'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.use(LuckDraw)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
