<template>
  {{ useStoreInScreenPage.dataAddMain.pages }}
  <div class="heading-title">Màn hình được sử dụng</div>
  <div class="screen-item">
    <input
      id="sale"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      :checked="checked"
      type="checkbox"
      value="sale"
      @click="clickCheckbox"
    />
    <label for="sale">Chats chốt đơn</label>
    <ul v-if="checked" class="list-page">
      <li v-for="(page, i) in getPages" :key="i">
        <input
          v-model="useStoreInScreenPage.dataAddMain.pages"
          type="checkbox"
          :value="page.pid"
        /><label>
          <img :src="page.avatar" class="rounded-full w-5 h-5 mr-1" />
          {{ page.name }}</label
        >
      </li>
    </ul>
  </div>
  <div class="screen-item">
    <input
      id="chat_ops"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="chat_ops"
    />
    <label for="chat_ops">Chats vận hành</label>
  </div>
  <div class="screen-item">
    <input
      id="statistic"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="statistic"
    />
    <label for="statistic">Tổng quan (Tổng quan shop)</label>
  </div>
  <div class="screen-item">
    <input
      id="order"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="order"
    />
    <label for="order">Đơn hàng (Quản lí và đăng đơn GHTK)</label>
  </div>
  <div class="screen-item">
    <input
      id="customer"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="customer"
    />
    <label for="customer">Khách hàng (Quản lí và chăm sóc KH)</label>
  </div>
  <div class="screen-item">
    <input
      id="product"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="product"
    />
    <label for="product">Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)</label>
  </div>
  <div class="screen-item">
    <input
      id="staff"
      v-model="useStoreInScreenPage.dataAddMain.screens"
      type="checkbox"
      value="staff"
    />
    <label for="staff">Nhân viên(Quản lí nhân viên)</label>
  </div>
</template>

<script setup>
import { useAddMainStore } from "../../../../stores/addMainStore.js";
import { onMounted, ref } from "vue";
import axios from "axios";
import TOKEN from "../../../../service/AllApi";
import { message } from "ant-design-vue";
const useStoreInScreenPage = useAddMainStore();
const getPages = ref([]);
const checked = ref(false);
function clickCheckbox() {
  checked.value = !checked.value;
  if (checked.value == false) {
    useStoreInScreenPage.dataAddMain.pages = [];
  }
}

// if(!checked.value){}
const API = "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code";
onMounted(async () => {
  try {
    const res = await axios.get(API, {
      headers: {
        Authorization: "Bearer " + TOKEN.TOKEN,
      },
    });
    // console.log(res.data.data.pages);
    getPages.value = res.data.data.pages;
    // console.log(getPages.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.heading-title {
  font-weight: 500;
  margin-bottom: 20px;
}
.screen-item label {
  align-items: center;
  display: inline-flex;
  font-family: Roboto;
  font-size: 14px;
  line-height: 21px;
  margin: 0px 8px 8px;
  text-align: left;
}
.screen-item input {
  width: 20px;
  height: 20px;
  border: 1px solid #069255;
}
.list-page {
  margin-left: 15px;
}
input:focus {
  background-color: #ff5d5d;
}
</style>
