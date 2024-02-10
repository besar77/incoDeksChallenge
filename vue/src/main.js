import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { KanbanPlugin } from "@syncfusion/ej2-vue-kanban";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cWWhKYVJ3WmFZfVpgfV9HZ1ZUQ2YuP1ZhSXxXdkdiWX5ecnNWT2JUUkQ="
);

const app = createApp(App);

app.use(router);
app.use(KanbanPlugin);
app.use(store);

app.mount("#app");
