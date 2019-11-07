<template>
  <div class="app-container">
    <div v-if="user">
      <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
          <span>个人资料</span>
        </div>
        <div class="user-profile">
          <div class="box-center">
            <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
              <div>你好</div>
              {{ user.name }}
            </pan-thumb>
          </div>
          <div class="box-center">
            <div class="user-name text-center">{{ user.account }}</div>
            <div class="user-role text-center text-muted">{{ user.name | uppercaseFirst }}</div>
          </div>
        </div>
        <el-form ref="user" :rules="rules" :model="user" class="formStyle" label-position="right" label-width="120px">
          <!-- <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="user.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="用户名：" prop="account">
            <el-input v-model.trim="user.account" placeholder="请输入用户名" />
          </el-form-item> -->
          <el-form-item label="新密码：" prop="password">
            <el-input v-model="user.password" type="password" placeholder="请输入新密码" />
          </el-form-item>
          <el-form-item label="确认密码：" prop="repassword">
            <el-input v-model="user.repassword" type="password" placeholder="请再次输入密码" />
          </el-form-item>
          <el-form-item>
            <!-- <el-button style="margin-right:20px;" @click="reset()">取 消</el-button> -->
            <el-button class="buttonClass" type="primary" @click="submit">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
// import { updateSystemUserPassword } from '@/api/system/systemUsers'

// import UserCard from './components/UserCard'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
// import Account from './components/Account'

export default {
  name: 'Profile',
  components: { PanThumb },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user2: undefined,
      user: {
        name: '',
        account: '',
        role: '',
        password: '',
        repassword: '',
        avatar: '@/assets/img/MyIcon.jpg',
        menus: [],
        id: undefined
        // avatar: 'http://i2.tiimg.com/695693/e6c4d6a62ea9bb76.jpg'
      },
      updateParams: {
        id: undefined,
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{6,16}$/, message: '密码为数字或字母，长度为6-16位' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  // beforeMount() {
  //   var userTest = sessionStorage.getItem('user')
  //   this.user2 = JSON.parse(userTest)
  //   // console.log('user2---->' + this.user2)
  // },
  methods: {
    getUser() {
      var userTest = sessionStorage.getItem('user')
      this.user2 = JSON.parse(userTest)
      var menus = sessionStorage.getItem('menus')
      this.user.menus = JSON.parse(menus)

      this.user = {
        // name: this.name,
        // role: this.roles.join(' | '),
        // email: 'admin@test.com',
        // avatar: this.avatar
        name: this.user2.name,
        account: this.user2.account,
        password: '',
        repassword: '',
        avatar: 'http://i2.tiimg.com/695693/e6c4d6a62ea9bb76.jpg',
        id: this.user2.id
        // menus: sessionStorage.getItem('menus')
      }
      // this.user.name = this.user2.name
      // console.log('user2.name---->' + this.user2.name)
    },
    submit() {
      this.updateParams.id = this.user.id
      this.updateParams.password = this.user.repassword
      // updateSystemUserPassword(this.updateParams).then(response => {
      //   if (response.code === 200) {
      //     this.$message({
      //       message: '个人信息已更新',
      //       type: 'success',
      //       duration: 2 * 1000
      //     })
      //   } else {
      //     this.$message({
      //       message: '个人信息更新失败',
      //       type: 'success',
      //       duration: 1 * 1000
      //     })
      //   }
      //   this.updateParams.id = undefined
      //   this.updateParams.password = ''
      //   sessionStorage.removeItem('Authorization')
      //   this.$router.push({ path: '/login' })
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.buttonClass{
  float: right;
}
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 15px;
     padding-bottom: 15px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }

  .formStyle{
    /* width: 40%; */
    margin-left: 30%;
    margin-right: 30%;
  }
</style>
