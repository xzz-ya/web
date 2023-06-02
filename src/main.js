import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import mitt from 'mitt'
import router from './router/index'

// 引入echarts
import echarts from 'echarts'
// import * as echarts from 'echarts';
// 设置全局 echarts



const app = createApp(App)

app.config.globalProperties.axios = axios

// 全局方法
app.config.globalProperties.$echarts = echarts

// vue3.x的全局实例，要挂载在config.globalProperties上
// app.config.globalProperties.$Bus = new mitt()
// app.config.globalProperties.$Bus = mitt();

app.use(ElementPlus)
// app.use(store)
// app.use(echarts)
app.use(router)
app.use(VueAxios,axios)
app.mount('#app')