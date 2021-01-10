import request from '../utils/request.js'

export const getTags = ()=>{
    return request({
    method: 'get',
    url: '/api/tags',
})
}