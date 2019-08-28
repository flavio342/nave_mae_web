import Vue from "vue";
import Router from "vue-router";

import customers from "../components/customers/index.vue";
import login from "../components/login/index.vue";
import lines from "../components/lines/index.vue";
import products from "../components/products/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/users",
      name: "users",
      component: customers
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/lines",
      name: "lines",
      component: lines
    },
    {
      path: "/products",
      name: "products",
      component: products
    }
  ]
});
