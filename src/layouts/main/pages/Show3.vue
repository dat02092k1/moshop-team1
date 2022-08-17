<template>
  <div>
    <div class="foo"></div>
    <div class="layout">
      <div class="page__header grid grid-cols-1 md:grid-cols-2">
        <div class="left__content px-4">
          <div class="info">
            <h1 class="info__title">Quản lý nhân viên</h1>
            <div class="info__live">
              <div class="live__icon">
                <div class="live__icon--ringing"></div>
                <div class="live__icon--circle"></div>
              </div>
              <div class="live__title">
                Live ( Cập nhật {{ staff_items.getDateTime() }})
              </div>
            </div>
          </div>
          <div class="filter">
            <!-- <button class="btn__filter" :class="{ red: isRed }" @click="toggleRed">Hôm nay</button> -->
            <button
              @click="showToday()"
              class="btn__filter"
              :class="{ green: staff_items.isShow == 1 }"
            >
              Hôm nay
            </button>
            <button
              @click="showWeek()"
              class="btn__filter"
              :class="{ green: staff_items.isShow == 2 }"
            >
              Tuần này
            </button>
            <button
              @click="showMonth()"
              class="btn__filter"
              :class="{ green: staff_items.isShow == 3 }"
            >
              Tháng này
            </button>

            <PickDate @changeDrop="changeDrop" />
          </div>
        </div>
        <div class="right__content">
          <a-modal
            v-model:visible="visible"
            title="Cài đặt KPIs nhân viên"
            @ok="handleOk"
          >
            <div class="setting bg-[#d6d6d6] p-3">
              <h2>Phân công Nhân Viên Chat</h2>
            </div>
            <div class="setting-onl p-3">
              <h3>NV Online</h3>
              <a-radio-group @change="change" v-model:value="OnKpi">
                <a-radio :style="radioStyle" :value="KPImessage[0].value"
                  >Nhận tất cả hội thoại</a-radio
                >
                <a-radio :style="radioStyle" :value="KPImessage[1].value"
                  >Nhận phần hội thoại được chia đều</a-radio
                >
                <a-radio :style="radioStyle" :value="KPImessage[2].value"
                  >Nhận phần hội thoại bấm xem trước tiên</a-radio
                >
                <a-radio :style="radioStyle" :value="KPImessage[3].value"
                  >Nhận phần hội thoại trả lời trước tiên</a-radio
                >
                <a-radio :style="radioStyle" :value="KPImessage[4].value"
                  >Nhận phần hội thoại chốt đơn trước tiên</a-radio
                >
              </a-radio-group>
            </div>

            <div class="setting-off p-3">
              <h3>NV Offline {{ OffKpi }}</h3>
              <a-radio-group v-if="OnKpi !== 'all'" v-model:value="OffKpi">
                <a-radio :style="radioStyleOff" :value="KPImessage[5].value"
                  >Tiếp tục hội thoại sau khi Offline</a-radio
                >
                <a-radio :style="radioStyleOff" :value="KPImessage[6].value"
                  >Chuyển hội thoại chưa trả lời cho NV Online</a-radio
                >
              </a-radio-group>
            </div>
            <div class="mt-4">
              <button @click="postKpi()" class="bg-[#069255] p-3">Lưu</button>
            </div>
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

    <div class="overflow-scroll h-[500px] relative shadow-md sm:rounded-lg m-4">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Nhân viên</th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">KH tương tác</div>
              <div class="head-sort flex">
                <div
                  @click="sortColAsc('customer')"
                  class="head-asc absolute top-1 right-4"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div
                  @click="sortColDes('customer')"
                  class="head-desc absolute top-3 right-2"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">KH có SĐT</div>
              <div class="head-sort flex">
                <div
                  @click="sortColAsc('customer_has_phone')"
                  class="head-asc absolute top-1 right-4"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div
                  @click="sortColDes('customer_has_phone')"
                  class="head-desc absolute top-3 right-2"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">KH đã gọi</div>
              <div class="head-sort flex">
                <div
                  @click="sortColAsc('call_log')"
                  class="head-asc absolute top-1 right-4"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div
                  @click="sortColDes('call_log')"
                  class="head-desc absolute top-3 right-2"
                >
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">ĐH đã chốt</div>
              <div @click="sortColAsc('customer_deal')" class="head-sort flex">
                <div class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('customer_deal')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">Tỷ lệ chốt</div>
              <div class="head-sort flex">
                <div @click="sortColAsc('rate_order')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('rate_order')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">ĐH thành công</div>
              <div class="head-sort flex">
                <div @click="sortColAsc('order_success')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('order_success')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">ĐH hoàn</div>
              <div class="head-sort flex">
                <div @click="sortColAsc('order_return')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('order_return')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">Doanh thu</div>
              <div class="head-sort flex">
                <div  @click="sortColAsc('revenue')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('revenue')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">Phí hoàn</div>
              <div class="head-sort flex">
                <div @click="sortColAsc('fee')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('fee')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
            <th scope="col" class="py-3 px-6 relative">
              <div class="head-name">TG phản hồi TB</div>
              <div class="head-sort flex">
                <div  @click="sortColAsc('time_reply')" class="head-asc absolute top-1 right-4">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84358 0L0.850586 5.55556H4.59533V15.2778H7.09183V5.55556H10.8366L5.84358 0Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
                <div @click="sortColDes('time_reply')" class="head-desc absolute top-3 right-2">
                  <svg
                    data-v-4a39057f=""
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-v-4a39057f=""
                      d="M5.84343 15.2773L10.8364 9.72179H7.09168L7.09168 -0.000434875H4.59518L4.59518 9.72179H0.850438L5.84343 15.2773Z"
                      fill="#BDBDBD"
                    ></path>
                  </svg>
                </div>
              </div>
            </th>
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

            <td>{{ staff_item.work_result.customer_has_phone }}</td>
            <td>{{ staff_item.work_result.call_log }}</td>
            <td>{{ staff_item.work_result.customer_deal }}</td>
            <td>{{ staff_item.work_result.rate_order }}%</td>
            <td>{{ staff_item.work_result.order_success }}</td>
            <td>{{ staff_item.work_result.order_return }}</td>
            <td>{{ staff_item.work_result.revenue }} đ</td>
            <td>{{ staff_item.work_result.fee }} đ</td>
            <td>{{ staff_item.work_result.time_reply }}s</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useStaffStore } from "../../../stores/store.js";
