import Vue from "vue";
import App from "./components/app/index.vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faArrowsAltH,
  faShoppingCart,
  faSignInAlt,
  faUsers,
  faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faChevronRight,
  faChevronLeft,
  faArrowsAltH,
  faShoppingCart,
  faSignInAlt,
  faUsers,
  faTachometerAlt
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import VueSession from "vue-session";
Vue.use(VueSession, { persist: true });

Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.filter("negative", function(value) {
  if (value[0] != "R" || value[1] != "$") {
    return value;
  }
  return "- " + value;
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
