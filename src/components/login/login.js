export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      progress: {
        login: false
      },
      login: {
        email: "",
        password: ""
      },
      errors: {
        login: null
      }
    };
  },
  computed: {},
  mounted: function() {},
  methods: {
    do_login() {
      this.progress.login = true;
      this.axios.post(process.env.VUE_APP_API_URL + "manager_login", this.login).then(res => {
        setTimeout(() => {
          if (res.data.success) {
            this.$session.set("token", res.data.token);
            this.$router.push("/");
            location.reload();
          } else {
            this.errors.login = res.data.errors;
          }
          this.progress.login = false;
        }, 1000);
      });
    }
  }
};
