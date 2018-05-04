import {
  GET_USERINFO,
  SET_ISLOGIN
} from './mutation-types.js'

export default {
  [GET_USERINFO] (state, info) {
    state.userInfo = info
  },
  [SET_ISLOGIN] (state, info) {
    state.isLogin = info
  }
}
