import { defineStore } from "pinia";

export const useTimeStore = defineStore({
  id: "time",
  state: () => ({
    time: [],
  }),
  getters: {
    listTime: (state) => state.time,
  },
  actions: {
    addTime() {
      this.counter++;
    },
  },
});
