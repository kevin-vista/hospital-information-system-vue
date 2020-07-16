<template>
  <div>
    <el-page-header @back="goBack" content="收费页面">
    </el-page-header><br/>
    <el-row style="width: fit-content; margin-left: auto; margin-right: auto;" >
      <el-col>
        <el-form :model="idForm" :rules="idFormRules" ref="idForm" label-width="160px">
          <el-form-item label="挂号ID" prop="id" autofocus>
            <el-input style="width: fit-content" v-model="idForm.id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="query(idForm.id)">查 询</el-button>
            <el-button size="medium" @click="resetForm('idForm')">清 空</el-button>
          </el-form-item>
        </el-form>
        <br/>
        <el-dialog
          title="确认"
          :visible.sync="dialogVisible"
          width="30%">
          <span>缴费金额为：{{total.toFixed(2)}} (元)</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="pay">确 定</el-button>
          </span>
        </el-dialog>
        <el-table
          id="drugTable"
          :data="drugData"
          style="width: fit-content"
          max-height="480"
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
        <br/>
        <el-button
          style="width: 100%; height: 42px; font-size: 16px; margin-left: auto; margin-right: auto;"
          type="primary"
          @click="dialogVisible = true">缴 费</el-button>
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
        id: ''
      },
      idFormRules: {
        id: [
          { required: true, message: '请输入挂号ID', trigger: 'blur' }
        ]
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
      dialogVisible: false
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
    goBack () {
      this.$router.push({
        path: '/home'
      })
    },
    query (id) {
      if (isNaN(parseInt(id))) {
        alert('格式输入错误')
        return
      }
      axios.post('/getDrugData', {
        id: parseInt(this.infoForm.id)
      }).then((response) => {
        if (response.status === 200) {
          this.drugData = response.data
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getSummaries () {
      // let elements = document.getElementsByClassName('subtotalTemplate')
      console.log(document.getElementsByClassName('subtotalTemplate'))
      return ['总计', '', '', '', this.total.toFixed(2)]
    },
    pay () {
      axios.post('/pay', {
        id: this.infoForm.id
      }).then((response) => {
        if (response.status === 200) {
          alert('缴费成功')
        }
      })
    }
  }
}
</script>
