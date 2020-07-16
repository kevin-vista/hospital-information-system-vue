<template>
  <div>
    <el-divider content-position="center">功 能 面 板</el-divider>
    <br/><br/><br/>
    <el-row style="width: fit-content; margin-left: auto; margin-right: auto;">
      <el-button type="primary" @click="goto('/register')">挂 号</el-button>
      <el-button type="primary" @click="goto('/login')">看 诊</el-button>
      <el-button type="primary" @click="goto('/pay')">收 费</el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    goto (url) {
      console.log('going to ' + url)
      this.$router.push({
        path: url
      })
    }
  }
}
</script>
