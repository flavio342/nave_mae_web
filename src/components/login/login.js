export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
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
      this.axios.post("http://127.0.0.1:5000/login_admin", this.login).then(res => {
        if (res.data.success) {
          this.$session.set("token", res.data.token);
          location.reload();
        } else {
          this.errors.login = res.data.errors;
        }
      });
    }
  }
};
