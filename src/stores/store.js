import { defineStore } from "pinia";
import axios from "axios";
import { format } from "date-fns";
const date = new Date();
export const useStaffStore = defineStore({
  id: "staff",
  state: () => ({
    staff: [],
    status: [],
    datetime: "",
    isShow: 1,
    check: false,
  }),
  getters: {
    getSpecifiedStaff: (state) => state.staff,
  },
  actions: {
    async getStaff(start_date, end_date) {
      await axios
        .get(
          `https://x.ghtk.vn/api/v2/staff?start_date=${start_date}&end_date=${end_date}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
            },
          }
        )
        .then((res) => {
          this.staff = res.data.data;
          console.log(res.data.data);
        });
      console.log(start_date, end_date);
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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
            }
          }
        )
        .then((res) => {
          
          this.status = res.data;
          console.log(res.data);
        });
    },
    async clearStaff() {
      this.staff = [];
    },
    getDateTime() {       
      return format(date, "HH:mm");
    },

  },
});
