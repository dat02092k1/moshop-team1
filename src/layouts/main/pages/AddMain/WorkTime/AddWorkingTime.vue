<template>
  <div>
    <div class="flex">
      <p class="title-time mr-2">{{ props.no + 1 }}. Từ</p>
      <a-time-picker
        v-model:value="timeStartWork"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
        style="width: 40%;height: 40px"
        class="mr-3"
      />
      <p class="title-time mr-4 mt-3">đến</p>
      <a-time-picker
        v-model:value="timeEndWork"
        value-format="HH:mm:ss"
        placeholder="Chọn thời gian"
        style="width: 50%;height: 40px"
        class="mr-3"
      />
      <button
        class="btn-delete-working-time text-red-500"
        @click="handleDeleteCompWorkTime(index)"
      >
        Xoá
      </button>
    </div>
    <div>
      <ul class="flex mt-2 ml-7">
        <li class="input-item">
          <input type="checkbox" hidden value="0" /><label>Thứ hai</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="1" /><label>Thứ Ba</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="2" /><label>Thứ Tư</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="3" /><label>Thứ Năm</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="4" /><label>Thứ Sáu</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="5" /><label>Thứ Bảy</label>
        </li>
        <li class="input-item">
          <input type="checkbox" hidden value="6" /><label>Chủ Nhật</label>
        </li>
      </ul>
    </div>
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
    // store.test = checkWorkTime;
    // console.log(store.test);
  } else {
    alert("phai nhap thoi gian");
  }
}
defineExpose({ handleGetValueCheckBox });
</script>
<style scoped>
.input-item {
  margin-right: 5px;
  border: 1px solid #069255;
  padding: 4px 10px;
  border-radius: 20px;
}

input[type="checkbox"]:checked + label {
  background-color: #ff5d5d;
}
@import "../css/AddWorkTime.css";
/*input[type="checkbox"] + label {*/
/*  display: inline-block;*/
/*  position: relative;*/
/*  border: 1px solid;*/
/*  border-radius: 40px;*/
/*  padding: 10px 40px;*/
/*  width: 10%;*/
/*  background: #eeeeee;*/
/*  font-weight: 600;*/
/*  font-size: 13px;*/
/*  color: #444;*/
/*  cursor: pointer;*/
/*}*/

/*input[type="checkbox"] + label:hover {*/
/*  background: #e4e4e4;*/
/*}*/

/*input[type="checkbox"]:checked + label {*/
/*  background: #003b46;*/
/*  color: #f0f0f0;*/
/*}*/
</style>
