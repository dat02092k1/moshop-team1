import axios from "axios";
import { defineStore } from "pinia";
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
import router from "../router/index.js";

export const useLoginStore = defineStore({
  id: "auth",
  state: () => ({
    user: [],
    check: false,
  }),
  actions: {
    async getLogin(username, password) {
      await axios
        .post("https://x.ghtk.vn/api/fulfilment/auth/login", {
          username,
          password,
        })
        .then((res) => {
          this.user = res.data.data;
          console.log(res);
          // console.log(this.user.shop.token);
          // if (res.status === 200) {
          //   console.log('save token');
          //   localStorage.setItem("acessToken", res.data.data.access_token);
          //   localStorage.setItem("userId", this.user.shop.id);
          //   router.push("/staff/home");
          //   localStorage.removeItem("user");
          // }
          if (res.data.success === false) {
            console.log("error");
            this.check = true;
          } else {
            console.log("save token");
            localStorage.setItem("acessToken", res.data.data.access_token);
            localStorage.setItem("userId", this.user.shop.id);
            router.push("/staff/home");
          }
          //   router.push("/staff/home");
        });
    },
  },
});

export const useWeekTable = defineStore({
  id: "table-week",
  state: () => ({
    weekShow: false,
  }),
  actions: {
    getWeek() {
      this.weekShow = true;
    },
  },
});