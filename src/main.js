import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/index.scss'
import api from './api/api'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index.js'
import './api/moke.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.config.globalProperties.$api = api

// 菜單持久化刷新,掛載在頁面渲染之前
store.commit("addMenu", router);

//對比路由逕行判斷是否存在
//將傳進來的路由參數path，跟現有的路由比對（router.getRoutes()）,使用過濾filter方法
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(route => route.path == path).length;
  if (hasCheck) {
    return true
  } else {
    return false
  }
};

checkRouter()
//路由守衛
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (!checkRouter(to.path)) {
    //如果輸入的沒有該路由,統一跳轉至home
    next({ name: 'home' })
  }
  else {
    next()
  }
})
app.use(router).use(store).mount('#app')


