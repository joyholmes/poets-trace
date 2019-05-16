// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import store from './store/store'


Vue.config.productionTip = false

Vue.use(iView);
Vue.prototype.$axios = axios;

router.beforeEach((to,from,next) =>{
  if(sessionStorage.getItem('userInfo')){
    next()
  }
  else if(to.path == '/Login' || to.path == '/Register' ){
    next()
  } else{
    alert("还没有登陆，请先登录")
    next('/Login')
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
