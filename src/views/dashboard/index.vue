<template>
  <div class="dashboard-container">
    <!-- <el-button type="primary" @click="refresh" /> -->
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  inject: ['reload'],
  data() {
    return {
      currentRole: 'adminDashboard',
      isRouterAlive: false
    }
  },

  computed: {
    ...mapGetters([
      'roles'
    ])
  }
  // created() {
  //   window.location.replace()
  //   // this.reload()
  //   // if (!this.roles.includes('admin')) {
  //   //   this.currentRole = 'editorDashboard'
  //   // }
  // }
  // methods: {
  //   refresh() {
  //     this.reload()
  //   }
  // }
}
</script>
