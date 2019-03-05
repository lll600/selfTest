import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: _import('home/index'),
    redirect: '/home',
    children: [
      { path: '/', name: '首页', component: _import('home/index') },
      // { path: '/home', name: '首页2', component: _import('Home/index') },
    ]
  },
]
export default new Router({
  mode: 'history',
  routes: routes
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