import TableStaff from "./TableStaff.vue";
import StaffOnly from "./StaffOnly.vue";
import PickDate from "./PickDate.vue";
import SelectDate from "./SelectDate.vue";
import axios from "axios";
import { useWeekTable } from "../../../stores/counter";
import {
  format,
  addDays,
  isToday,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  formatRelative,
  endOfWeek,
} from "date-fns";

const clicked = ref(false);
const value = ref();
const radioStyle = reactive({
  display: "block",
  height: "30px",
  lineHeight: "30px",
});

const value2 = ref(1);
const radioStyleOff = reactive({
  display: "block",
  height: "30px",
  lineHeight: "30px",
});

// Modal!!!
const visible = ref(false);
const display = ref(false);
const changeDrop = () => {};

const KPImessage = reactive([
  {
    value: "all",
    name: "Nhận tất cả hội thoại",
  },
  {
    value: "share_work",
    name: "Nhận phần hội thoại được chia đều",
  },
  {
    value: "first_view",
    name: "Nhận phần hội thoại bấm xem trước tiên",
  },
  {
    value: "first_reply",
    name: "Nhận phần hội thoại trả lời trước tiên",
  },
  {
    value: "first_deal",
    name: "Nhận phần hội thoại chốt đơn trước tiên",
  },
  {
    value: "keep",
    name: "Tiếp tục hội thoại sau khi Offline",
  },
  {
    value: "share",
    name: "Chuyển hội thoại chưa trả lời cho NV Online",
  },
]);

const change = () => {
  console.log("heh");
  console.log(value.value);
};

async function postKpi() {
  await axios
    .post(
      "https://x.ghtk.vn/api/v2/staff/update-online-message-type",
      {
        message_type: OnKpi.value,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    });
  await axios
    .post(
      "https://x.ghtk.vn/api/v2/staff/update-offline-message-type",
      {
        message_type: OffKpi.value,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    });
  visible.value = false;
}
// const selectType
// axios.post(url, {
//   message-type: selectYtype
// })

const OnKpi = ref("");
const OffKpi = ref("");
function showModalKpi() {
  visible.value = true;
  console.log("heh");
  axios
    .get("https://x.ghtk.vn/api/v2/staff/get-config-message-type", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
      },
    })
    .then((res) => {
      OnKpi.value = res.data.data.message_type;
      OffKpi.value = res.data.data.offline_message_type;
    });
}
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

function sortColAsc(wsa) {
  console.log("heh");
  const arr = staff_items.staff.sort(
    (a, b) => a.work_result.wsa - b.work_result.wsa
  );
  console.log(arr);
}

function sortColDes(wsd) {
  const arr = staff_items.staff.sort(
    (b, a) => b.work_result.wsd - a.work_result.wsd
  );
  console.log(arr);
}

const valueRadio = {};
// Table data
const date = new Date();
const tmr = addDays(date, 1);
const startWeek = startOfWeek(date);
const endWeek = endOfWeek(date);
const startMonth = startOfMonth(date);
const endMonth = endOfMonth(date);
const resultStartWeek = format(startWeek, "yyyy-MM-dd");
const resultEndWeek = format(endWeek, "yyyy-MM-dd");
const resultStartMonth = format(startMonth, "yyyy-MM-dd");
const resultEndMonth = format(endMonth, "yyyy-MM-dd");
const today = format(date, "yyyy-MM-dd");

console.log(today);
// const displayComponent = () => {
//   display = true;
//   console.log('heh');
// }
const staff_items = useStaffStore();

const week_show = useWeekTable();

var now = "";

async function showToday() {
  staff_items.isShow = 1;
  staff_items.clearStaff();
  await staff_items.getStaff(today, today);
  console.log(today);
}

async function showWeek() {
  staff_items.isShow = 2;
  staff_items.clearStaff();
  await staff_items.getStaff(resultStartWeek, resultEndWeek);
  console.log(resultStartWeek);
}

async function showMonth() {
  staff_items.isShow = 3;
  staff_items.clearStaff();
  await staff_items.getStaff(resultStartMonth, resultEndMonth);
  console.log(resultStartMonth);
}
// const currentdate = new Date();
console.log(staff_items.getDateTime());
onMounted(async () => {
  await staff_items.getStaff(today, today);
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

.text-xs tr th {
  border: 1px solid #dee2e6;
}
.text-center td {
  border: 1px solid #dee2e6;
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

.green {
  background-color: #069255;
  color: white;
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
/* .ant-modal-header {
  background-color: #069255;
} */
.radioStyle {
  display: block;
  height: 30px;
  lineheight: 30px;
}
.radioStyle:focus {
  background-color: #069255;
  border-color: #069255;
}

:deep(.ant-btn.ant-btn-primary) {
  background: #efefef;
  border-color: #efefef;
  border-radius: 15px;
}

.ant-modal-header {
  background: #069255 !important;
}
.red {
  color: white;
  background: #069255;
}
</style>
