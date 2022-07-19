<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginClass}" @click="loginClass=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginClass}" @click="loginClass=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!-- 短信登录 -->
          <div :class="{on:loginClass}">
            <!-- 手机号输入框 -->
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" 
              @click.prevent="getCode">
              {{codeTime>0 ? `已发送(${codeTime}s)` : '获取验证码'}}
              </button>
            </section>
            <!-- 验证码输入框 -->
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 密码登录 -->
          <div :class="{on:!loginClass}">
            <section>
              <!-- 用户名输入框 -->
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <!-- 密码输入框 -->
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="{on:showPwd}" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <!-- 验证码输入框 -->
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqSendCode, reqPwdLogin, reqSmsLogin, reqUserInfo} from '../../api'
import router from '../../router'
export default {
  data() {
    return {
      loginClass:true,  // 登录导航切换loginWay
      codeTime:0,  //验证码计时器
      showPwd:false, // 是否隐藏密码
      phone:'', //手机号
      name:'',  // 用户名
      pwd:'',   // 密码
      code:'', // 短信验证码
      captcha:'',  // 图形验证码
      alertText:'',  // 提示错误信息
      showAlert:false,   // 是否提示
    }
  },
  computed:{
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    },
  },
  methods: {
    // 异步获取短信验证码
    async getCode(){
      if (!this.codeTime) {
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this.AlertFn(result.msg)
          if (this.codeTime) {
            this.codeTime = 0
            clearInterval(this.intervalID)
            this.intervalID = undefined
          }
        }else{
        this.codeTime = 60
        this.intervalID = setInterval(() => {
          this.codeTime--
          if (this.codeTime<=0) {
            clearInterval(this.intervalID)
          }
        },1000)
        }
      }

    },
    AlertFn(alertText){
      this.showAlert = true
      this.alertText = alertText
    },
    // 异步登录
    async login(){
      // 定义通用result
      var result
      if (this.loginClass) {  //  手机号登录
        // 手机号错误
        if (!this.rightPhone) {
          this.AlertFn('请输入正确的手机号')
          return
        }
        // 短信验证码错误
        else if (!/^\d{6}/.test(this.code)) {
          this.AlertFn('手机验证码错误')
          return
        }
        // 手机号登录
        result = await reqSmsLogin(this.phone, this.code)
        if (result.code === 0) {  // 登录成功
          // 将user数据保存到state
          // 跳转至个人中心
          this.$router.replace('/person')
        }else{
          this.AlertFn(result.msg)
        }
      }
      else{  //  密码登录
      const {name, pwd, captcha} = this
        // 用户名错误
        if (!this.name){
          this.AlertFn('用户名错误')
          return
        }
        // 密码错误
        else if (!this.pwd){
          this.AlertFn('密码错误')
          return
        }
        // 图形验证码错误
        else if (!this.captcha){
          this.AlertFn('请输入正确的验证码')
          return
        }
        // 密码登录
        result = await reqPwdLogin({name, pwd, captcha})
        
      }

      // 判断后台返回值
      if (result.code === 0) {  // 登录成功
        // 将user数据保存到state
        const user = result.data
        this.$store.dispatch('recordUser',user)
        // 跳转至个人中心
        this.$router.replace('/person')
      }
      else{
        this.AlertFn(result.msg)
        this.getCaptcha()
      }
    },
    // 关闭提示框
    closeTip(){
      this.showAlert = false
      this.alertText = ''
    },
    // 更换验证码
    getCaptcha(){
      // 利用事件戳实现更新验证码
      this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()
    }
  },
  components:{
    AlertTip
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          text-decoration: none
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              text-decoration: none
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        text-decoration: none
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      text-decoration: none
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>