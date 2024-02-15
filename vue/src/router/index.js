import { createRouter, createWebHistory } from "vue-router";
import Tasks from "../views/Tasks.vue";
import UpdateDelete from "../views/UpdateDelete.vue";
import CreateTask from "../views/CreateTask.vue";
import Login from "../views/LoginRegister/Login.vue";
import Register from "../views/LoginRegister/Register.vue";
import store from "@/store";
import DefaultLayout from "../components/DefaultLayout.vue";
import Mytasks from "../views/MyTasks.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "tasks" },
    meta: { isAuthenticated: true },
    component: DefaultLayout,
    children: [
      { path: "/tasks", name: "tasks", component: Tasks },
      { path: "/tasks/:id", name: "deleteUpdateTask", component: UpdateDelete },
      { path: "/tasks/create", name: "createTask", component: CreateTask },
      { path: "/myTasks", name: "myTasks", component: Mytasks },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "auth",
    meta: { isGuest: true },
    children: [
      {
        path: "/register",
        name: "register",
        component: Register,
      },
      {
        path: "/login",
        name: "login",
        component: Login,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.user.token;

  if (to.meta.isAuthenticated && !isAuthenticated) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "tasks" });
  } else {
    next();
  }
});

export default router;
