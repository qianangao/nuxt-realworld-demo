/**
 * 请求模块封装
 */
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})

//请求拦截器
// request.interceptors.request(config => {
//     return config
// })

// request.interceptors.response(response => {
//     return response
// })


//响应拦截器

export default request