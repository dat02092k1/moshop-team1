<script setup>
import { onMounted } from "vue";
import {useRoute} from "vue-router"
import {
  employeeStore,
  resultEmployeeStore,
  historyEmployeeStore,
  listAddressStore,
  listPageStore,
} from "../stores/ListEmployee.js";
const route = useRoute()

const id = route.params.id

const view = employeeStore();
const results = resultEmployeeStore();
const history = historyEmployeeStore();
const addresses = listAddressStore();
const page = listPageStore();

onMounted(async () => {
  await view.getEmployee(id);
  await results.getResultEmployee(id);
  await history.getHistory(id);
  await addresses.getAddress();
  await page.getPage();
  await view.checkIsPage();

  const data = addresses.address;
  const temp = view.employees.work_address;
  // địa chỉ công ty
  data.map((state) => {
    if (state.id == temp) {
      addresses.x = state.address;
    }
  });
  //  kiểm tra màn hình được quyền sử dụng
  view.employees.screens.map((state) => {
    if (state === "order") {
      view.screen.order = !view.screen.order;
    }
    if (state === "chat_ops") {
      view.screen.chat_ops = !view.screen.chat_ops;
    }
    if (state === "statistic") {
      view.screen.statistic = !view.screen.statistic;
    }
    if (state === "customer") {
      view.screen.customer = !view.screen.customer;
    }
    if (state === "staff") {
      view.screen.staff = !view.screen.staff;
    }
    if (state === "sale") {
      view.screen.sale = !view.screen.sale;
    }
    if (state === "product") {
      view.screen.products = !view.screen.products;
    }
  });

  // hiển thị thời gian đăng kí làm việc
  view.employees.work_time_repeats.map((state) => {
    state.repeats.map((state2) => {
      if (state2 == 0) {
        view.time_work.t2 = true;
      }
      if (state2 == 1) {
        view.time_work.t3 = true;
      }
      if (state2 == 2) {
        view.time_work.t4 = true;
      }
      if (state2 == 3) {
        view.time_work.t5 = true;
      }
      if (state2 == 4) {
        view.time_work.t6 = true;
      }
      if (state2 == 5) {
        view.time_work.t7 = true;
      }
      if (state2 == 6) {
        view.time_work.cn = true;
      }
      return;
    });
  });
});
</script>
<template>
  <div class="m-5">
    <div class="trang_thai flex justify-between relative">
      <div class="py-5">
        <router-link to="/staff/home">
          <img
            src="https://moshop.com.vn/_nuxt/img/caret-left-green.977777e.svg"
        />
        </router-link>
      </div>
      <div>
        <div class="avt_employee flex justify-center">
          <img
            :src="view.employees.avatar"
            alt="avt"
            class="w-[128px] h-[128px] border-0 border-red rounded-full"
          />
        </div>
        <div class="py-2 font-bold text-xl flex justify-center">
          <span class="name_employee pr-2">{{ view.employees.fullname }}</span>
          <span> / </span>
          <span class="phone_employee pl-2">{{ view.employees.tel }}</span>
        </div>
        <div class="flex items-center">
          <span class="font-bold">Trạng thái</span>
          <div class="font-semibold">
            <button
              class="mx-5 px-5 py-1 text-l_green border border-l_green rounded-full"
              v-if="view.employees.active == 0"
              @click="view.clickTrangThai()"
            >
              <span>Đang làm việc</span>
              <a class="pl-2 text-l_green"
                ><i class="fa-solid fa-angle-down"></i
              ></a>
            </button>
            <button
              class="mx-5 px-5 py-1 text-l_orange border border-l_orange rounded-full"
              v-else-if="view.employees.active == 1"
              @click="view.clickTrangThai()"
            >
              <span>Nghỉ tạm thời</span>
              <a class="pl-2 text-l_orange"
                ><i class="fa-solid fa-angle-down"></i
              ></a>
            </button>
            <button
              class="mx-5 px-5 py-1 text-l_red border border-l_red rounded-full"
              v-else
              @click="view.clickTrangThai()"
            >
              <span>Đã nghỉ việc</span>
              <a class="pl-2 text-l_red"
                ><i class="fa-solid fa-angle-down"></i
              ></a>
            </button>
          </div>
        </div>
        <div
          v-if="view.anHienTrangThai"
          class="z-10 p-5 text-[16px] font-semibold bg-white fixed top-[160px] left-[570px] border-2 border-l_grey rounded-[14px] shadow-lg"
        >
          <table>
            <tr class="h-[40px]" @click="view.thayDoiTrangThai(0, id)">
              <td>
                <img
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
                  v-if="view.employees.active == 0"
                />
              </td>
              <td>Đang làm việc</td>
            </tr>
            <tr class="h-[40px]" @click="view.thayDoiTrangThai(1, id)">
              <td>
                <img
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
                  v-if="view.employees.active == 1"
                />
              </td>
              <td>Nghỉ việc tạm thời</td>
            </tr>
            <tr class="h-[40px]" @click="view.thayDoiTrangThai(2, id)">
              <td>
                <img
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
                  v-if="view.employees.active == 2"
                />
              </td>
              <td>Đã nghỉ việc</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="py-5">
        <a href="">
          <button
            class="px-[52px] py-[6px] border-2 text-l_cyan border-l_green rounded-full hover:bg-l_cyan hover:text-white transition ease-in-out"
          >
            Sửa
          </button>
        </a>
      </div>
    </div>
    <div class="ket_qua_cong_viec my-10 max-w-[100%]">
      <fieldset
        class="fieldset-nav"
      >
        <legend
          class="w-auto mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
        >
          Kết quả công việc
        </legend>
        <div class="mx-10 my-5">
          <button
            class="mr-5 mb-2 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            :class="{ clickBtn: results.isGreenSelect == 1 }"
            @click="results.clickBtnDay(1)"
          >
            Hôm nay
          </button>
          <button
            class="mr-5 mb-2 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            :class="{ clickBtn: results.isGreenSelect == 2 }"
            @click="results.clickBtnWeek(2, id)"
          >
            Tuần này
          </button>
          <button
            class="mr-5 mb-2 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            :class="{ clickBtn: results.isGreenSelect == 3 }"
            @click="results.clickBtnMonth(3, id)"
          >
            Tháng này
          </button>
          <button
            class="mr-5 mb-2 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            :class="{ clickBtn: results.isGreenSelect == 4 }"
            @click="results.clickTuyChon(1)"
          >
            Tùy chọn
          </button>
        </div>
        <div class="mx-10 my-8 text-[14px] overflow-x-auto scroll-bar-x">
          <table class="w-full">
            <thead>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                KH tương tác
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                KH có SĐT
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                KH đã gọi
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                ĐH đã chốt
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                Tỉ lệ chốt
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                ĐH thành công
              </th>
              <th class="w-6% py-[12px] border-[1px] border-l_grey">ĐH hoàn</th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                Doanh thu
              </th>
              <th class="w-6% py-[12px] border-[1px] border-l_grey">
                Phí hoàn
              </th>
              <th class="w-8% py-[12px] border-[1px] border-l_grey">
                TG phải hồi TB
              </th>
            </thead>
            <tbody class="text-center">
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.customer }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.customer_has_phone }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.call_log }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.total_order }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.rate_order }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.order_success }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.order_return }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.revenue }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.fee }}
              </td>
              <td class="py-[12px] border-[1px] border-l_grey">
                {{ results.result_employee.time_reply }}
              </td>
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
    <div class="pb-[50px] grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
      <div class="thong_tin_cong_viec">
        <fieldset
          class="fieldset-nav "
        >
          <legend
            class="w-auto mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
          >
            Thông tin công việc
          </legend>
          <div class="m-10 text-[14px]">
            <div class="pb-3 grid grid-cols-3 gap-8 items-center">
              <p class="col-span-1 font-semibold">Ngày bắt đầu làm việc</p>
              <div class="col-span-2 bg-l_grey rounded">
                <p class="px-5 py-2">{{ view.employees.work_first_date }}</p>
              </div>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 items-center">
              <p class="col-span-1 font-semibold">Nơi làm việc</p>
              <div class="col-span-2 bg-l_grey rounded">
                <p class="px-5 py-2">{{ addresses.x }}</p>
              </div>
            </div>
            <div class="py-3">
              <p class="col-span-1 font-semibold">Thời gian làm việc</p>
              <div
                v-if="view.employees.work_time_repeats != 0"
                v-for="(timeWork, id) in view.employees.work_time_repeats"
                :key="id"
              >
                <div
                  class="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1"
                >
                  <div class="m-2 flex items-center">
                    <span class="font-semibold pr-2">{{ id + 1 }}</span>
                    <span>Từ</span>
                    <div
                      class="mx-2 py-2 px-4 w-[200px] text-l_gray border border-l_gray flex justify-between rounded"
                    >
                      <span>{{ timeWork.start_time }}</span>
                      <p><i class="fa-regular fa-clock"></i></p>
                    </div>
                  </div>
                  <div class="m-2 flex items-center">
                    <span>đến</span>
                    <div
                      class="mx-4 py-2 px-4 w-[200px] text-l_gray border border-l_gray flex justify-between rounded"
                    >
                      <span>{{ timeWork.end_time }}</span>
                      <p><i class="fa-regular fa-clock"></i></p>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div
                    class="thu_ngay_thang my-3 flex"
                    v-for="index in view.time_work"
                  >
                    <div
                      class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                      :class="{ timeDay: timeWork.repeats.includes(index) }"
                    >
                      <span>{{ view.showWorkDay(index) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-3">
              <p class="col-span-1 font-semibold">Màn hình được sử dụng</p>
              <div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.sale"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Chats chốt đơn</span>
                </div>
                <div class="mx-8" v-if="view.isPage">
                  <div
                    class="pb-2 flex items-center relative"
                    v-for="item in page.listPage"
                  >
                    <div
                      class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                    ></div>
                    <div class="mr-2">
                      <img
                        :src="item.avatar"
                        alt=""
                        class="w-[30px] h-[30px] rounded-full"
                      />
                    </div>
                    <div>
                      <p>{{ item.name }}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="chats-chot-don-items mx-8 pb-2"
                  v-if="view.screen.sale"
                >
                  <div
                    class="pb-2 flex items-center relative"
                    v-for="item in view.employees.pages.shop_pages"
                  >
                    <div
                      class="absolute top-[3px] rounded"
                      v-if="item.noti_mode == 1"
                    >
                      <img
                        src="../assets/l_checked.jpg"
                        alt=""
                        style="width: 25px; height: 25px"
                      />
                    </div>
                    <div
                      class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                    ></div>
                    <div class="mr-2">
                      <img
                        :src="item.avatar"
                        alt=""
                        class="w-[30px] h-[30px] rounded-full"
                      />
                    </div>
                    <div>
                      <p>{{ item.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.chat_ops"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Chats vận hành</span>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.statistic"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Tổng quan (Tổng quan shop)</span>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.order"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Đơn hàng (Quản lý và đăng đơn GHTK)</span>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.customer"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Khách hàng (Quản lý và chăm sóc GHTK)</span>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.products"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)</span>
                </div>
                <div class="py-3 flex items-center relative">
                  <div
                    class="absolute top-[12px] rounded"
                    v-if="view.screen.staff"
                  >
                    <img
                      src="../assets/l_checked.jpg"
                      alt=""
                      style="width: 25px; height: 25px"
                    />
                  </div>
                  <div
                    class="w-[25px] h-[25px] border border-l_green rounded mr-5"
                  ></div>
                  <span>Nhân viên (Quản lí nhân viên)</span>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="lich_su_hoat_dong">
        <fieldset
          class="fieldset-nav "
        >
          <legend
            class="w-auto mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
          >
            Lịch sử hoạt động
          </legend>
          <div class="mx-10 mt-5">
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
              :class="{ clickBtn: history.isGreen == 1 }"
              @click="history.clickToDay(1)"
            >
              Hôm nay
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
              :class="{ clickBtn: history.isGreen == 2 }"
              @click="history.clickToWeek(2)"
            >
              Tuần này
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
              :class="{ clickBtn: history.isGreen == 3 }"
              @click="history.clickToMonth(3)"
            >
              Tháng này
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
              :class="{ clickBtn: history.isGreen == 4 }"
              @click="history.clickToOption()"
            >
              Tùy chọn
            </button>
          </div>
          <div
            class="scroll-bar mx-10 mb-10 mt-2 text-[14px] overflow-y-auto h-[450px]"
            v-if="history.isHCheck"
          >
            <div
              class="thoi_gian"
              v-for="date in history.arrayDate[0]"
              v-if="history.isHistory == 0"
            >
              <p class="px-2 font-semibold text-[16px]">
                {{ history.countDate(date) }} - {{ history.showDate(date) }}
              </p>
              <div
                class="lich_su_hoat_dong"
                v-for="act in history.activity_history"
              >
                <div
                  class="px-2 flex justify-between items-center"
                  v-if="act.time.slice(0, 10) == date"
                >
                  <div class="py-2">
                    <p>{{ act.time.split(" ").reverse().join(" ") }}</p>
                  </div>
                  <div>
                    <p>{{ act.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="thoi_gian"
              v-for="date in history.arrayDate[0]"
              v-if="history.isHistory != 0"
            >
              <p class="px-2 font-semibold text-[16px]">
                {{ history.countDate(date) }} - {{ history.showDate(date) }}
              </p>
              <div
                class="lich_su_hoat_dong"
                v-for="act in history.arrayToSearch"
              >
                <div
                  class="px-2 flex justify-between items-center"
                  v-if="act.time.slice(0, 10) == date"
                >
                  <div class="py-2">
                    <p>{{ act.time.split(" ").reverse().join(" ") }}</p>
                  </div>
                  <div>
                    <p>{{ act.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-center mb-5 mt-2 text-[16px]"
            v-if="history.isHCheck == false"
          >
            <p>Không có dữ liệu</p>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  <div class="thay_doi_thanh_cong" v-if="view.thongBaoThayDoi">
    <div
      class="w-1/3 p-2 text-white bg-l_green rounded-full text-center fixed bottom-10 left-1/3"
    >
      <p>Thay đổi trạng thái nhân viên thành công</p>
    </div>
  </div>
  <div class="click_tuy_chon_ket_qua" v-if="results.hienThiTuyChon">
    <div class="w-screen h-screen bg-black fixed top-0 opacity-70"></div>
    <div class="z-20 fixed top-[100px] left-1/3">
      <div class="py-3 bg-l_green text-center">
        <p class="text-white font-bold text-[18px]">Tùy chọn hiển thị</p>
      </div>
      <div class="bg-white flex justify-between">
        <div class="my-5 ml-5 mr-2 text-l_gray">
          <p class="font-semibold pb-1">Chọn ngày bắt đầu:</p>
          <input
            type="date"
            placeholder="Nhập ngày bắt đầu"
            class="w-[250px] py-1 pl-2 border border-l_gray rounded"
            v-model="results.selectDay"
          />
        </div>
        <div class="my-5 mr-5 ml-2 text-l_gray">
          <p class="font-semibold pb-1">Chọn ngày kết thúc:</p>
          <input
            type="date"
            placeholder="Nhập ngày kết thúc"
            class="w-[250px] py-1 pr-2 border border-l_gray rounded"
            v-model="results.selectDay2"
          />
        </div>
      </div>
      <div class="py-2 bg-white text-center">
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_green_light p-2 rounded text-white font-semibold"
            @click="results.clickXacNhanTuyChon(4, id)"
          >
            Xác nhận
          </button>
        </div>
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_gray p-2 rounded text-white font-semibold"
            @click="results.clickHuyBoTuyChon"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="click_tuy_chon_lich_su" v-if="history.hienThiTuyChon">
    <div class="w-screen h-screen bg-black fixed top-0 opacity-70"></div>
    <div class="z-20 fixed top-[100px] left-1/3">
      <div class="py-3 bg-l_green text-center">
        <p class="text-white font-bold text-[18px]">Tùy chọn hiển thị</p>
      </div>
      <div class="bg-white flex justify-between">
        <div class="my-5 ml-5 mr-2 text-l_gray">
          <p class="font-semibold pb-1">Chọn ngày bắt đầu:</p>
          <input
            type="date"
            placeholder="Nhập ngày bắt đầu"
            class="w-[250px] py-1 pl-2 border border-l_gray rounded"
            v-model="history.selectDay"
          />
        </div>
        <div class="my-5 mr-5 ml-2 text-l_gray">
          <p class="font-semibold pb-1">Chọn ngày kết thúc:</p>
          <input
            type="date"
            placeholder="Nhập ngày kết thúc"
            class="w-[250px] py-1 pr-2 border border-l_gray rounded"
            v-model="history.selectDay2"
          />
        </div>
      </div>
      <div class="py-2 bg-white text-center">
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_green_light p-2 rounded text-white font-semibold"
            @click="history.clickXacNhanTuyChon(4)"
          >
            Xác nhận
          </button>
        </div>
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_gray p-2 rounded text-white font-semibold"
            @click="history.clickHuyBoTuyChon"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="nhap_sai_ngay_ket_qua z-50" v-if="results.nhapNgaySai">
    <div
      class="w-1/3 p-2 text-white bg-l_red rounded-full text-center fixed bottom-10 left-1/3"
    >
      <p>Ngày bắt đầu không thể lớn hơn ngày kết thúc</p>
    </div>
  </div>
  <div class="nhap_sai_ngay_lich_su z-50" v-if="history.nhapNgaySai">
    <div
      class="w-1/3 p-2 text-white bg-l_red rounded-full text-center fixed bottom-10 left-1/3"
    >
      <p>Ngày bắt đầu không thể lớn hơn ngày kết thúc</p>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar::-webkit-scrollbar {
  width: 5px;
  background-color: white;
  border-radius: 20px;
}
.scroll-bar::-webkit-scrollbar-thumb {
  width: 5px;
  height: 30px;
  background-color: #aaaaaa;
  border-radius: 20px;
}
.scroll-bar-x::-webkit-scrollbar {
  height: 5px;
  background-color: white;
  border-radius: 20px;
}
.scroll-bar-x::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  background-color: #aaaaaa;
  border-radius: 20px;
}

.fieldset-nav {
  padding: 18px 30px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
    position: relative;
}

.clickBtn {
  background-color: #069255 !important;
  color: white !important;
}
.timeDay {
  background-color: #5eb891 !important;
  color: white !important;
}
</style>
