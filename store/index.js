const cookieparser = process.server?require('cookieparser'): undefined
export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state,data){
        state.user = data
    }
}

export const actions ={
    nuxtServerInit({commit}, {req}){
        let user = null
        if(req.headers.cookie){
            //将请求头中的Cookie字符串解析成一个对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
                
            } catch (e) {
                
            }
        }
        commit('setUser', user)
    }
}