<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    created () {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
