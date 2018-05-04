import ajax from '../config/ajax'

/**
 * 获取短信验证码
 */
export const mobileCode = (params) => ajax('', {
  method: 'register.mobilecode',
  params: params
}, 'POST')

/**
 * 检测帐号是否存在
 */

export const checkExist = (params) => ajax('', {
  method: 'register.checkexist',
  params: params
}, 'POST')

/**
 * 用户注册
 */

export const createUser = (params) => ajax('', {
  method: 'register.create',
  params: params
}, 'POST')

/**
 * 用户登录
 */

export const userLogin = (params) => ajax('', {
  method: 'member.login',
  params: params
}, 'POST')

/**
 * 用户注销
 */

export const userLogout = () => ajax('', {
  method: 'member.logout'
}, 'POST')

/**
 * 用户信息
 */

export const userInfo = () => ajax('', {
  method: 'member.userinfo'
}, 'POST')

/**
 * 用户绑定
 */

export const bindWeixin = (params) => ajax('', {
  method: 'register.bindweixin',
  params: params
}, 'POST')
