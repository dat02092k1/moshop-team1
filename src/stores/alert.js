import axios from "axios";
import { defineStore } from "pinia";
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
import router from "../router/index.js";

export const useLoginStore = defineStore({
    id: "au",
    state: () => ({
        user: [],
        check: false,
    }),
};