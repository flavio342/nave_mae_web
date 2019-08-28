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
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    onItemClick(event, item) {
      if (item.ref == "log_out") {
        this.log_out();
      }
    }
  },
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
        },
        {
          href: "",
          title: "Loja",
          ref: "store",
          icon: {
            element: "font-awesome-icon",
            class: "side-bar-icon",
            attributes: {
              icon: "store-alt"
            }
          },
          child: [
            {
              href: "/lines",
              title: "Linhas",
              ref: "line",
              icon: {
                element: "font-awesome-icon",
                class: "side-bar-sub-icon",
                attributes: {
                  icon: "tag"
                }
              }
            },
            {
              href: "/products",
              title: "Produtos",
              ref: "product",
              icon: {
                element: "font-awesome-icon",
                class: "side-bar-sub-icon",
                attributes: {
                  icon: "tshirt"
                }
              }
            }
          ]
        },
        {
          href: "",
          title: "Sair",
          ref: "log_out",
          icon: {
            element: "font-awesome-icon",
            class: "side-bar-icon",
            attributes: {
              icon: "sign-out-alt"
            }
          }
        }
      ]
    };
  }
};
