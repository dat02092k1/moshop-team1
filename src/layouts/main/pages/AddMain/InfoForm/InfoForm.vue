<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    class="grid md:grid-cols-4 gap-x-5 flex"
  >
    <div class="col-span-2">
      <a-form-item ref="name" label="Tên nhân viên" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item ref="phone" label="SĐT" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item ref="birthday" label="Ngày sinh" name="birthday">
        <a-date-picker
          v-model:value="formState.birthday"
          placeholder="Chọn ngày"
        />
      </a-form-item>
    </div>
    <div class="col-span-2">
      <a-form-item ref="password" label="Mật khẩu" name="password">
        <a-input-password
          v-model:value="formState.password"
          placeholder="Mật khẩu phải có ít nhất 6 kí tự"
        />
      </a-form-item>
      <a-form-item ref="address" label="Địa chỉ" name="address">
        <a-input v-model:value="formState.address" allow-clear />
      </a-form-item>
    </div>
  </a-form>
</template>
<script setup>
import { onBeforeUpdate, ref, toRaw } from "vue";
import axios from "axios";
import TOKEN from "../../../../../service/AllApi.js";
const formRef = ref();
const formState = ref({
  name: "",
  phone: "",
  birthday: "",
  password: "",
  address: "",
});
const rules = {
  name: [
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
  phone: [
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
  birthday: [
    {
      required: true,
      message: "Không được để trống ngày sinh",
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
  address: [
    {
      required: true,

      message: "Không được để trống địa chỉ !",
      trigger: "blur",
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(formState.value);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const resetForm = () => {
  formRef.value.resetFields();
};
const API_ADD_USER = "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code";
onBeforeUpdate(async () => {
  try {
    const res = await axios.post(API_ADD_USER, {
      headers: {
        Authorization: "Bearer " + TOKEN.TOKEN,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
});
defineExpose(formRef, formState, rules, onSubmit, resetForm);
</script>
<style scoped>
:deep(.ant-form-item-required):before {
  display: none !important;
}
:deep(.ant-form-item-required):after {
  content: "*";
  color: red;
}
:deep(.ant-form-item-label > label) {
  width: 200px !important;
}
:deep(.ant-picker) {
  width: 100%;
}
</style>
