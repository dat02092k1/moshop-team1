// import { createApp } from "vue";
// import { createPinia } from "pinia";
// import axios from 'axios'
// import VueAxios from 'vue-axios';
// import App from "./App.vue";
// import router from "./router";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
// import "./index.css";
//
// const app = createApp(App);
//
// app.use(createPinia());
// app.use(router);
// app.use(Antd);
// app.use(VueAxios, axios);
//
// app.mount("#app");
import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(Antd);
// app.use(axios);

app.mount("#app");
