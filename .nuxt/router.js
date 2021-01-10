import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10c03eb6 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _032ca92a = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _61f7eb46 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _115c90c6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _f7b566a2 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _04f164f9 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _43c80a2c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _10c03eb6,
    children: [{
      path: "",
      component: _032ca92a,
      name: "home"
    }, {
      path: "/login",
      component: _61f7eb46,
      name: "login"
    }, {
      path: "/register",
      component: _61f7eb46,
      name: "register"
    }, {
      path: "/profile",
      component: _115c90c6,
      name: "profile"
    }, {
      path: "/settings",
      component: _f7b566a2,
      name: "settings"
    }, {
      path: "/editor",
      component: _04f164f9,
      name: "editor"
    }, {
      path: "/article",
      component: _43c80a2c,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
