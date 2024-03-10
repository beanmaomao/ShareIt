// 引入createApp用于创建应用
import {createApp} from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'
//全局引入axios
import axios from 'axios'
//全局引入ElementUI
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'
// 创建一个应用
const app = createApp(App)
 // 使用路由器并挂载整个应用到app容器中
app.use(router).use(ElementPlus).mount('#app')
//创建全局挂载对象
app.config.globalProperties.$axios=axios

