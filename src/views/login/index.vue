<template>
  <div class="login-wrap">
    <!-- <div class="logo1">
      <img src="@/assets/img/logo.png" class="image" @click="goToHomePage">
    </div> -->
    <div class="ms-login">
      <div class="ms-title">后台管理登录系统</div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" class="ms-content">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <div class="login-btn">
          <el-button class="buttonStyle" type="primary" @click="handleLogin">登录</el-button>
        </div>
      </el-form>
    </div>
    <!-- <div slot="header" class="box-card-header">
      <img src="@/assets/img/haolinmengLogo.png">
    </div> -->
  </div>
</template>
<script>
// import { validUsername } from '@/utils/validate'
import { mapMutations } from 'vuex'
import axios from 'axios';
// import { login } from '@/api/login/loginInfo'
// import qs from 'qs'
// import CryptoJS from 'crypto-js/crypto-js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入账号!'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6个字符!'))
      } else {
        callback()
      }
    }
    // const validateCode = (rule, value, callback) => {
    //   if (value.length < 1) {
    //     callback(new Error('请输入验证码!'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        account: '',
        password: ''
        // code: ''
      },
      user: {
        name: '',
        account: '',
        id: undefined
      },
      menus: [],

      userToken: '',
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        // code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      let params = new URLSearchParams()
      this.loading = true
      this.user.name = '田媛'
      this.user.account = 'Tammy1'
      this.user.roles = 'superAdmin'
      alert(this.loginForm.account);
      alert(this.loginForm.password);
      params.append('username',this.loginForm.account)
      params.append('password',this.loginForm.password)
      axios({
        method: 'post',
        url: 'http://localhost:8080/person/login',
        data: params,
        async: true
      }).then((res) => {
        alert("到then中了");
        const routeData = this.$router.push({
        path: '/dashboard'
      })
      }
      )
      
//       this.$axios.post(
// 'http://localhost:8080/person/login',this.loginForm.account,this.loginForm.password)
       
      // login(qs.stringify(this.loginForm)).then(res => {
      //   this.userToken = res.Token
      //   this.user = res.user

      //   this.menus = res.menus

      //   // 将用户token保存到vuex中
      //   sessionStorage.setItem('Authorization', this.userToken)
      //   // this.changeLogin({ Authorization: this.userToken })
      //   sessionStorage.setItem('menus', JSON.stringify(this.menus))
      //   // console.log('menus--->' + this.menus)
      //   sessionStorage.setItem('user', JSON.stringify(this.user))
      //   // console.log('user--->' + this.user)

      //   this.$message.success('登录成功！')

      //   this.loading = false
      //   this.$router.push({ path: this.redirect || '/' })
      // })
    },
    goToHomePage() {
      const routeData = this.$router.resolve({
        path: '/dashboard'
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */

  .box-card-header {
    // position: relative;

    position: absolute;
    left:70%;
    top:60%;
    margin:-230px 0 0 -220px;

    height: 100px;
    width: 120px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
</style>

<style scoped>
    .image{
      width:100%;
      height:100%;
    }
    .logo1{
				float: left;
        margin-left: 10%;
				width: 60;
				height: 60px;
				/* border: 1px solid red; */
        margin-top:10px;
			}

      .logo{
				float: left;
				width: 33%;
				height: 60px;
				line-height: 60px;
			}
    .login-wrap{
        position: absolute;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login.png);

        background-size: 100%;
    }
    /* .buttonStyle{
      color: #00479d;
    } */

    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        color: #2d3a4b;
        border-bottom: 1px solid #ddd;
        font-size: 26px;
        padding:20px;
         /* margin-bottom:20px; */
        /* font-family: '仿宋'; */
        /* margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold; */
    }
    .ms-login{
        position: absolute;
        left:70%;
        top:60%;
        width:312px;
        margin:-190px 0 0 -175px;
        border-radius: 10px;
        background-color: #fff;
        /* background: rgba(187, 179, 179, 0.3); */
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
      /* body{
    min-width: 1366px;
    max-width: 1920px;
    position: relative;
  } */
</style>
