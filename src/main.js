import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store/'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import 'we-vue/src/assets/iconfont/iconfont.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.use(VueRouter)
Vue.use(WeVue)
Vue.component('icon', Icon)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    // document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store
}).$mount('#app')
