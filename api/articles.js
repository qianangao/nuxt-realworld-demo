import request from '../utils/request.js'

export const getArticles = (params)=>{
    return request({
    method: 'get',
    url: '/api/articles',
    params
})
}