import Vue from 'vue'
import App from './App'
import framework from './framework'
import mixin from './mixin.js'
Vue.config.productionTip = false
Vue.use(framework)
Vue.mixin(mixin)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
