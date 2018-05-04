import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const member = r => require.ensure([], () => r(require('../page/member/index')), 'member')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/login/register')), 'register')
const bindweixin = r => require.ensure([], () => r(require('../page/login/bindweixin')), 'bindweixin')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [ // 二级路由。对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      component: home,
      meta: {
        title: '首页'
      }
    },
    // 个人中心
    {
      path: '/member',
      component: member,
      meta: {
        title: '个人中心'
      }
    },
    // 登录
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    // 注册
    {
      path: '/register',
      component: register,
      meta: {
        title: '注册'
      }
    },
    // 绑定微信
    {
      path: '/bindweixin/:session_id',
      component: bindweixin,
      meta: {
        title: '会员绑定'
      }
    }
  ]
}]
