import { defineStore } from "pinia";
import axios from "axios";
export const useStaffStore = defineStore({
  id: "staff",
  state: () => ({
    staff: [],
  }),

  actions: {
    async getStaff() {
      await axios
        .get(
          "https://x.ghtk.vn/api/v2/staff?start_date=2021-07-20&end_date=2021-07-20",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA`,
            },
          }
        )
        .then((res) => {
          this.staff = res.data.data;
          //console.log(this.staff);
        });
    },
  },
});
