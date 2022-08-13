<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    class="grid md:grid-cols-4 gap-x-5 flex"
  >
    <div class="col-span-2">
      <a-form-item ref="name" label="Tên nhân viên" name="name">
        <a-input :value="formState.name" />
      </a-form-item>
      <a-form-item ref="phone" label="SĐT" name="phone">
        <a-input :value="formState.phone" />
      </a-form-item>
      <a-form-item ref="formState.birthday" label="Ngày sinh" name="birthday">
        <!--      <a-datepicker v-model:value="formState.birthday" />-->
        <a-date-picker :value="formState.birthday" placeholder="Chọn ngày" />
      </a-form-item>
    </div>
    <div class="col-span-2">
      <InfoFormRight />
    </div>
  </a-form>
  <!--  <button @click="resetForm" style="background-color: #069255; color: white">Reset</button>-->
</template>
<script setup>
import { ref, toRaw } from "vue";
import InfoFormRight from "./InfoFormRight.vue";
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
      console.log("values", formState, toRaw(formState));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const resetForm = () => {
  formRef.value.resetFields();
};

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
