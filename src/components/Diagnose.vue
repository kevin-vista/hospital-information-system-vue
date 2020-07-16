<template>
  <div>
    <el-page-header @back="goBack" content="正在看诊">
    </el-page-header><br/><br/><br/>
    <el-row type="flex" justify="space-around">
      <el-col span="">
        <el-form :model="infoForm" ref="idForm" :rules="infoFormRules" label-width="160px">
          <el-form-item label="挂号ID" prop="id">
            <el-input style="width: 240px" v-model="infoForm.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input style="width: 240px" v-model="infoForm.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input style="width: 240px" v-model="infoForm.gender" readonly></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <el-input style="width: 240px" v-model="infoForm.birthDate" readonly></el-input>
          </el-form-item>
          <el-form-item label="医嘱" prop="advice">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              style="width: 240px"
              v-model="infoForm.advice">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="finish()">诊 毕</el-button>
            <el-button @click="resetForm('infoForm')">清 空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col span="">
        <el-table
          id="drugTable"
          :data="drugData"
          style="width: fit-content"
          max-height="960"
          stripe
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
            prop="specification"
            label="规格"
            width="150">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价 (元)"
            width="110"
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
                v-model="scope.row.num"
                @change="handleChange"
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
              {{ (scope.row.price * scope.row.num).toFixed(2) }}
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
      infoForm: {
        id: '',
        name: '',
        gender: '',
        birthDate: '',
        advice: ''
      },
      drugData: [{
        drugName: '五味子颗粒',
        specification: '1g/6g*1袋',
        price: 8.30,
        num: 2
      }, {
        drugName: '克拉霉素缓释片（诺邦）',
        specification: '0.500g*7片/盒',
        price: 48.60,
        num: 3
      }, {
        drugName: '决明子颗粒 ',
        specification: '0.5g/10g*1袋',
        price: 21.40,
        num: 7
      }, {
        drugName: '叶酸片',
        specification: '5mg×100片/瓶',
        price: 44.93,
        num: 5
      }],
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
        row => row.price * row.num).reduce(
        (acc, cur) => (cur + acc), 0)
    }
  },
  methods: {
    mounted () {
      if (this.$store.state.registration !== null) {
        const r = this.$store.state.registration
        this.infoForm.id = r.id
        this.infoForm.name = r.name
        this.infoForm.gender = r.gender
        this.infoForm.birthDate = r.birthDate
      }
    },
    goBack () {
      this.$router.push({
        path: '/doctor'
      })
    },
    getSummaries () {
      // let elements = document.getElementsByClassName('subtotalTemplate')
      console.log(document.getElementsByClassName('subtotalTemplate'))
      return ['总计', '', '', '', this.total.toFixed(2)]
    },
    finish () {
      this.infoForm.validate((valid) => {
        if (valid) {
          axios.post('/diagnose', {
            id: this.infoForm.id,
            advice: this.infoForm.advice,
            drugData: this.drugData
          }).then((response) => {
            if (response.status === 200) {
              alert('诊断信息已保存')
            }
          })
        } else {
          console.log('请完整填写内容')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
