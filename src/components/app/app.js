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
      this.$router.push("/users");
    } else {
      this.$router.push("/login");
    }
  },
  methods: {},
  data() {
    return {
      menu: [
        /*{
          href: "/dashboard",
          title: "Dashboard",
          icon: {
            element: "font-awesome-icon",
            class: "side-bar-icon",
            attributes: {
              icon: "tachometer-alt"
            }
          }
        },*/
        {
          href: "/users",
          title: "Usuários",
          icon: {
            element: "font-awesome-icon",
            class: "side-bar-icon",
            attributes: {
              icon: "users"
            }
          }
        }
      ]
    };
  }
};
