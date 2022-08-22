<template>
  <div>
    <div class="flex">
      <p class="title-time">{{ props.no + 1 }}. Từ</p>
      <a-time-picker
        v-model:value="useStoreInAddWorkTime.dataAddMain.start_time"
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
    <div>

      <input
        id="Checkbox2"
        v-model="useStoreInAddWorkTime.dataAddMain.work_time_repeats.repeats"
        type="checkbox"
        hidden
        name="thuhai"
        value="0"
      />
      <label for="Checkbox2"><span class="label-name">Thứ Hai</span></label>

      <input
        id="Checkbox3"
        v-model="useStoreInAddWorkTime.dataAddMain.work_time_repeats.repeats"
        type="checkbox"
        hidden
        name="thuba"
        value="1"
      />
      <label for="0"><span class="label-name">Thứ ba</span></label>
    </div>
    <!--        <a-checkbox-group class="mt-5" :options="labelCheckbox" />-->
    <!--    <ul>-->
    <!--      <li>-->
    <!--        <input-->
    <!--          id="Checkbox2"-->
    <!--          type="checkbox"-->
    <!--          hidden-->
    <!--          name="Checkbox2"-->
    <!--          value="Swimming"-->
    <!--        />-->
    <!--        <label for="Checkbox2"><span class="label-name">Swimming</span></label>-->
    <!--      </li>-->
    <!--    </ul>-->
  </div>
</template>
<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useAddMainStore } from "../../../../../stores/addMainStore.js";
const useStoreInAddWorkTime = useAddMainStore();
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
const props = defineProps(["index", "listWorkTime", "no"]);
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
  // console.log(index);
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
    // console.log(checkWorkTime)
    store.test = checkWorkTime;
    // console.log(store.test);
  } else {
    alert("phai nhap thoi gian");
  }
}
defineExpose({ handleGetValueCheckBox });
</script>
<style scoped>
@import "../css/AddWorkTime.css";
input[type="checkbox"] + label {
  display: inline-block;
  position: relative;
  border: 1px solid;
  border-radius: 40px;
  padding: 10px 40px;
  width: 10%;
  background: #eeeeee;
  font-weight: 600;
  font-size: 13px;
  color: #444;
  cursor: pointer;
}

input[type="checkbox"] + label:hover {
  background: #e4e4e4;
}

input[type="checkbox"]:checked + label {
  background: #003b46;
  color: #f0f0f0;
}
</style>
