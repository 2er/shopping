<template>
  <div class="member-container">
    <wv-header title="个人中心" :fixed="false" background-color="#ffffff">
      <div class="login-back" slot="left" @click="$router.push('/home')">
        <icon name="chevron-left" :style="{color:'#A9A9A9'}"></icon>
      </div>
    </wv-header>
    <div class="member-body">
      <div class="body-head">
        <img :src="userInfo.headimgurl"/>
      </div>
    </div>
    <div class="member-btns">
      <wv-button class="member-btn" type="warn" @click.prevent="doLogout">注销</wv-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'we-vue'
import {userLogout} from '../../service/getData'
import {
  wxOauth
} from '../../config/env'
export default {
  name: 'member',
  data () {
    return {
      duration: 2000
    }
  },
  created: function () {
    if (!this.isLogin) {
      let ua = navigator.userAgent.toLowerCase()
      this.isWeiXin = !!(/micromessenger/.test(ua))
      if (this.isWeiXin) {
        window.location.href = wxOauth
        return
      }
      this.$router.replace('/login')
    }
  },
  computed: mapState({
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  }),
  methods: {
    ...mapActions([
    ]),
    async doLogout () {
      let logoutRes = await userLogout()
      if (logoutRes.return_code !== '0000') {
        Toast({
          duration: this.duration,
          message: logoutRes.return_msg,
          icon: 'warn'
        })
        return false
      }
      Toast({
        duration: this.duration,
        message: '注销成功',
        icon: 'success'
      })
      this.timer = setInterval(() => {
        clearInterval(this.timer)
        this.$router.push('/home')
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
  .member-container {
    .wv-header{
      color: #A9A9A9;
    }
    .member-body {
      width: 100%;
      .body-head {
        width: 90%;
        margin-left: 5%;
        text-align: center;
        img {
          width: 50%;
          border-radius: 50%;
        }
      }
    }
    .member-btns {
      margin-top: 15px;
      width: 90%;
      margin-left: 4%;
      .wv-button{
        margin-left: 5%;
      }
    }
  }
</style>
