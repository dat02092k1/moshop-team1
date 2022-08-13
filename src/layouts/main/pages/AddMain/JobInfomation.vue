<template>
  <a-form
    ref="formJobInfo"
    :model="formJobInfomationState"
    :rules="rulesJobInfo"
  >
    <a-form-item
      ref="formJobInfomationState.jobTimeStart"
      label="Ngày bắt đầu làm việc"
      name="jobTimeStart"
    >
      <!--      <a-datepicker v-model:value="formState.birthday" />-->
      <a-date-picker
        v-model:value="formJobInfomationState.jobTimeStart"
        placeholder="Chọn ngày"
      />
    </a-form-item>
    <a-form-item
      ref="formJobInfomationState.addressJob"
      name="addressJob"
      label="Nơi làm việc"
    >
      <a-space>
        <a-select
          v-model:value="value1"
          style="width: 440px"
          :size="size"
          :options="options"
        ></a-select>
      </a-space>
    </a-form-item>
    <a-form-item>
      <div class="jobInfo-item-title">Thời gian làm việc</div>
      <button class="flex btn-add-time-job">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Thêm thời gian
      </button>
    </a-form-item>
    <a-form-item class="jobInfo-checkbox-group">
      <div class="jobInfo-item-title">Màn hình được sử dụng</div>
      <a-checkbox v-model:checked="checked" class="jobInfo-checkbox-item"
        >Chats chốt đơn</a-checkbox
      >
      <br />
      <a-checkbox class="jobInfo-checkbox-item">Chats vận hành</a-checkbox>
      <br />
      <a-checkbox class="jobInfo-checkbox-item"
        >Tổng quan (Tổng quan shop)</a-checkbox
      >
      <br />
      <a-checkbox class="jobInfo-checkbox-item"
        >Đơn hàng (Quản lý và đăng đơn GHTK)</a-checkbox
      >
      <br />
      <a-checkbox class="jobInfo-checkbox-item"
        >Khách hàng (Quản lý và chăm sóc KH)</a-checkbox
      >
      <br />
      <a-checkbox class="jobInfo-checkbox-item"
        >Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)</a-checkbox
      >
      <br />
      <a-checkbox class="jobInfo-checkbox-item"
        >Nhân viên (Quản lý nhân viên)</a-checkbox
      >
    </a-form-item>
  </a-form>
  <!--  <button @click="resetForm" style="background-color: #069255; color: white">Reset</button>-->
</template>
<script setup>
import { ref } from "vue";
const formJobInfo = ref();
const checked = ref(false);
const formJobInfomationState = ref({
  jobTimeStart: "",
  addressJob: "",
});

const rulesJobInfo = {
  jobTimeStart: [
    {
      required: true,
      message: "Không được để trống ngày làm việc",
      trigger: "blur",
    },
  ],
};
const popupScroll = () => {
  console.log("popupScroll");
};
defineExpose(
  formJobInfo,
  formJobInfomationState,
  rulesJobInfo,
  checked,
  popupScroll
  //     size: ref("default"),
  //     value1: ref("a1"),
  //     options: [...Array(25)].map((_, i) => ({
  //   value: (i + 10).toString(36) + (i + 1),
  // })),
);
</script>
<style scoped>
:deep(.ant-form-item-required):before {
  display: none !important;
}
:deep(.ant-form-item-required):after {
  content: "";
  /*color: red;*/
}
:deep(.ant-form-item-label > label) {
  width: 200px !important;
  /*width:200px ;*/
}
:deep(.ant-picker) {
  width: 100%;
}
.btn-add-time-job {
  /*background-color: #069255;*/
  color: #069255;
  padding: 8px 22px;
  border: 1px solid #069255;
  border-radius: 4px;
}
.btn-add-time-job:hover {
  background-color: #069255;
  color: #fff;
}
.jobInfo-item-title {
  font-weight: 500;
  margin-bottom: 25px;
}
.jobInfo-checkbox-item {
  margin-bottom: 10px;
}
:deep(.ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover
    .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner) {
  border-color: #069255;
  border-radius: 5px;
}
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #069255;
  border-color: #069255;
}
:deep(.ant-checkbox-checked::after) {
  border-color: #069255;
  border-radius: 5px;
}
:deep(.ant-checkbox-inner) {
  width: 21px;
  height: 21px;
  border-radius: 5px;
  border-color: #069255;
}
</style>
