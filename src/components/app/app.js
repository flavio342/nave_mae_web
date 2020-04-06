import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import "./app.scss";

export default {
  name: "app",
  components: {
    SidebarMenu
  },
  mounted() {
    let token = this.$session.get("token");
    if (token) {
      this.axios.defaults.headers.common["Authorization"] = token;
      this.get_info()
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    get_info(){
      this.axios.get(process.env.VUE_APP_API_URL + "manager").then(res => {
        console.log(res.data)
        this.data = res.data
      },(error)=>{
        if (error.response.status == 401) {
          this.log_out();
        }
      });
    },
    route_to(page){
      this.$router.push(page);
    },
    onItemClick(event, item) {
      if (item.ref == "log_out") {
        this.log_out();
      }
    }
  },
  data() {
    return {
      data: null
    };
  }
};
