import request from '../utils/request.js'

//获取用户文章列表
export const getArticles = (params)=>{
    return request({
    method: 'get',
    url: '/api/articles',
    params
})
}
//获取关注的用户文章列表
export const getFeedArticles = (params)=>{
    return request({
    method: 'get',
    url: '/api/articles/feed',
    headers:{
        Authorization: 'Token  ${token}'
    },
    params
})
}