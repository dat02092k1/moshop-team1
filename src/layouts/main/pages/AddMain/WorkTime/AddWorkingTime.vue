<template>
  <div>
    <div class="flex">
      <p class="title-time">Từ</p>
      <!--    <a-time-picker v-model:value="value" value-format="HH:mm:ss" />-->
      <a-time-picker
        v-model:value="value"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
      />
      <p class="title-time">đến</p>
      <a-time-picker
        v-model:value="strValue"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
      />
      <button class="btn-delete-working-time">Xoá</button>
    </div>
    <a-checkbox-group
      class="mt-5"
      :checked="state.checked"
      :options="dateOptions"
      @change="handleClick"
    />
  </div>
</template>
<script setup>
// import AddWorkTime from "./AddWorkTime.vue";
// import DateWorking from "./DateWorking.vue";
import { reactive, ref, watch } from "vue";
// const props = defineProps(
//   ["isShowAddWorkingTime"]
// );
const value = ref();
// const value = ref(moment("00:00:00", "HH:mm:ss"));
const strValue = ref();
watch(value, () => {
  console.log(value.value);
});
watch(strValue, () => {
  console.log(strValue.value);
});
let dateOptions = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm ",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];
function handleClick(e) {
  console.log(e);
  // console.log("updateOptions", upDateOption);
}
const state = reactive({
  indeterminate: true,
  // checked: {
  //   thuHai: false,
  //   thuBa: false,
  //   thuTu: false,
  //   thuNam: false,
  //   thuSau: false,
  //   thuBay: false,
  //   chuNhat: false,
  // },
});
</script>
<style scoped>
.btn-delete-working-time {
  color: red;
  cursor: pointer;
}
:deep(.ant-checkbox-inner) {
  display: none;
}
:deep(.ant-checkbox + span) {
  border: 1px solid #069255;
  padding: 2px 8px;
  border-radius: 15px;
}
</style>
