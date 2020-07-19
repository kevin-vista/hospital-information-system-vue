<template>
  <div>
    <el-page-header @back="goBack" content="收费页面">
    </el-page-header><br/><br/>
    <el-row style="width: fit-content; margin-left: auto; margin-right: auto;" >
      <el-col>
        <el-form :model="idForm" :rules="idFormRules" ref="idForm" label-width="160px">
          <el-form-item label="挂号ID" prop="registrationId" autofocus>
            <el-input style="width: fit-content" v-model="idForm.registrationId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="query">查 询</el-button>
          </el-form-item>
        </el-form>
        <br/>
        <el-table
          id="drugTable"
          :data="drugData"
          style="width: fit-content"
          max-height="480"
          border
          show-summary
          :summary-method="getSummaries">
          <el-table-column
            prop="drugName"
            label="药品名称"
            width="180"
            sortable>
          </el-table-column>
          <el-table-column
            prop="spec"
            label="规格"
            width="150">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价 / 元"
            width="110"
            sortable>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            width="130px">
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
        <br/>
        <el-button
          style="width: 100%; height: 42px; font-size: 16px; margin-left: auto; margin-right: auto;"
          type="primary"
          @click="pay">缴 费</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pay',
  data () {
    return {
      idForm: {
        registrationId: ''
      },
      idFormRules: {
        registrationId: [
          { required: true, message: '请输入挂号ID', trigger: 'blur' }
        ]
      },
      drugData: []
    }
  },
  computed: {
    total: function () {
      return this.drugData.map(
        row => row.price * row.quantity).reduce(
        (acc, cur) => (cur + acc), 0).toFixed(2)
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/home'
      })
    },
    query () {
      if (isNaN(parseInt(this.idForm.registrationId))) {
        this.$message({
          message: '请输入有效的挂号ID',
          type: 'error',
          duration: 2000,
          showClose: true
        })
        this.drugData = []
        return
      }
      axios.post('/pay/getDrugData', {}, {
        params: {
          registrationId: parseInt(this.idForm.registrationId)
        }
      }).then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            this.$message({
              message: '请输入有效的挂号ID',
              type: 'error',
              duration: 2000,
              showClose: true
            })
            this.drugData = []
            return
          }
          this.drugData = response.data
        } else {
          this.$message({
            message: 'Network Error: ' + response.status,
            type: 'error',
            showClose: true
          })
        }
      })
    },
    resetForm () {
      this.$refs.idForm.resetFields()
    },
    getSummaries () {
      return ['总计', '', '', '', this.total]
    },
    pay () {
      this.$confirm('应收 ￥' + this.total + ' (元)', '请确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/pay/finish', {}, {
          params: {
            registrationId: this.idForm.registrationId
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$message({
              message: '缴费成功',
              type: 'success',
              duration: 5000,
              showClose: true
            })
            this.resetForm()
            this.drugData = []
          } else {
            this.$message({
              message: 'Network Error: ' + response.status,
              type: 'error',
              showClose: true
            })
          }
        })
      })
    }
  }
}
</script>
