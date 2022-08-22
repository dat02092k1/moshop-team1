<template>
  <a-form
    ref="refForm"
    :model="useStore.dataAddMain"
    :rules="rules"
    class="grid md:grid-cols-4 gap-x-5 flex"
  >
    <div class="col-span-2">
      <a-form-item ref="name" label="Tên nhân viên" name="fullname">
        <a-input v-model:value="useStore.dataAddMain.fullname" />
      </a-form-item>
      <a-form-item ref="phone" label="SĐT" name="tel">
        <a-input v-model:value="useStore.dataAddMain.tel" />
      </a-form-item>
      <a-form-item ref="birthday" label="Ngày sinh" name="birthday">
        <a-date-picker
          v-model:value="useStore.dataAddMain.birthday"
          value-format="YYYY:MM:DD"
          placeholder="Chọn ngày"
        />
      </a-form-item>
    </div>
    <div class="col-span-2">
      <ChangeStatusStaff v-if="isRouter" />
      <a-form-item ref="password" label="Mật khẩu" name="password">
        <a-input-password
          v-model:value="useStore.dataAddMain.password"
          placeholder="Mật khẩu phải có ít nhất 6 kí tự"
        />
      </a-form-item>
      <a-form-item ref="live_address" label="Địa chỉ" name="address">
        <a-input
          v-model:value="useStore.dataAddMain.live_address"
          allow-clear
        />
      </a-form-item>
    </div>
  </a-form>
</template>
<script setup>
import { computed, onBeforeUpdate, ref, toRaw } from "vue";
import axios from "axios";
import TOKEN from "../../../../../service/AllApi.js";
import ChangeStatusStaff from "../ChangeStatusStaff.vue";
import { useRouter } from "vue-router";
import { useAddMainStore } from "../../../../../stores/addMainStore";
const useStore = useAddMainStore();
const getCurrentRouter = useRouter().currentRoute.value.name;
// console.log(getCurrentRouter);
const isRouter = computed(() => {
  return getCurrentRouter === "staff.update";
});
const rules = {
  fullname: [
    {
      required: true,
      message: "Không được để trống tên nhân viên!",
      trigger: "blur",
    },
    {
      min: 5,
      max: 20,
      message: "Tên tối thiểu 5 kí tự !",
      trigger: "blur",
    },
  ],
  tel: [
    {
      required: true,
      message: "Không được để trống SĐT!",
      trigger: "blur",
    },
    {
      min: 10,
      max: 10,
      message: "Số điện thoại chỉ được 10 kí tự!",
      trigger: "blur",
    },
    {
      pattern: /^\d*$/,
      message: "Tất cả phải là số!",
      trigger: "blur",
    },
    {
      pattern: /^[0]/,
      // pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      // pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      message: "Số điện thoại phải bắt đầu bằng 0",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Không được để trống mật khẩu!",
      trigger: "blur",
    },
    {
      min: 6,
      message: "Mật khẩu tối thiểu 6 kí tự !",
    },
  ],
};
const refForm = ref();
const callValidateOnSubmit = () => {
  refForm.value
    .validate()
    .then(() => {
      console.log(useStore.dataAddMain);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
// const resetForm = () => {
//   formRef.value.resetFields();
// };

// const API_ADD_USER = "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code";
// onBeforeUpdate(async () => {
//   try {
//     const res = await axios.get(API_ADD_USER, {
//       headers: {
//         Authorization: "Bearer " + TOKEN.TOKEN,
//       },
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// });
defineExpose({
  rules,
  callValidateOnSubmit,
});
</script>
<style scoped>
@import "../css/InfoForm.css";
</style>
