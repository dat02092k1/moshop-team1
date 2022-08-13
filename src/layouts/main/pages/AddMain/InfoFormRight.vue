<template>
  <a-form-item ref="password" label="Mật khẩu" name="password">
    <a-input-password
        v-model:value="formState.password"
        placeholder="Mật khẩu phải có ít nhất 6 kí tự"
    />
  </a-form-item>
  <a-form-item ref="address" label="Địa chỉ" name="address">
    <a-input v-model:value="formState.address" allow-clear />
  </a-form-item>
</template>
<script setup>
import { ref, toRaw } from "vue";
const formRef = ref();

const formState = ref({
  password: "",
  address: "",
});

const rules = {
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

defineExpose(formRef, formState, rules);
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
