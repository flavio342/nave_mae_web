import Vue from "vue";
import Router from "vue-router";

import login from "../components/login/index.vue";
import messages from "../components/messages/index.vue"
import home from "../components/home/index.vue"
import classes from "../components/classes/index.vue"
import notifications from "../components/notifications/index.vue"
import users from "../components/users/index.vue"
import events from "../components/events/index.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "messages",
      component: messages
    },
    {
      path: "/messages",
      name: "messages",
      component: messages
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/classes",
      name: "classes",
      component: classes
    },
    {
      path: "/notifications",
      name: "notifications",
      component: notifications
    },
    {
      path: "/events",
      name: "events",
      component: events
    },
    {
      path: "/users",
      name: "users",
      component: users
    }
  ]
});
