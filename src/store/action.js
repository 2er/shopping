import {
  userInfo
} from '../service/getData'
import {
  GET_USERINFO,
  SET_ISLOGIN
} from './mutation-types.js'

export default {
  async getUserInfo ({
    commit,
    state
  }, params) {
    let resp = await userInfo()
    if (resp.return_code === '0000') {
      commit(GET_USERINFO, resp.data.userinfo)
      if (resp.data.userinfo.length !== 0) {
        commit(SET_ISLOGIN, true)
      } else {
        commit(SET_ISLOGIN, false)
      }
    }
  }
}
