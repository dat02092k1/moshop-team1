<template>
  <div>
    <div class="flex">
      <p class="title-time">{{ props.index + 1 }}. Từ</p>
      <a-time-picker
        v-model:value="timeStartWork"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
        style="width: 30%"
      />
      <p class="title-time">đến</p>
      <a-time-picker
        v-model:value="timeEndWork"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
        style="width: 50%"
      />
      <button
        class="btn-delete-working-time"
        @click="handleDeleteCompWorkTime(index)"
      >
        Xoá
      </button>
    </div>
    <a-checkbox-group
      class="mt-5"
      :options="labelCheckbox"
      @change="handleGetValueCheckBox"
    />
  </div>
</template>
<script setup>
import { reactive, ref, watchEffect } from "vue";
const timeStartWork = ref();
const timeEndWork = ref();
let checkWorkTime = reactive([]);
const workTimeRepeats = ref({
  index: props.index,
  start_time: null,
  end_time: null,
  repeats: [],
});
const dateWorkWait = reactive([]);
const props = defineProps(["index", "listWorkTime", "sendId"]);
const emit = defineEmits([
  "emitHandleDeleteCompWorkTime",
  "sendTimeWork",
  "sendRepeatDate",
]);

let dateOptions = {
  "Thứ Hai": 0,
  "Thứ Ba": 1,
  "Thứ Tư": 2,
  "Thứ Năm ": 3,
  "Thứ Sáu": 4,
  "Thứ Bảy": 5,
  "Chủ Nhật": 6,
};
const labelCheckbox = Object.keys(dateOptions);

function handleDeleteCompWorkTime(index) {
  emit("emitHandleDeleteCompWorkTime", index);
  // console.log(index)
}
watchEffect(() => {
  if (timeStartWork.value !== undefined && timeEndWork.value !== undefined) {
    if (timeStartWork.value < timeEndWork.value) {
      workTimeRepeats.value.start_time = timeStartWork.value;
      workTimeRepeats.value.end_time = timeEndWork.value;
    } else {
      alert(false);
    }
  }
});
// const fillterTime = ref([]);
function handleGetValueCheckBox(e) {
  dateWorkWait.push(e);
  const alEnd = dateWorkWait.length - 1;
  const newWork = dateWorkWait[alEnd].map((date) => {
    return dateOptions[date];
  });
  if (timeStartWork.value !== undefined && timeEndWork.value !== undefined) {
    workTimeRepeats.value.repeats = newWork;
    // console.log(workTimeRepeats.value); //work_time_repeats data ok
    checkWorkTime = workTimeRepeats.value;
  } else {
    alert("phai nhap thoi gian");
  }
}

console.log(checkWorkTime)
</script>
<style scoped>
.btn-delete-working-time {
  color: red;
  cursor: pointer;
  margin-left: 10px;
}
:deep(.ant-picker) {
  width: 30%;
}
/*:deep(.ant-checkbox-inner) {*/
/*  display: none;*/
/*}*/
:deep(.ant-checkbox + span) {
  border: 1px solid #069255;
  padding: 2px 8px;
  border-radius: 15px;
}
.title-time {
  margin: 10px 5px;
}
</style>
