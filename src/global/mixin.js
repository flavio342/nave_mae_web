import Vue from "vue";

Vue.mixin({
  methods: {
    get_token() {
      let token = this.$session.get("token");
      this.axios.defaults.headers.common["Authorization"] = token;
    },
    log_out() {
      this.$session.set("token", null);
      this.axios.defaults.headers.common["Authorization"] = null;
      location.reload();
    }
  }
});
