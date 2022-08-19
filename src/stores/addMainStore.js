// import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAddMainStore = defineStore("useAddMainStore", () => {
  const addMainData = reactive([

  ]);

  return { addMainData};
});
