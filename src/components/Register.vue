<template>
  <div>
    <el-page-header @back="goBack" content="挂号页面">
    </el-page-header>
    <el-row style="width: fit-content; margin-left: auto; margin-right: auto;">
      <el-col>
        <br/><br/>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input style="width: 240px" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select style="width: 240px" v-model="registerForm.gender" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              format="yyyy年MM月dd日"
              value-format="yyyyMMdd"
              style="width: 240px"
              type="date"
              placeholder="请选择"
              v-model="registerForm.birthDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNum">
            <el-input style="width: 240px" v-model="registerForm.idNum"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input style="width: 240px" v-model="registerForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input style="width: 240px" v-model="registerForm.address"></el-input>
          </el-form-item>
          <el-form-item label="科室" prop="department">
            <el-select
              style="width: 240px"
              @change="updateDoctors"
              v-model="registerForm.department"
              placeholder="请选择">
              <el-option
                v-for="d in registerForm.departments"
                :key="d.id"
                :label="d.name"
                :value="d.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="挂号类别" prop="level">
            <el-radio-group @change="updateDoctors" style="width: 240px" v-model="registerForm.level">
              <el-radio :label=1>普通号</el-radio>
              <el-radio :label=2>专家号</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医生" prop="doctor">
            <el-select style="width: 240px" v-model="registerForm.doctor" placeholder="请选择">
              <el-option
                v-for="d in registerForm.doctors"
                :key="d.username"
                :label="d.fullName"
                :value="d.username">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">挂 号</el-button>
            <el-button @click="resetForm">重 置</el-button>
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
        idNum: '',
        tel: '',
        address: '',
        departments: [],
        department: '',
        level: 1,
        doctors: [],
        doctor: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthDate: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择挂号类别', trigger: 'change' }
        ],
        doctor: [
          { required: true, message: '请选择医生', trigger: 'change' }
        ]
      }
    }
  },
  beforeCreate () {
    axios.post('/registration/init')
      .then((response) => {
        if (response.status === 200) {
          this.registerForm.departments = response.data
        }
      })
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/home'
      })
    },
    updateDoctors () {
      axios.post('/registration/getDoctorsByDepartment', {}, {
        params: {
          id: this.registerForm.department,
          level: this.registerForm.level
        }
      }).then((response) => {
        if (response.status === 200) {
          this.registerForm.doctors = response.data
          this.registerForm.doctor = ''
        }
      })
    },
    register () {
      this.$refs.registerForm.validate((valid) => {
        if (!valid) {
          this.$message({
            message: '请完整填写',
            type: 'error',
            duration: 2000,
            showClose: true
          })
          return
        }
        axios.post('/registration/add', {}, {
          params: {
            name: this.registerForm.name,
            gender: this.registerForm.gender,
            birthDate: this.registerForm.birthDate,
            idNum: this.registerForm.idNum,
            tel: this.registerForm.tel,
            address: this.registerForm.address,
            department: this.registerForm.department,
            level: this.registerForm.level,
            doctor: this.registerForm.doctor
          }
        }).then((response) => {
          if (response.status === 200) {
            this.resetForm()
            this.$message({
              message: '挂号成功',
              type: 'success',
              duration: 5000,
              showClose: true
            })
          } else {
            this.$message({
              message: 'Network Error: ' + response.status,
              type: 'error',
              showClose: true
            })
          }
        })
      })
    },
    resetForm () {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>
