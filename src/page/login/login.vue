<template>
  <div class="login-container">
    <wv-header title="登录" :fixed="false" background-color="#1aad19">
      <div class="login-back" slot="left" @click="$router.go(-1)">
        <icon name="chevron-left" scale="1"></icon>
      </div>
    </wv-header>
    <wv-group class="login-form">
      <wv-input label="手机号" type="number" placeholder="请输入手机号" v-model="phoneNumber" required pattern="^1[0-9]{10}$" :validate-mode="{onFocus: false}"></wv-input>
      <wv-input type="password" label="密码" placeholder="请输入内容" v-model="passWord" required></wv-input>
      <wv-input label="验证码" :maxlength="maxLength" class="weui-cell_vcode" placeholder="请输入验证码" v-model="vcode">
        <img :src="vcodeUrl" class="vcode" slot="ft"/>
      </wv-input>
    </wv-group>
    <div class="login-btns">
      <wv-button class="login-btn" type="primary" @click.prevent="doLogin">登录</wv-button>
      <wv-button class="register-btn" type="default" @click="$router.push('/register')">立即注册</wv-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'we-vue'
import {userLogin} from '../../service/getData'
import {
  wxOauth
} from '../../config/env'
export default {
  name: 'login',
  data () {
    return {
      phoneNumber: null, // 手机号码
      passWord: null, // 密码
      vcode: null, // 验证码
      vcodeUrl: 'http://192.168.2.160:8081/yktstore/index.php/passport-gen_vcode.html#1525248691620',
      timer: null,
      duration: 2000,
      isWeiXin: false,
      maxLength: 4
    }
  },
  created: function () {
    let ua = navigator.userAgent.toLowerCase()
    this.isWeiXin = !!(/micromessenger/.test(ua))
    if (this.isWeiXin) {
      window.location.href = wxOauth
    }
  },
  computed: mapState({
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  }),
  methods: {
    ...mapActions([
    ]),
    async doLogin () {
      if (!this.phoneNumber) {
        Toast({
          duration: this.duration,
          message: '请先输入手机号',
          icon: 'warn'
        })
        return false
      }

      if (!this.passWord) {
        Toast({
          duration: this.duration,
          message: '请先输入密码',
          icon: 'warn'
        })
        return false
      }

      if (!this.vcode) {
        Toast({
          duration: this.duration,
          message: '请先输入验证码',
          icon: 'warn'
        })
        return false
      }

      let createRes = await userLogin({phoneNumber: this.phoneNumber, passWord: this.passWord, vcode: this.vcode})
      if (createRes.return_code !== '0000') {
        Toast({
          duration: this.duration,
          message: createRes.return_msg,
          icon: 'warn'
        })
        return false
      }
      Toast({
        duration: this.duration,
        message: '登录成功',
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

<style scoped>
  .login-container .wv-header .login-back .fa-icon{
    margin-bottom: 5px;
  }
  .login-container .login-form .weui-cell_vcode {
    height: 46px;
    padding-right: 10%;
  }
  .login-container .login-btns {
    margin-top: 15px;
    width: 90%;
    margin-left: 4%;
  }
  .login-container .login-btns .wv-button{
    margin-left: 5%;
  }
</style>
