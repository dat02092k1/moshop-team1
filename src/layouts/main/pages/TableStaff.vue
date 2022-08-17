<template>
  <a-table :columns="columns" :data-source="useStaff.staff" @change="onChange">
    <template slot="img-column" >
      <div>
        HEH
        <img src="https://cdn.trangcongnghe.vn/uploads/posts/2017-08/heart-shaped-boob-challenge-trao-luu-moi-noi-cua-cac-co-nang-nong-bong_1.jpg" >
      </div>
    </template>
  </a-table>
</template>
<script setup>
import { useStaffStore } from "../../../stores/store.js";
import { ref, onMounted } from "vue";
import StaffOnly from "./StaffOnly.vue";
const useStaff = useStaffStore();

onMounted(async () => {
  await useStaff.getStaff();
  //console.log(useStaff.staff);
});
const columns = [
  {
    title: "Nhân viên",
    // dataIndex: "avatar",
    key: "avatar",
    scopedSlots: { customRender: "img-column" },
    // customCell: StaffOnly(),
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "KH tương tác",
    dataIndex: ["work_result", "customer"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "KH có sđt",
    dataIndex: ["work_result", "customer_has_phone"],
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "KH đã gọi",
    dataIndex: ["work_result", "call_log"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "ĐH đã chốt",
    dataIndex: ["work_result", "customer_deal"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Tỷ lệ chốt",
    dataIndex: ["work_result", "rate_order"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "ĐH thành công",
    dataIndex: ["work_result", "order_success"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "ĐH hoàn",
    dataIndex: ["work_result", "order_return"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Doanh thu",
    dataIndex: ["work_result", "revenue"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Phí hoàn",
    dataIndex: ["work_result", "fee"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "TG phản hồi trung bình",
    dataIndex: ["work_result", "time_reply"],
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
];
 
</script>
