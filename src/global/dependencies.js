import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faArrowsAltH,
  faShoppingCart,
  faSignInAlt,
  faUsers,
  faTachometerAlt,
  faTimesCircle,
  faFilter,
  faListOl,
  faTrashAlt,
  faPlus,
  faSearch,
  faCheckCircle,
  faSignOutAlt,
  faStoreAlt,
  faTag,
  faTshirt,
  faAngleRight,
  faUserGraduate,
  faChalkboardTeacher,
  faStamp,
  faHandHoldingUsd,
  faSchool,
  faChalkboard,
  faBook,
  faStar,
  faCheck,
  faCalendarWeek,
  faHome,
  faFileAlt,
  faBell,
  faComments,
  faUserFriends,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faChevronRight,
  faChevronLeft,
  faArrowsAltH,
  faShoppingCart,
  faSignInAlt,
  faUsers,
  faTachometerAlt,
  faTimesCircle,
  faFilter,
  faListOl,
  faTrashAlt,
  faPlus,
  faSearch,
  faCheckCircle,
  faSignOutAlt,
  faStoreAlt,
  faTag,
  faTshirt,
  faAngleRight,
  faUserGraduate,
  faChalkboardTeacher,
  faStamp,
  faHandHoldingUsd,
  faSchool,
  faChalkboard,
  faBook,
  faStar,
  faCheck,
  faCalendarWeek,
  faHome,
  faFileAlt,
  faBell,
  faComments,
  faUserFriends,
  faPaperPlane
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import VueSession from "vue-session";
Vue.use(VueSession, { persist: true });

import VueTheMask from "vue-the-mask";
Vue.use(VueTheMask);