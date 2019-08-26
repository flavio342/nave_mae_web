import Vue from "vue";
import App from "./components/app/index.vue";

import "./global/dependencies";
import "./global/filters";
import "./global/mixin";
import "./global/global_components";
import router from "./global/router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
