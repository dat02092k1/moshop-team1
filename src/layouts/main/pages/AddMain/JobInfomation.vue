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
      <a-date-picker
        :value="formJobInfomationState.jobTimeStart"
        placeholder="Chọn ngày"
      />
    </a-form-item>
    <a-form-item
      ref="formJobInfomationState.addressJob"
      name="addressJob"
      label="Nơi làm việc"
    >
      <a-space>
        <a-select style="width: 100%"></a-select>
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
      <a-checkbox
        :checked="checked"
        class="jobInfo-checkbox-item"
        @click="clickCheckbox"
        >Chats chốt đơn</a-checkbox
      >
      <ul v-show="checked" class="list-checkbox">
        <li v-for="(page, index) in getPages" :key="index">
          <a-checkbox>
            <img
              :src="page.avatar"
              class="rounded-full w-6 h-6 mr-3"
              alt=""
              srcset=""
            />
            {{ page.name }}
          </a-checkbox>
        </li>
      </ul>
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
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import TOKEN from "../../../../service/AllApi";
let formJobInfo = ref();
let checked = ref(false);
const getPages = ref({});

const formJobInfomationState = ref({
  jobTimeStart: "",
  addressJob: "",
});
const clickCheckbox = () => {
  checked.value = !checked.value;
  return checked.value;
};
const API = "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code";

watchEffect(async () => {
  if (checked.value) {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: "Bearer " + TOKEN.TOKEN,
        },
      });
      getPages.value = res.data.data.pages;
      // console.log("sdsd", JSON.stringify(getPages.value));
    } catch (error) {
      console.log(error);
    }
  }
});

// console.log(getPages);

const rulesJobInfo = {
  jobTimeStart: [
    {
      required: true,
      message: "Không được để trống ngày làm việc",
      trigger: "blur",
    },
  ],
};

defineExpose(
  formJobInfo,
  formJobInfomationState,
  rulesJobInfo,
  checked,
  clickCheckbox,
  getPages
);
</script>
<style scoped>
@import "css/JobInfomation.css";
.list-checkbox li {
  margin-left: 15px !important;
}
:deep(.ant-checkbox + span) {
  /*display: flex;*/
}
</style>
