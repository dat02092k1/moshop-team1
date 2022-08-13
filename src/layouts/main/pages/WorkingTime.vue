<!--<template>-->
<!--  &lt;!&ndash;  <a-space>&ndash;&gt;-->
<!--  &lt;!&ndash;    <a-time-picker v-model="value" placeholder="Chọn thời gian" />&ndash;&gt;-->
<!--  &lt;!&ndash;    <p>đến</p>&ndash;&gt;-->
<!--  &lt;!&ndash;    <a-time-picker&ndash;&gt;-->
<!--  &lt;!&ndash;      v-model="strValue"&ndash;&gt;-->
<!--  &lt;!&ndash;      placeholder="Chọn thời gian"&ndash;&gt;-->
<!--  &lt;!&ndash;      value-format="HH:mm:ss"&ndash;&gt;-->
<!--  &lt;!&ndash;    />&ndash;&gt;-->
<!--  &lt;!&ndash;  </a-space>&ndash;&gt;-->
<!--  <a-time-picker v-model="value" />-->
<!--  <a-time-picker v-model="strValue" value-format="HH:mm:ss" />-->
<!--  <div class="repeatDate">-->
<!--    <label for="daychecked"> thu nam </label>-->
<!--    <input id="daychecked" type="checkbox" />-->
<!--  </div>-->
<!--</template>-->
<!--<script setup>-->
<!--import moment from "moment";-->
<!--import { defineExpose, ref, watch } from "vue";-->
<!--const value = ref(moment("08:00:00", "HH:mm:ss"));-->
<!--const strValue = ref("09:00:00");-->
<!--watch(value, () => {-->
<!--  console.log(value.value);-->
<!--});-->
<!--watch(strValue, () => {-->
<!--  console.log(strValue.value);-->
<!--});-->
<!--defineExpose(value, strValue, moment);-->

<!--// import dayjs from "dayjs";-->
<!--// import { ref, watch } from "vue";-->
<!--//-->
<!--// const value = ref(dayjs("08:00:00", "HH:mm:ss"));-->
<!--// const strValue = ref("09:00:00");-->
<!--// // const isValidTime = ref();-->
<!--// watch(value, () => {-->
<!--//   console.log(value.value);-->
<!--// });-->
<!--// watch(strValue, () => {-->
<!--//   console.log(strValue.value);-->
<!--// });-->
<!--// defineExpose(value, strValue);-->
<!--</script>-->
<!--<style scoped>-->
<!--:deep(div.ant-picker) {-->
<!--  width: 150px;-->
<!--}-->
<!--</style>-->
<template>
  <!--  <input ref="inputFileHere" type="file" style="display: none" />-->
  <!--  <button class="btn-choosefile" @click="handleClick()">chon anh</button>-->
  <div v-for="(mang, index) in mangRong" :key="index">
    <input
      style="width: 200px; height: 40px; border: 1px solid red"
      type="text"
      placeholder="viet vao day"
      :name="`mangRong[${index}][tenInput]`"
    />
  </div>
  <button class="btn-Click" @click="handleClick">add</button>
</template>
<script setup>
import { ref } from "vue";
import { reactive } from "vue";
// import { reactive } from "vue";

let mangRong = ref({
  tenInput: "",
});
function handleClick() {
  mangRong.value.tenInput.push(
    reactive({
      tenInput: "",
    })
  );
}
// const inputFileHere = ref(null);
// function handleClick() {
//   inputFileHere.value.click();
// }
</script>
<style>
.btn-Click {
  background-color: #069255;
  padding: 10px;
  color: white;
}
</style>
