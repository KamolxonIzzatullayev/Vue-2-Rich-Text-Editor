import Vue from "vue";
import VueRouter from "vue-router";
import PageList from "../components/PageList.vue";
import PageView from "../components/PageView.vue";
import PageForm from "../components/PageForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PageList",
    component: PageList,
  },
  {
    path: "/pages/:id",
    name: "PageView",
    component: PageView,
    props: true,
  },
  {
    path: "/edit/:id",
    name: "EditPage",
    component: PageForm,
    props: true,
  },
  {
    path: "/create",
    name: "CreatePage",
    component: PageForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
