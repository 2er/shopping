<template>
  <div class="register-container">
    <wv-header title="注册" :fixed="false" background-color="#1aad19">
      <div class="register-back" slot="left" @click="$router.go(-1)">
        <icon name="chevron-left" scale="1"></icon>
      </div>
    </wv-header>
    <wv-group class="register-form">
      <wv-input label="手机号" type="number" placeholder="请输入手机号" v-model="phoneNumber" required pattern="^1[0-9]{10}$" :validate-mode="{onFocus: false}"></wv-input>
      <wv-input label="短信验证码" placeholder="请输入验证码" v-model="captcha">
        <button class="weui-vcode-btn" @click.prevent="getVerifyCode" slot="ft" v-show="!computedTime">获取验证码</button >
        <button class="weui-vcode-btn" @click.prevent slot="ft" v-show="computedTime">{{computedTime}}</button >
      </wv-input>
      <wv-input type="password" label="密码" placeholder="请输入密码" v-model="passWord" required></wv-input>
      <wv-input type="password" label="密码确认" placeholder="请再次输入密码" v-model="verifyPass" required></wv-input>
    </wv-group>
    <div class="register-deal">
      <wv-icon :type="iconType" @click.prevent="changeIconType"></wv-icon><router-link class="deal-content" to="/deal">同意用户注册协议</router-link>
    </div>
    <div class="register-btns">
      <wv-button class="register-btn" type="default" @click.prevent="createUser">注册</wv-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'we-vue'
import {mobileCode, checkExist, createUser} from '../../service/getData'
export default {
  name: 'register',
  data () {
    return {
      phoneNumber: null, // 手机号码
      captcha: null, // 短信验证码
      computedTime: null, // 倒计时
      passWord: null, // 密码
      verifyPass: null, // 确认密码
      iconType: 'success', // 用户协议icon类型
      duration: 2000
    }
  },
  created: function () {
  },
  computed: mapState({
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  }),
  methods: {
    ...mapActions([
    ]),
    // 获取短信验证码
    async getVerifyCode () {
      if (this.rightPhoneNumber) {
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.timer)
          }
        }, 1000)
        // 判读用户是否存在
        let exist = await checkExist({phoneNumber: this.phoneNumber})
        if (exist.return_code !== '0000') {
          Toast({
            duration: this.duration,
            message: '用户已存在',
            icon: 'warn'
          })
          return false
        }
        // 发送短信验证码
        let res = await mobileCode({phoneNumber: this.phoneNumber})
        if (res.return_code !== '0000') {
          Toast({
            duration: this.duration,
            message: '验证码发送失败',
            icon: 'warn'
          })
          return false
        }
      } else {
        Toast({
          duration: this.duration,
          message: '请先输入手机号',
          icon: 'warn'
        })
        return false
      }
    },
    changeIconType: function () {
      this.iconType = this.iconType === 'success' ? 'circle' : 'success'
    },
    async createUser () {
      if (!this.phoneNumber) {
        Toast({
          duration: this.duration,
          message: '请先输入手机号',
          icon: 'warn'
        })
        return false
      }

      if (!this.captcha) {
        Toast({
          duration: this.duration,
          message: '请先输入短信验证码',
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

      if (this.passWord !== this.verifyPass) {
        Toast({
          duration: this.duration,
          message: '两次密码输入不一致',
          icon: 'warn'
        })
        return false
      }

      let createRes = await createUser({phoneNumber: this.phoneNumber, captcha: this.captcha, passWord: this.passWord})
      console.log(createRes)
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
        message: '注册成功',
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
  .register-container .wv-header .register-back .fa-icon{
    margin-bottom: 5px;
  }
  .register-container .register-deal {
    margin-top: 15px;
    width: 90%;
    margin-left: 4%;
  }
  .register-container .register-deal .deal-content{
    padding-left: 5%;
    text-decoration: underline;
    color: #343434;
  }
  .register-container .register-btns {
    margin-top: 15px;
    width: 90%;
    margin-left: 4%;
  }
  .register-container .register-btns .wv-button{
    margin-left: 5%;
  }
</style>
