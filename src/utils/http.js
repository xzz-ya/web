import axios from 'axios'

import {
    Message
} from 'element-plus';


// 创建axios实例
axios.defaults.headers['Context-Type'] = 'application/x-www-form-urlencoded';

const serviceFroRiver = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 20000 // 请求超时时间
})
// request interceptor
serviceFroRiver.interceptors.request.use(config => {


    if (config.method == 'get') {
        config.params._t = Date.parse(new Date()) / 1000;
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// response 拦截器
serviceFroRiver.interceptors.response.use(

    response => {
        const res = response.data
        if (res.code !== 200 && res.code !== 140002) {
            Message("提示:" + res.message)
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        Message("error:" + error)
        return Promise.reject(error)
    }
)

export {
    serviceFroRiver
}
