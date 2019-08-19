import Vue from "vue";
import Router from "vue-router";

import _template from "./components/_template/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "_template",
      component: _template
    }
  ]
});
