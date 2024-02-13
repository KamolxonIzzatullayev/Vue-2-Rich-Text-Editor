import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { createHead } from "@unhead/vue";
import { UnheadPlugin } from "@unhead/vue/vue2";

Vue.config.productionTip = false;

const head = createHead();
Vue.use(UnheadPlugin);

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);

new Vue({
  unhead: head,
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
