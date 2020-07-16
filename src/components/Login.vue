<template>
  <div>
    <el-page-header @back="goBack" content="医生登录">
    </el-page-header><br/><br/><br/>
    <br/><br/>
    <el-row type="flex" justify="center">
      <el-col span="">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input style="width: 240px" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" style="width: 240px" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登 录</el-button>
            <el-button @click="resetForm('loginForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/'
      })
    },
    login () {
      axios.post('/login', {
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.status === 200) {
          this.$store.commit('login', response.data)
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
