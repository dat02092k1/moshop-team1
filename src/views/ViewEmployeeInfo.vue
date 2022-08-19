<script>
import { ref, onMounted } from "vue";

// const listEmployee = EmployeeStore();

// onMounted(() => {
//   listEmployee.getEmployee();
// });

export default {
  data() {
    return {
      trangthai: "3",
      anHienTrangThai: false,
      thongBaoThayDoi: false,
      hienThiTuyChon: false,
    };
  },
  created() {},
  methods: {
    // Thay đổi trạng thái hoạt động
    clickTrangThai() {
      this.anHienTrangThai = !this.anHienTrangThai;
    },
    thayDoiTrangThai(a) {
      this.trangthai = a;
      this.anHienTrangThai = !this.anHienTrangThai;
      this.thongBaoThayDoi = !this.thongBaoThayDoi;
      setTimeout(() => {
        this.thongBaoThayDoi = !this.thongBaoThayDoi;
      }, 1500);
    },
    // PopUp tùy chọn
    clickTuyChon() {
      this.hienThiTuyChon = !this.hienThiTuyChon;
    },
    clickXacNhanTuyChon() {
      this.hienThiTuyChon = !this.hienThiTuyChon;
    },
    clickHuyBoTuyChon() {
      this.hienThiTuyChon = !this.hienThiTuyChon;
    },
  },
};
</script>
<template>
  <div class="m-5">
    <div class="trang_thai flex justify-between relative">
      <div class="py-5">
        <a href=""
          ><img
            src="https://moshop.com.vn/_nuxt/img/caret-left-green.977777e.svg"
        /></a>
      </div>
      <div>
        <div class="avt_employee flex justify-center">
          <img
            src=""
            alt="avt"
            class="w-[128px] h-[128px] border-0 border-red rounded-full"
          />
        </div>
        <div class="py-2 font-bold text-xl">
          <span class="name_employee">HuongCM</span>
          <span> / </span>
          <span class="phone_employee">84902046214</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold">Trạng thái</span>
          <div>
            <button
              v-if="trangthai == 1"
              class="mx-5 px-5 py-1 text-l_green border border-l_green rounded-full"
              @click="clickTrangThai()"
            >
              <span>Đang làm việc</span>
              <a class="pl-2"><i class="fa-solid fa-angle-down"></i></a>
            </button>
            <button
              v-else-if="trangthai == 2"
              class="mx-5 px-5 py-1 text-l_orange border border-l_orange rounded-full"
              @click="clickTrangThai()"
            >
              <span>Nghỉ tạm thời</span>
              <a class="pl-2"><i class="fa-solid fa-angle-down"></i></a>
            </button>
            <button
              v-else
              class="mx-5 px-5 py-1 text-l_red border border-l_red rounded-full"
              @click="clickTrangThai()"
            >
              <span>Đã nghỉ việc</span>
              <a class="pl-2"><i class="fa-solid fa-angle-down"></i></a>
            </button>
          </div>
        </div>
        <div
          v-if="anHienTrangThai"
          class="z-10 p-5 text-[16px] font-semibold bg-white fixed top-[160px] left-[570px] border-2 border-l_grey rounded-[14px] shadow-lg"
        >
          <table>
            <tr class="h-[40px]" @click="thayDoiTrangThai(1)">
              <td>
                <img
                  v-if="trangthai == 1"
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
                />
              </td>
              <td>Đang làm việc</td>
            </tr>
            <tr class="h-[40px]" @click="thayDoiTrangThai(2)">
              <td>
                <img
                  v-if="trangthai == 2"
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
                />
              </td>
              <td>Nghỉ việc tạm thời</td>
            </tr>
            <tr class="h-[40px]" @click="thayDoiTrangThai(3)">
              <td>
                <img
                  v-if="trangthai == 3"
                  src="https://moshop.com.vn/_nuxt/img/check-circle-green.af1a7f4.svg"
                  alt=""
                  class="mr-3"
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
    <div class="ket_qua_cong_viec my-10">
      <fieldset class="border-2 border-l_grey rounded-[18px] shadow-md">
        <legend
          class="mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
        >
          Kết quả công việc
        </legend>
        <div class="mx-10 my-5">
          <button
            class="mr-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
          >
            Hôm nay
          </button>
          <button
            class="mr-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
          >
            Tuần này
          </button>
          <button
            class="mr-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
          >
            Tháng này
          </button>
          <button
            class="mr-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            @click="clickTuyChon"
          >
            Tùy chọn
          </button>
        </div>
        <div class="mx-10 my-8 text-[14px]">
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
              <td class="py-[12px] border-[1px] border-l_grey">1</td>
              <td class="py-[12px] border-[1px] border-l_grey">2</td>
              <td class="py-[12px] border-[1px] border-l_grey">3</td>
              <td class="py-[12px] border-[1px] border-l_grey">4</td>
              <td class="py-[12px] border-[1px] border-l_grey">5</td>
              <td class="py-[12px] border-[1px] border-l_grey">6</td>
              <td class="py-[12px] border-[1px] border-l_grey">7</td>
              <td class="py-[12px] border-[1px] border-l_grey">8</td>
              <td class="py-[12px] border-[1px] border-l_grey">9</td>
              <td class="py-[12px] border-[1px] border-l_grey">10</td>
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
    <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
      <div class="thong_tin_cong_viec">
        <fieldset class="border-2 border-l_grey rounded-[18px] shadow-md">
          <legend
            class="mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
          >
            Thông tin công việc
          </legend>
          <div class="m-10 text-[14px]">
            <div class="pb-3 grid grid-cols-3 gap-8 items-center">
              <p class="col-span-1 font-semibold">Ngày bắt đầu làm việc</p>
              <div class="col-span-2 bg-l_grey rounded">
                <p class="px-5 py-2">abc</p>
              </div>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 items-center">
              <p class="col-span-1 font-semibold">Nơi làm việc</p>
              <div class="col-span-2 bg-l_grey rounded">
                <p class="px-5 py-2">Đường Phúc Diễn, Quận Từ Liêm, Hà Nội</p>
              </div>
            </div>
            <div class="py-3">
              <p class="col-span-1 font-semibold">Thời gian làm việc</p>
              <div class="flex">
                <div class="m-2 flex items-center">
                  <span class="font-semibold pr-2">1.</span>
                  <span>Từ</span>
                  <div
                    class="mx-2 py-2 px-4 w-[200px] text-l_gray border border-l_gray flex justify-between rounded"
                  >
                    <span>06:00:00</span>
                    <p><i class="fa-regular fa-clock"></i></p>
                  </div>
                </div>
                <div class="m-2 flex items-center">
                  <span>đến</span>
                  <div
                    class="mx-4 py-2 px-4 w-[200px] text-l_gray border border-l_gray flex justify-between rounded"
                  >
                    <span>06:00:00</span>
                    <p><i class="fa-regular fa-clock"></i></p>
                  </div>
                </div>
              </div>
              <div class="thu_ngay_thang my-3 flex">
                <div
                  class="text-white py-1 px-3 mr-2 bg-l_green_light rounded-full"
                >
                  <span>Thứ 2</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Thứ 3</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Thứ 4</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Thứ 5</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Thứ 6</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Thứ 7</span>
                </div>
                <div
                  class="text-l_gray py-1 px-3 mr-2 bg-white border border-l_gray rounded-full"
                >
                  <span>Chủ nhật</span>
                </div>
              </div>
            </div>
            <div class="py-3">
              <p class="col-span-1 font-semibold">Màn hình được sử dụng</p>
              <div>
                <div class="py-3 flex items-center">
                  <input
                    type="checkbox"
                    value=""
                    class="w-6 h-6 mr-5 checked:bg-l_green"
                  />
                  <span>Chats chốt đơn</span>
                </div>
                <div class="py-3 flex items-center">
                  <input type="checkbox" value="" class="w-6 h-6 mr-5" />
                  <span>Chats vận hành</span>
                </div>
                <div class="py-3 flex items-center">
                  <input
                    type="checkbox"
                    value=""
                    class="w-6 h-6 mr-5 checked:bg-l_green"
                  />
                  <span>Tổng quan (Tổng quan shop)</span>
                </div>
                <div class="py-3 flex items-center">
                  <input type="checkbox" value="" class="w-6 h-6 mr-5" />
                  <span>Đơn hàng (Quản lý và đăng đơn GHTK)</span>
                </div>
                <div class="py-3 flex items-center">
                  <input type="checkbox" value="" class="w-6 h-6 mr-5" />
                  <span>Khách hàng (Quản lý và chăm sóc GHTK)</span>
                </div>
                <div class="py-3 flex items-center">
                  <input type="checkbox" value="" class="w-6 h-6 mr-5" />
                  <span>Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)</span>
                </div>
                <div class="py-3 flex items-center">
                  <input type="checkbox" value="" class="w-6 h-6 mr-5" />
                  <span>Nhân vật (Quản lí nhân viên)</span>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="lich_su_hoat_dong">
        <fieldset class="border-2 border-l_grey rounded-[18px] shadow-md">
          <legend
            class="mx-10 px-[20px] py-[6px] font-semibold text-[16px] border"
          >
            Lịch sử hoạt động
          </legend>
          <div class="mx-10 my-5">
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            >
              Hôm nay
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            >
              Tuần này
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
            >
              Tháng này
            </button>
            <button
              class="mr-5 mb-5 px-[20px] py-[4px] text-[16px] rounded-[18px] text-l_green bg-l_grey"
              @click="clickTuyChon"
            >
              Tùy chọn
            </button>
          </div>
          <div class="m-10 text-[14px]">
            <div class="thoi_gian font-semibold">Thời gian</div>
            <div class="lich_su_hoat_dong">
              <div class="flex justify-between">
                <div class="flex">
                  <p>thời gian</p>
                  <p>ngày tháng</p>
                </div>
                <div>
                  <p>hành động</p>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  <div v-if="thongBaoThayDoi" class="thay_doi_thanh_cong">
    <div
      class="w-1/3 p-2 text-white bg-l_green rounded-full text-center fixed bottom-10 left-1/3"
    >
      <p>Thay đổi trạng thái nhân viên thành công</p>
    </div>
  </div>
  <div v-if="hienThiTuyChon" class="click_tuy_chon">
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
          />
        </div>
        <div class="my-5 mr-5 ml-2 text-l_gray">
          <p class="font-semibold pb-1">Chọn ngày kết thúc:</p>
          <input
            type="date"
            placeholder="Nhập ngày kết thúc"
            class="w-[250px] py-1 pr-2 border border-l_gray rounded"
          />
        </div>
      </div>
      <div class="py-2 bg-white text-center">
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_green_light p-2 rounded text-white font-semibold"
            @click="clickXacNhanTuyChon"
          >
            Xác nhận
          </button>
        </div>
        <div class="pb-2">
          <button
            class="w-2/3 bg-l_gray p-2 rounded text-white font-semibold"
            @click="clickHuyBoTuyChon"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
