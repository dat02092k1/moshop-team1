// import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
export const useAddMainStore = defineStore("useAddMainStore", () => {
  const dataAddMain = reactive({
    birthday: null,
    fullname: null,
    tel: null,
    password: null,
    live_address: null,
    avatar: null,
    work_first_date: null,
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
    preview_img_cmnd: [],
    preview_img_syll: [],
    preview_img_hdld: [],
    current_id_user: null,
    confirmOtp:null
  });

  // });
  function hello() {
    console.log("hello");
  }
  return { dataAddMain, hello };
});
