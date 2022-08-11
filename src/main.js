import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import "./index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";



const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(Antd);
app.mount("#app");
