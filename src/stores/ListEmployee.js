import { defineStore } from "pinia";
import axios from "axios";
import { authToken } from "../constant";
import {
  addDays,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  format,
  formatDistanceToNow,
  compareAsc,
} from "date-fns";
import viLocale from "date-fns/locale/vi";

// lấy thông tin nhân viên
const api_url_info = "https://x.ghtk.vn/api/v2/staff/detail?shop_user_id=";
// const id = '43aaa969-a97b-46a7-8e96-abd80560bcfe';

export const employeeStore = defineStore({
  id: "employee",
  state: () => ({
    employees: [],
    anHienTrangThai: false,
    thongBaoThayDoi: false,
    screen: {
      order: false,
      chat_ops: false,
      statistic: false,
      customer: false,
      staff: false,
      sale: false,
      products: false,
    },
    time_work: [0, 1, 2, 3, 4, 5, 6],
    isPage: false,
  }),
  actions: {
    async getEmployee(id) {
      try {
        const reponse = await axios.get(`${api_url_info}${id}`, {
          headers: {
            authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.employees = reponse.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    clickTrangThai() {
      this.anHienTrangThai = !this.anHienTrangThai;
    },
    thayDoiTrangThai(a, id) {
      this.changeStatus(a, id);
      this.employees.active = a;
      this.anHienTrangThai = !this.anHienTrangThai;
      this.thongBaoThayDoi = !this.thongBaoThayDoi;
      setTimeout(() => {
        this.thongBaoThayDoi = !this.thongBaoThayDoi;
      }, 1500);
    },
    showWorkDay(number) {
      switch (number) {
        case 0:
          return "Thứ 2";
        case 1:
          return "Thứ 3";
        case 2:
          return "Thứ 4";
        case 3:
          return "Thứ 5";
        case 4:
          return "Thứ 6";
        case 5:
          return "Thứ 7";
        default:
          return "Chủ nhật";
      }
    },
    async changeStatus(shop_user_id, status) {
      await axios
        .post(
          "https://x.ghtk.vn/api/v2/staff/set-status",
          {
            shop_user_id: shop_user_id,
            status: status,
          },
          {
            headers: {
              authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
            },
          }
        )
        .then((res) => {
          this.status = res.data;
        });
    },
    checkIsPage() {
      if (this.employees.pages.shop_pages.length == 0) {
        this.isPage = true;
      }
    },
  },
});

// lấy kết quả công việc của nhân viên
const date = new Date();
const tmr = format(addDays(date, 1), "dd-MM-yyyy");
const startWeek = format(startOfWeek(date), "dd-MM-yyyy");
const endWeek = format(endOfWeek(date), "dd-MM-yyyy");
const startMonth = format(startOfMonth(date), "dd-MM-yyyy");
const endMonth = format(endOfMonth(date), "dd-MM-yyyy");

export const resultEmployeeStore = defineStore({
  id: "result",
  state: () => ({
    result_employee: [],
    isGreenSelect: 1,
    day: tmr,
    day2: tmr,
    hienThiTuyChon: false,
    selectDay: "",
    selectDay2: "",
    isGreen: 0,
    isSelect: 0,
    nhapNgaySai: false,
  }),
  actions: {
    async getResultEmployee(id) {
      try {
        const reponse = await axios.get(
          `https://x.ghtk.vn/api/v2/staff/get-work-result?start_date=${this.day}?end_date=${this.day2}&shop_user_id=${id}`,
          {
            headers: {
              authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        this.result_employee = reponse.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    clickBtnDay(a) {
      this.isGreenSelect = a;
    },
    clickBtnWeek(a, id) {
      this.isGreenSelect = a;
      this.day = startWeek;
      this.day2 = endWeek;
      this.getResultEmployee(id);
    },
    clickBtnMonth(a, id) {
      this.isGreenSelect = a;
      this.day = startMonth;
      this.day2 = endMonth;
      this.getResultEmployee(id);
    },
    // PopUp tùy chọn
    clickTuyChon(a) {
      this.hienThiTuyChon = !this.hienThiTuyChon;
      this.isSelect = a;
    },
    clickXacNhanTuyChon(a, id) {
      if (
        compareAsc(new Date(this.selectDay), new Date(this.selectDay2)) == 1
      ) {
        this.nhapNgaySai = true;
        setTimeout(() => {
          this.nhapNgaySai = false;
        }, 3000);
        return;
      }

      this.day = this.selectDay;
      this.day2 = this.selectDay2;
      this.getResultEmployee(id);
      if (this.isSelect == 1) {
        this.isGreenSelect = a;
      }
      if (this.isSelect == 2) {
        this.isGreen = a;
      }
      this.hienThiTuyChon = !this.hienThiTuyChon;
    },
    clickHuyBoTuyChon() {
      this.hienThiTuyChon = !this.hienThiTuyChon;
    },
    clickBtn(a) {
      this.isGreen = a;
    },
  },
});

// lấy lịch sử hoạt động của nhân viên
const api_url_history =
  "https://x.ghtk.vn/api/v2/staff/get-history-action?page=1&limit=30&shop_user_id=";

export const historyEmployeeStore = defineStore({
  id: "history",
  state: () => ({
    activity_history: [],
    arrayAllDate: [],
    arrayDate: [],
    arrayToSearch: [],
    isGreen: 0,
    isHistory: 0,
    isHCheck: true,
    hienThiTuyChon: false,
    selectDay: "",
    selectDay2: "",
    nhapNgaySai: false,
  }),
  actions: {
    async getHistory(id) {
      try {
        const reponse = await axios.get(`${api_url_history}${id}`, {
          headers: {
            authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.activity_history = reponse.data.data;
        if (this.activity_history.length == 0) {
          this.isHCheck == false;
        }
        this.activity_history.map((state) => {
          this.arrayAllDate.push(state.time.slice(0, 10));
        });
        this.arrayDate.push(Array.from(new Set(this.arrayAllDate)));
      } catch (error) {
        console.log(error);
      }
    },
    countDate(day) {
      return formatDistanceToNow(new Date(day), {
        locale: viLocale,
        addSuffix: true,
      });
    },
    showDate(day) {
      return format(new Date(day), "PPPP", { locale: viLocale });
    },
    clickToDay(a) {
      this.arrayToSearch = [];
      this.activity_history.map((state) => {
        const dateState = new Date(state.time.slice(0, 10));
        const now = addDays(date, 1);
        // so sánh xem ngày 1 có đứng sau ngày 2 hay không
        const kq = compareAsc(dateState, now);
        if (kq == 0) {
          this.arrayToSearch.push(state);
        }
      });

      this.arrayToSearch.map((state) => {
        this.arrayAllDate.push(state.time.slice(0, 10));
      });
      this.arrayDate.push(Array.from(new Set(this.arrayAllDate)));

      this.isGreen = a;
      this.isHistory = a;
      this.arrayToSearch.length == 0
        ? (this.isHCheck = false)
        : (this.isHCheck = 1);
    },
    clickToWeek(a) {
      this.arrayToSearch = [];
      this.activity_history.map((state) => {
        const dateState = new Date(state.time.slice(0, 10));
        const start_to_Week = startOfWeek(date);
        const weekend = endOfWeek(date);

        const kq = compareAsc(dateState, start_to_Week);
        const kq2 = compareAsc(dateState, weekend);
        if (
          (kq == 1 && kq2 == -1) ||
          (kq == 1 && kq2 == 0) ||
          (kq == 0 && kq2 == -1) ||
          (kq == 0 && kq2 == 0)
        ) {
          this.arrayToSearch.push(state);
        }
      });

      this.arrayToSearch.map((state) => {
        this.arrayAllDate.push(state.time.slice(0, 10));
      });
      this.arrayDate.push(Array.from(new Set(this.arrayAllDate)));

      this.isGreen = a;
      this.isHistory = a;
      this.arrayToSearch.length == 0
        ? (this.isHCheck = false)
        : (this.isHCheck = 1);
    },
    clickToMonth(a) {
      this.arrayToSearch = [];
      this.activity_history.map((state) => {
        const dateState = new Date(state.time.slice(0, 10));
        const start_to_Month = startOfMonth(date);
        const last_to_Month = endOfMonth(date);

        const kq = compareAsc(dateState, start_to_Month);
        const kq2 = compareAsc(dateState, last_to_Month);
        if (
          (kq == 1 && kq2 == -1) ||
          (kq == 1 && kq2 == 0) ||
          (kq == 0 && kq2 == -1) ||
          (kq == 0 && kq2 == 0)
        ) {
          this.arrayToSearch.push(state);
        }
      });

      this.arrayToSearch.map((state) => {
        this.arrayAllDate.push(state.time.slice(0, 10));
      });
      this.arrayDate.push(Array.from(new Set(this.arrayAllDate)));

      this.isGreen = a;
      this.isHistory = a;
      this.arrayToSearch.length == 0
        ? (this.isHCheck = false)
        : (this.isHCheck = 1);
    },
    clickToOption() {
      this.hienThiTuyChon = true;
    },
    clickXacNhanTuyChon(a) {
      if (
        compareAsc(new Date(this.selectDay), new Date(this.selectDay2)) == 1
      ) {
        this.nhapNgaySai = true;
        setTimeout(() => {
          this.nhapNgaySai = false;
        }, 3000);
        return;
      }

      this.arrayToSearch = [];
      this.arrayAllDate = [];
      this.arrayDate = [];

      this.activity_history.map((state) => {
        const dateState = new Date(state.time.slice(0, 10));
        const day = new Date(this.selectDay);
        const day2 = new Date(this.selectDay2);

        const kq = compareAsc(dateState, day);
        const kq2 = compareAsc(dateState, day2);
        if (
          (kq == 1 && kq2 == -1) ||
          (kq == 1 && kq2 == 0) ||
          (kq == 0 && kq2 == -1) ||
          (kq == 0 && kq2 == 0)
        ) {
          this.arrayToSearch.push(state);
        }
      });
      this.arrayToSearch.map((state) => {
        this.arrayAllDate.push(state.time.slice(0, 10));
      });
      this.arrayDate.push(Array.from(new Set(this.arrayAllDate)));

      this.isHistory = a;
      this.isGreen = a;
      this.arrayToSearch.length == 0
        ? (this.isHCheck = false)
        : (this.isHCheck = 1);
      this.hienThiTuyChon = false;
    },
    clickHuyBoTuyChon() {
      this.hienThiTuyChon = false;
    },
  },
});

// lấy thông tin nơi làm việc
const api_url_address =
  "https://x.ghtk.vn/api/fulfilment/v1/shops/get-pick-addresses";

export const listAddressStore = defineStore({
  id: "address",
  state: () => ({
    address: [],
    x: "",
  }),
  actions: {
    async getAddress() {
      try {
        const reponse = await axios.get(`${api_url_address}`, {
          headers: {
            authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.address = reponse.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// lấy thông tin page
const api_url_page = "https://wh.ghtk.vn/api/v3/page/get-all-page-by-shop-code";

export const listPageStore = defineStore({
  id: "listPage",
  state: () => ({
    listPage: [],
  }),
  actions: {
    async getPage() {
      try {
        const reponse = await axios.get(`${api_url_page}`, {
          headers: {
            authorization: `Bearer ${authToken.ACCESS_TOKEN}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.listPage = reponse.data.data.pages;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
