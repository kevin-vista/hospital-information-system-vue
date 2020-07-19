<template>
  <div>
    <el-page-header @back="goBack" content="患者列表">
    </el-page-header>
    <el-row type="flex" justify="right">
      <el-button
        style="width: fit-content; position: absolute; right: 30px"
        type="danger"
        size="medium"
        @click="logout">
        注 销
      </el-button>
    </el-row>
    <br/><br/><br/>
    <el-row type="flex" justify="space-around">
      <el-col span="" >
        <h2>未诊</h2>
        <el-table
          :data="undiagnosed"
          border
          style="width: fit-content">
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="50">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="60">
          </el-table-column>
          <el-table-column
            prop="idNum"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="registrationId"
            label="挂号ID"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
              <el-button @click="choosePatient(scope.row)" type="text" size="base">看诊</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col span="">
        <h2>已诊</h2>
        <el-table
          :data="diagnosed"
          border
          style="width: fit-content">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="50">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="60">
          </el-table-column>
          <el-table-column
            prop="idNum"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="registrationId"
            label="挂号ID"
            width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Doctor',
  data () {
    return {
      undiagnosed: [],
      diagnosed: []
    }
  },
  created () {
    axios.post('/registration/getUndiagnosedToday', {}, {
      params: {
        doctorUsername: this.$store.state.user.username
      }
    }).then((response) => {
      if (response.status === 200) {
        this.undiagnosed = response.data
      }
    })
    axios.post('/registration/getDiagnosedToday', {}, {
      params: {
        doctorUsername: this.$store.state.user.username
      }
    }).then((response) => {
      if (response.status === 200) {
        this.diagnosed = response.data
      }
    })
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/home'
      })
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push({
        path: '/login'
      })
    },
    choosePatient (row) {
      this.$store.commit('setCandidate', {
        name: row.name,
        gender: row.gender,
        age: row.age,
        idNum: row.idNum,
        registrationId: row.registrationId
      })
      this.$router.push({
        path: '/diagnose'
      })
    }
  }
}
</script>
