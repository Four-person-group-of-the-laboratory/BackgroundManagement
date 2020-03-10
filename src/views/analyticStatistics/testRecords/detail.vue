<template>
  <div>hahaha</div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      testdetil: []
    };
  },

  created() {
    this.initPage();
    alert(this.$route.query.TestPaperId);
  },
  methods: {
    initPage() {
      axios({
        method: "get",
        url: "http://localhost:8080/testpaper/testdetail/",
        params: {
          TestPaperId: this.$route.query.TestPaperId,
        },
        async: true
      })
        .then(resp => {
          window.console.log(JSON.stringify(resp));
          this.testdetil = resp.data;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });
    }
  }
};
</script>