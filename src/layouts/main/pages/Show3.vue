<template>
  <div>
    <div class="foo"></div>
    <div class="layout">
      <div class="page__header grid grid-cols-1 md:grid-cols-2">
        <div class="left__content">
          <div class="info">
            <h1 class="info__title">Quản lý nhân viên</h1>
            <div class="info__live">
              <div class="live__icon">
                <div class="live__icon--ringing"></div>
                <div class="live__icon--circle"></div>
              </div>
              <div class="live__title">Live ( Cập nhật 15:15 )</div>
            </div>
          </div>
          <div class="filter">
            <button class="btn__filter">Hôm Nay</button>
            <button class="btn__filter">Tuần Này</button>
            <button class="btn__filter">Tháng Này</button>
            <button class="btn__filter">Tuỳ Chọn</button>
          </div>
        </div>
        <div class="right__content">
          <a-modal
            v-model:visible="visible"
            title="Cài đặt KPIs nhân viên"
            @ok="handleOk"
          >
            <h2>Phân công Nhân Viên Chat</h2>
            <h3>NV Online</h3>
            <a-radio-group v-model:value="valueRadio">
              <a-radio class="radioStyle" :value="1"
                >Nhận tất cả hội thoại</a-radio
              >
              <a-radio class="radioStyle" :value="2"
                >Nhận phần hội thoại được chia đều</a-radio
              >
              <a-radio class="radioStyle" :value="3"
                >Nhận phần hội thoại bấm xem trước tiên</a-radio
              >
              <a-radio class="radioStyle" :value="4"
                >Nhận tất cả hội thoại</a-radio
              >
              <a-radio class="radioStyle" :value="5"
                >Nhận phần hội thoại trả lời trước tiên</a-radio
              >
            </a-radio-group>
            <h3>NV Offline</h3>
            <a-radio-group>
              <a-radio class="radioStyle"
                >Tiếp tục hội thoại sau khi Offline</a-radio
              >
              <a-radio class="radioStyle"
                >Chuyển hội thoại chưa trả lời cho NV Online</a-radio
              >
              <button></button>
            </a-radio-group>
          </a-modal>
          <button class="btn-action" @click="showModalKpi">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span> KPIs nhân viên </span>
          </button>
          <button class="btn-action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <router-link to="/staff/add"
              ><span class="text-white"> Thêm nhân viên </span></router-link
            >
          </button>
        </div>
      </div>
    </div>

    <!-- <div class="table-contain">
      <table>
        <thead>
          <tr>
            <th>Nhân viên</th>
            <th>KH tương tác</th>
            <th>KH đã gọi</th>
            <th>ĐH đã chốt</th>
            <th>Tỷ lệ chốt</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(staff_item) in staff_items.staff" :key="staff_item.id" >
            <td class="mx-8">
              <img :src="staff_item.avatar" alt="">
            </td>
            <td class="mx-8">{{ staff_item.shop_code }}</td>
            <td class="mx-8">{{ staff_item.tel }}</td>
            <td class="mx-8">{{ staff_item.screens[1] }}</td>
            <td class="mx-8">{{ staff_item.work_result.customer }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Nhân viên</th>
            <th scope="col" class="py-3 px-6">KH tương tác</th>
            <th scope="col" class="py-3 px-6">KH có SĐT</th>
            <th scope="col" class="py-3 px-6">KH đã gọi</th>
            <th scope="col" class="py-3 px-6">ĐH đã chốt</th>
            <th scope="col" class="py-3 px-6">Tỷ lệ chốt</th>
            <th scope="col" class="py-3 px-6">ĐH thành công</th>
            <th scope="col" class="py-3 px-6">ĐH hoàn</th>
            <th scope="col" class="py-3 px-6">Doanh thu</th>
            <th scope="col" class="py-3 px-6">Phí hoàn</th>
            <th scope="col" class="py-3 px-6">TG phản hồi TB</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="staff_item in staff_items.staff"
            :key="staff_item.id"
          >
            <td>
              <StaffOnly :staffAll="staff_items.staff" :staff="staff_item" />
            </td>
            <!-- <td><img :src="staff_item.avatar"  class="w-[64px] h-[64px rounded-[50%]" alt="" /></td> -->
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
            <td>{{ staff_item.work_result.customer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStaffStore } from "../../../stores/store.js";
import TableStaff from "./TableStaff.vue";
import StaffOnly from "./StaffOnly.vue";
// Modal!!!
const visible = ref(false);
const showModalKpi = () => {
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const valueRadio = {};
// Table data

const staff_items = useStaffStore();

onMounted(async () => {
  await staff_items.getStaff();
  // console.log(staff_items.staff[0].avatar);
});

defineExpose({
  visible,
  showModalKpi,
  handleOk,
});
</script>

<style scoped>
.page__header {
  display: flex;
  justify-content: space-between;
  /*padding: 0px 0px 20px 0px;*/
  padding-bottom: 20px;
}
.info {
  display: flex;
}
.info__title {
  font-size: 40px;
  font-weight: 700;
  margin-right: 26px;
}
.info__live {
  /*display: flex;*/
  font-style: italic;
  padding-left: 5px;
  padding-top: 10px;
}
.live__icon {
  position: relative;
  top: -2px;
}
.live__title {
  margin: 15px 40px 0;
}
.live__icon--circle {
  width: 9px;
  height: 9px;
  background-color: #ff5d5d;
  border-radius: 50%;
  position: absolute;
  top: 23px;
  left: 23px;
}
.live__icon--ringing {
  border: 3px solid #ff5d5d;
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: absolute;
  left: 15px;
  top: 15px;
  -webkit-animation: ringing 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
}
@-webkit-keyframes ringing {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.1, 1.1);
    opacity: 0;
  }
}
/*//filter//*/
.btn__filter {
  padding: 6px 20px;
  margin: 0px 15px 10px 0px;
  color: #069255;
  background-color: rgb(239, 239, 239);
  border-radius: 15px;
  font-weight: 400;
}
.btn__filter:hover {
  background-color: #069255;
  color: #ffffff;
}
.btn-action {
  display: flex;
  width: 182px;
  /*height: 50px;*/
  padding: 10px 20px;
  background-color: #069255;
  color: #ffffff;
  font-weight: 500;
  border-radius: 25px;
}
.btn-action svg {
  margin-right: 5px;
}
.btn-action:last-child {
  margin-top: 20px;
}
.right__content {
  margin-top: 20px;
}
/*////table*/
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
.ant-modal-header {
  background-color: #069255;
}
.radioStyle {
  display: block;
  height: 30px;
  lineheight: 30px;
}
.radioStyle:focus {
  background-color: #069255;
  border-color: #069255;
}
</style>
