import { defineStore } from "pinia";
import { reactive } from "vue";
export const useAddMainStore = defineStore("useAddMainStore", () => {
  const dataAddMain = reactive({
    birthday: String,
    fullname: String,
    tel: String,
    password: String,
    live_address: String,
    avatar: null,
    work_first_date: String,
    work_address: null,
    work_time_repeats: [
      {
        start_time: null,
        end_time: null,
        repeats: [],
      },
    ],
    screens: [],
    pages: [],
    cmnd_images: [],
    syll_images: [],
    hdld_images: [],
    deleted_image_ids: [],
  });

  function hello() {
    console.log("hello store");
  }

  return { dataAddMain, hello };
});
