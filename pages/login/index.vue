<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ?'Sign In' :'Sign up' }}</h1>
        <p class="text-xs-center">
            <Nuxt-link v-if="isLogin" to="/register">Need an account?</Nuxt-link>
            <Nuxt-link v-else to="/login">Have an account?</Nuxt-link>
        </p>

        <ul class="error-messages">
            <template v-for="(messages,field) in errors">
                <li v-for="(message,index) in messages" :key="index">{{field}} {{message}}</li>
            </template>
        </ul>

        <form @submit.prevent="handleSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input required class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
          </fieldset>
          <fieldset class="form-group">
            <input required class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email">
          </fieldset>
          <fieldset class="form-group">
            <input required class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin ? 'Sign In' :'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {login,register} from "@/api/index.js"
const Cookie = process.client ?require('js-cookie') : undefined
export default {
    name:'loginIndex',
    middleware:'noAuth',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors:[]
        }
    },
    computed:{
        isLogin() {
            return this.$route.name === 'login'
        }
    },
    methods:{
        async handleSubmit() {
            try {
                const {data} = this.isLogin? await login({
                    user:this.user
                })
                :await register({user:this.user})
                console.log("data",data);
                this.$store.commit('setUser',data.user)
                Cookie.set('user', data.user)
                this.$router.push('/')
            } catch (error) {
                this.errors = error.response.data.errors
            }
            
        }
    }

}
</script>

<style>

</style>