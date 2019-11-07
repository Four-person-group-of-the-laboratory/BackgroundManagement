<template>
  <div v-if="isRouterAlive" id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isReloadAlive = false
      this.$nextTick(function() {
        this.isReloadAlive = true
      })
    }

  }
}
</script>
<style scoped>
  #app{
    min-width: 1366px;
    max-width: 1920px;
    position: relative;
  }
</style>
