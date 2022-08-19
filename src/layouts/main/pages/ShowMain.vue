<template>
  <div>
    <div>
      <a-layout>
        <a-layout-content>
          <!-- <a-table :columns="columns" :data-source="data" @change="handleChange" /> -->
          <div class="staff-manage">
            <div class="table-container">
              <table class="table ml-auto mr-auto">
                <thead>
                  <tr>
                    <th scope="col">Nhân viên</th>
                    <th scope="col">KH tương tác</th>
                    <th scope="col">KH có SĐT</th>
                    <th scope="col">KH đã gọi</th>
                    <th scope="col">KH đã chốt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="index"
                    v-for="(staff_item, index) of staff_items.staff">
                    <td>{{ staff_item.id }}</td>
                    <td>{{ staff_item.fullname }}</td>
                    <td>{{ staff_item.work_result.customer }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useStaffStore } from "../../../stores/store.js";
// const getCusData = reactive({
//   customers: [],
// });

// const customer = ref([]);

const staff_items = useStaffStore();

onMounted(() => {
  staff_items.getStaff();
  console.log(staff_items.getStaff().data);
});
// getCustomers();
</script>
