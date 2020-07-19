<template>
  <div>
    <el-page-header @back="goBack" content="正在看诊">
    </el-page-header><br/><br/><br/>
    <el-row type="flex" justify="space-around">
      <el-col span="">
        <el-form :model="infoForm" :rules="infoFormRules" ref="infoForm" label-width="160px">
          <el-form-item label="挂号ID" prop="registrationId">
            <el-input style="width: 240px" v-model="infoForm.registrationId" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input style="width: 240px" v-model="infoForm.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input style="width: 240px" v-model="infoForm.gender" readonly></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input style="width: 240px" v-model="infoForm.age" readonly></el-input>
          </el-form-item>
          <el-form-item label="医嘱" prop="advice">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              style="width: 240px"
              v-model="infoForm.advice"
              ref="infoForm.advice">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 240px"
              type="primary"
              @click="submit">
              诊毕 & 开药
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col span="">
        <el-table
          :data="drugData"
          style="width: fit-content"
          max-height="520px"
          border
          show-summary
          v-loading="loading"
          element-loading-text="光速加载中..."
          :summary-method="getSummaries">
          <el-table-column
            prop="drugName"
            label="药品名称"
            width="180px"
            sortable>
          </el-table-column>
          <el-table-column
            prop="spec"
            label="规格"
            width="150px">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价 / 元"
            width="110px"
            sortable>
            <template slot-scope="scope">
              {{scope.row.price.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            width="130px">
            <template slot-scope="scope">
              <el-input-number
                ref="inputNumber"
                size="mini"
                v-model="scope.row.quantity"
                :min="0"
                :max="500"
                :step="1"
                style="width: 100px">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="subtotal"
            label="小计"
            width="80px"
            sortable>
            <template slot-scope="scope">
              {{ (scope.row.price * scope.row.quantity).toFixed(2) }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Diagnose',
  data () {
    return {
      loading: true,
      infoForm: {
        registrationId: '',
        name: '',
        gender: '',
        age: '',
        advice: ''
      },
      drugData: [],
      infoFormRules: {
        advice: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    total: function () {
      return this.drugData.map(
        row => row.price * row.quantity).reduce(
        (acc, cur) => (cur + acc), 0)
    }
  },
  mounted () {
    axios.post('/diagnosis/init')
      .then((response) => {
        if (response.status === 200) {
          this.drugData = response.data
          this.loading = false
        } else {
          this.$message({
            message: 'Network Error: ' + response.status,
            type: 'error',
            showClose: true,
            duration: 5000
          })
        }
      })
    if (this.$store.state.candidate !== null) {
      const r = this.$store.state.candidate
      this.infoForm.registrationId = r.registrationId
      this.infoForm.name = r.name
      this.infoForm.gender = r.gender
      this.infoForm.age = r.age
      this.infoForm.idNum = r.idNum
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/doctor'
      })
    },
    getSummaries () {
      return ['总计', '', '', '', this.total.toFixed(2)]
    },
    submit () {
      this.$refs.infoForm.validate((valid) => {
        if (!valid) {
          this.$message({
            message: '请正确填写内容',
            type: 'error',
            showClose: true,
            duration: 5000
          })
          return
        }
        this.$confirm('请确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/diagnosis/add', {
            registrationId: this.infoForm.registrationId,
            advice: this.infoForm.advice,
            drugData: this.drugData.filter(data => data.quantity > 0)
          }).then((response) => {
            if (response.status === 200) {
              this.$message({
                message: '诊断完成',
                type: 'success',
                showClose: true,
                duration: 5000
              })
              this.$router.push({
                path: '/doctor'
              })
            } else {
              this.$message({
                message: 'Network Error: ' + response.status,
                type: 'error',
                showClose: true,
                duration: 5000
              })
            }
          })
        })
      })
    }
  }
}
</script>
