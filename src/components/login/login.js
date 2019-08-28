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
        username: "",
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
      this.axios.post("http://127.0.0.1:5000/login_admin", this.login).then(res => {
        setTimeout(() => {
          if (res.data.success) {
            this.$session.set("token", res.data.token);
            this.$router.push("/users");
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
