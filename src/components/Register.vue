<template>
  <div>
    <el-page-header @back="goBack" content="挂号页面">
    </el-page-header><br/><br/><br/>
    <el-row style="width: fit-content; margin-left: auto; margin-right: auto;">
      <el-col>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">
          <el-form-item label="姓名" prop="name">
            <el-input style="width: 240px" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select style="width: 240px" v-model="registerForm.gender" placeholder="请选择">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-form-item prop="birthDate">
              <el-date-picker style="width: 240px" type="date" placeholder="选择日期" v-model="registerForm.birthDate"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input style="width: 240px" v-model="registerForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input style="width: 240px" v-model="registerForm.address"></el-input>
          </el-form-item>
          <el-form-item label="科室" prop="department">
            <el-select style="width: 240px" v-model="registerForm.department" placeholder="请选择">
              <el-option label="科室1" value="male"></el-option>
              <el-option label="科室2" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="挂号类别" prop="level">
            <el-radio-group style="width: 240px" v-model="registerForm.level">
              <el-radio label="普通号"></el-radio>
              <el-radio label="专家号"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医生" prop="doctor">
            <el-select style="width: 240px" v-model="registerForm.doctor" placeholder="请选择">
              <el-option label="扁鹊" value="male"></el-option>
              <el-option label="华佗" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register()">挂 号</el-button>
            <el-button @click="resetForm('registerForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        name: '',
        gender: '',
        birthDate: '',
        tel: '',
        address: '',
        department: '',
        level: '普通号',
        doctor: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthDate: [
          { type: 'date', required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择挂号类别', trigger: 'blur' }
        ],
        doctor: [
          { required: true, message: '请选择医生', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/home'
      })
    },
    register () {
      axios.post('/register', {
        name: this.name,
        gender: this.gender,
        birthDate: this.birthDate,
        tel: this.tel,
        address: this.address,
        department: this.department,
        level: this.level,
        doctor: this.doctor
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
