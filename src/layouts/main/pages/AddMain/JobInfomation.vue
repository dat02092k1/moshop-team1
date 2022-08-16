<template>
  <a-form :model="formJobInfomationState">
    <a-form-item label="Ngày bắt đầu làm việc">
      <a-date-picker placeholder="Chọn ngày" />
    </a-form-item>
    <!--    ref="formJobInfomationState.addressJob"-->
    <a-form-item name="addressJob" label="Nơi làm việc">
      <select style="width: 440px">
        <option v-for="(value, index) in getListWorkPlace" :key="index">
          {{ value.address }}
        </option>
      </select>
      <a-space>
        <!--        <a-select-->
        <!--          v-for="(value, index) in prop.getListWorkPlace"-->
        <!--          :key="index"-->
        <!--          style="width: 100%"-->
        <!--        ></a-select>-->
      </a-space>
    </a-form-item>
    <a-form-item>
      <div class="jobInfo-item-title">Thời gian làm việc</div>
<!--{{log(ListWorkTime)}}-->
      <AddWorkingTime v-for="(test, index) in ListWorkTime" :key="index" />
      <ButtonAddWorkTime @emitTest="handleParentEmit" />
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
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import TOKEN from "../../../../service/AllApi";
import AddWorkingTime from "./WorkTime/AddWorkingTime.vue";
import ButtonAddWorkTime from "./WorkTime/ButtonAddWorkTime.vue";
let isShowAddWorkingTime = ref(false);
let checked = ref(false);
const getPages = ref({});
const getListWorkPlace = ref([]);
const formJobInfomationState = ref({
  addressJob: "",
});
let ListWorkTime = ref([]);
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
    } catch (error) {
      console.log(error);
    }
  }
});
const api_getListPlace =
  "https://x.ghtk.vn/api/fulfilment/v1/shops/get-pick-addresses";
onMounted(async () => {
  try {
    const list = await axios.get(api_getListPlace, {
      headers: {
        Authorization: "Bearer " + TOKEN.TOKEN,
      },
    });
    list.data.data.forEach((value) => {
      getListWorkPlace.value.push(value);
      // console.table(getListWorkPlace.value);
    });
  } catch (error) {
    console.log(error);
  }
});
function handleParentEmit(data) {
  isShowAddWorkingTime = true;
  ListWorkTime.value.push(data);
}

// function  log(mes) {
//   console.log(mes)
// }
</script>
<style scoped>
@import "css/JobInfomation.css";
</style>
