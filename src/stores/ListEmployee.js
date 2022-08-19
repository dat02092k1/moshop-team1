import { defineStore } from "pinia";
import axios from "axios";
const api_url =
  "https://x.ghtk.vn/api/v2/staff/detail?shop_user_id=2251840c-99c7-42a8-b703-84ea1701bce4";
export const employeeStore = defineStore({
  id: "employee",
  state: () => {
    [];
  },
  getters: {
    listEmployees: (state) => state.users,
  },
  actions: {
    async getEmployee() {
      try {
        const reponse = await axios.get(`${api_url}`, {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IiJ9.eyJ0b2tlbiI6IjNkZDU5ZWE5MDgyYWQ5ODYyYWVmYTczYTE0OTE2ZDJlN2JmN2YxYjdhZWRiMmNlZGQxMThkZDg5YzQ3ODg3MmQiLCJleHBpcmVkX2F0IjoiMjAyMS0wOC0xOVQwNTozNzozOC41MTA0MzBaIiwibW9fdGVsIjoiODQzNTYyNjIxMjEiLCJtb19yb2xlIjoiYWRtaW4iLCJtb191c2VybmFtZSI6ImhuY3A3QGdtYWlsLmNvbSJ9.M7U2RSNivrc0wFDhmXiOJgvhj2oH6AGNVNGxJ1OxDvA",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.employees = reponse.data.data;
        console.log(reponse);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
