import Vue from "vue";
import Router from "vue-router";

import customers from "../components/customers/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/users",
      name: "users",
      component: customers
    }
  ]
});
