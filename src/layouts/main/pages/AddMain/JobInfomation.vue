<template>
  <a-form :model="formJobInfomationState">
    <a-form-item label="Ngày bắt đầu làm việc">
      <a-date-picker placeholder="Chọn ngày" />
    </a-form-item>
    <!--    ref="formJobInfomationState.addressJob"-->
    <a-form-item name="addressJob" label="Nơi làm việc">
      <a-select
        v-model:value="getListWorkPlace"
        show-search
        allow-clear
        placeholder="Chọn nơi làm việc"
        style="width: 440px"
        :filter-option="filterAddress"
        @change="handleChangeAddress"
      >
        <a-select-option
          v-for="value in getListWorkPlace"
          :key="value.id"
          :value="value.address"
          :content="value.address"
        >
          {{ value.address }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <div class="jobInfo-item-title">Thời gian làm việc</div>
      <AddWorkingTime
        v-for="(list, index) in listWorkTime"
        :key="index"
        class="mb-5"
        :index="index"
        :list-work-time="listWorkTime"
        :send-id="list"
        @emitHandleDeleteCompWorkTime="HandleDeleteCompWorkTime"
      />
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
<!--        <a-checkbox>Tất cả</a-checkbox>-->
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
    <!--    <a-form-item class="jobInfo-checkbox-group">-->
    <!--      <div class="jobInfo-item-title">Màn hình được sử dụng</div>-->
    <!--      <a-checkbox-group @change="handleChangeScreen">-->
    <!--        <a-checkbox-->
    <!--          v-for="(screen, index) in options"-->
    <!--          :key="index"-->
    <!--          :value="screen"-->
    <!--          style="width: 100%"-->
    <!--          >-->

    <!--          {{ checkScreens[screen] }}-->
    <!--        </a-checkbox>-->
    <!--        <ul v-if="innerList" v-show="isShowListPage">-->
    <!--          <li v-for="(page, index) in getPages" :key="index" class="flex">-->
    <!--            <a-checkbox class="flex">-->
    <!--              <img :src="page.avatar" class="rounded-full w-6 h-6" alt="" />-->

    <!--              {{ page.name }}</a-checkbox-->
    <!--            >-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </a-checkbox-group>-->
    <!--    </a-form-item>-->
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import axios from "axios";
import TOKEN from "../../../../service/AllApi";
import AddWorkingTime from "./WorkTime/AddWorkingTime.vue";
import ButtonAddWorkTime from "./WorkTime/ButtonAddWorkTime.vue";
// let options = ref([]);
// let isShowListPage = ref(false);
const getPages = ref({});
const getListWorkPlace = ref([]);
const checked = ref(false);

const formJobInfomationState = ref({
  addressJob: "",
});
let listWorkTime = ref([]);
// const checkScreens = reactive({
//   sale: "Chats chốt đơn",
//   chat_ops: "Chats vận hành",
//   statistic: "Tổng quan (Tổng quan shop)",
//   order: "Đơn hàng (Quản lý và đăng đơn GHTK)",
//   customer: "Khách hàng (Quản lý và chăm sóc KH)",
//   product: "Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)",
//   staff: "Nhân viên (Quản lý nhân viên)",
// });

const screens = [
  "sale",
  "chat_ops",
  "statistic",
  "order",
  "customer",
  "product",
  "staff",
];
// const getPageValue = {
//
// }
// let screens = reactive([]);
// const innerList = ref(false);
// const handleChangeScreen = (valueScreen) => {
//   screens = valueScreen;
//
//   watchEffect(async () => {
//     if (screens.includes("sale")) {
//       try {
//         const res = await axios.get(
//           "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code",
//           {
//             headers: {
//               Authorization: "Bearer " + TOKEN.TOKEN,
//             },
//           }
//         );
//         getPages.value = res.data.data.pages;
//         innerList.value = true;
//         isShowListPage.value = true;
//         console.log(getPages.value);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       innerList.value = false;
//       isShowListPage.value = false;
//     }
//   });
// };
// options = Object.keys(checkScreens);
function clickCheckbox() {
  checked.value = !checked.value;
}
// fillter
const filterValue = ref();
const handleChangeAddress = (value) => {
  filterValue.value = value;
  console.log(filterValue.value);
};

const converToNoMark = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

const filterOption = (input, value) => {
  const textToSearch = converToNoMark(input).toLowerCase();
  const children = converToNoMark(value).toLowerCase();
  const regex = new RegExp(textToSearch);
  return regex.test(children);
};
const filterAddress = (input, option) => filterOption(input, option.content);
// end_
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
    });
  } catch (error) {
    console.log(error);
  }
});
function handleParentEmit(data) {
  listWorkTime.value.push(data);
}
function HandleDeleteCompWorkTime(index) {
  listWorkTime.value.splice(index, 1);
}
</script>
<style scoped>
@import "css/JobInfomation.css";
</style>
