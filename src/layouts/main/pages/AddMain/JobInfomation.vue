<template>
  <a-form :model="formJobInfomationState">
    <!--    <a-form-item label="Ngày bắt đầu làm việc">-->
    <!--      <a-date-picker-->
    <!--        v-model:value="useStoreInJobInfomation.dataAddMain.work_first_date"-->
    <!--        value-format="YYYY:MM:DD"-->
    <!--        placeholder="Chọn ngày"-->
    <!--      />-->
    <!--    </a-form-item>-->

    <a-form-item
      ref="start_date"
      label="Ngày bắt đầu làm việc"
      name="start_date"
    >
      <a-date-picker
        v-model:value="useStoreInJobInfomation.dataAddMain.work_first_date"
        value-format="YYYY:MM:DD"
        placeholder="Chọn ngày"
      />
    </a-form-item>

    <!--    ref="formJobInfomationState.addressJob"-->
    <a-form-item name="addressJob" label="Nơi làm việc">
      <a-select
        v-model:value="useStoreInJobInfomation.dataAddMain.work_address"
        :value="filterValue"
        show-search
        allow-clear
        placeholder="Chọn nơi làm việc"
        style="width: 400px"
        :filter-option="filterAddress"
        @change="handleChangeAddress"
      >
        <a-select-option
          v-for="value in getListWorkPlace"
          :key="value.id"
          :value="value.id"
          :content="value.address"
        >
          {{ value.address }}
        </a-select-option>
      </a-select>
    </a-form-item>
<!--    {{useStoreInJobInfomation.dataAddMain.work_time_repeats.repeats}}-->
    <a-form-item>
      <div class="jobInfo-item-title">Thời gian làm việc</div>
      <AddWorkingTime
        v-for="(list, index) in listWorkTime"
        :key="list"
        :no="index"
        class="mb-5"
        :index="list"
        :list-work-time="listWorkTime"
        :send-id="list"
        @emitHandleDeleteCompWorkTime="HandleDeleteCompWorkTime"
      />
      <ButtonAddWorkTime @emitTest="handleParentEmit" />
    </a-form-item>
    <ScreensAndPage />

  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import axios from "axios";
import TOKEN from "../../../../service/AllApi";
import AddWorkingTime from "./WorkTime/AddWorkingTime.vue";
import ButtonAddWorkTime from "./WorkTime/ButtonAddWorkTime.vue";
import { useAddMainStore } from "../../../../stores/addMainStore.js";
import ScreensAndPage from "./ScreensAndPage.vue";
const useStoreInJobInfomation = useAddMainStore();
// let options = ref([]);
// let isShowListPage = ref(false);

const getListWorkPlace = ref([]);

const index = ref(1);

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

// fillter
const filterValue = ref();
const handleChangeAddress = (value) => {
  // console.log(value.id)
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
function handleParentEmit() {
  listWorkTime.value.push(index.value);
  index.value++;
}
function HandleDeleteCompWorkTime(index) {
  console.log(index);
  console.log(listWorkTime);
  const position = listWorkTime.value.indexOf(index);
  listWorkTime.value.splice(position, 1);
}
</script>
<style scoped>
@import "css/JobInfomation.css";
</style>
