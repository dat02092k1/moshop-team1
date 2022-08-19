<template>
  <div>Change status staff</div>
</template>

<script setup>
import { useAddMainStore } from "../../../../stores/counter.js";
// import axios from 'axios'
// import {onMounted} from "vue";
// import TOKEN from "../../../../service/AllApi";
const store = useAddMainStore();
console.log(store.$reset());
// const api_getListPlace =
//     "https://x.ghtk.vn/api/fulfilment/v1/shops/get-pick-addresses";
// onMounted(async () => {
//   try {
//     const list = await axios.get(api_getListPlace, {
//       headers: {
//         Authorization: "Bearer " + TOKEN.TOKEN,
//       },
//     });
//     list.data.data.forEach((value) => {
//       getListWorkPlace.value.push(value);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
</script>

<style scoped></style>
