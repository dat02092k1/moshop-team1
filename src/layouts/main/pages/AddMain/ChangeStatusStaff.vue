<template>
  <div class="flex">
    <p class="title-status">Trạng thái</p>
    <div id="borderStatus">
      <select id="change-status" :style="{color:value1}" @change="getValueStatus">
        <option value="1" style="color: red">Đang làm việc</option>
        <option value="0">Nghỉ tạm thời</option>
        <option value="2">Đã nghỉ việc</option>
      </select>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

import TOKEN from "../../../../service/AllApi.js";
const colorvar = "red";
const value1 = "#28a745"
const value0 = "#ffc107";
const value2 = "#dc3545"
import { useAddMainStore } from "../../../../stores/addMainStore";
const statusRef = ref();
const shop_user_id = useAddMainStore().dataAddMain.current_id_user;

const select = document.getElementById("change-status");
const select2 = document.getElementById("borderStatus");
// console.log(select.value)
async function getValueStatus(e) {
  console.log("sdsd", e.target.value);
  const value = e.target.value;
  if (value === 1) {
    // select.style.border = "3px solid #28a745";
    select.style.color="red"
    // statusRef.value.style.border = "3px solid #28a745";
  }
  if (value === 0) {
    select.style.border = "3px solid red";
  }
  if (value === 2) {
    select.style.border = "3px solid black";
  }

  await axios
    .post(
      "https://x.ghtk.vn/api/v2/staff/set-status",
      {
        shop_user_id: shop_user_id,
        status: value,
      },
      {
        headers: {
          authorization: "Bearer " + TOKEN.TOKEN,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
}
</script>
<!--<template>-->
<!--  <div>Change status staff</div>-->
<!--</template>-->

<!--<script setup>-->
<!--import axios from "axios";-->
<!--import { onMounted } from "vue";-->
<!--import TOKEN from "../../../../service/AllApi";-->
<!--const api_change_status_staff =-->
<!--  "https://x.ghtk.vn/api/fulfilment/v1/shops/get-pick-addresses";-->
<!--onMounted(async () => {-->
<!--  try {-->
<!--    const list = await axios.get(api_change_status_staff, {-->
<!--      headers: {-->
<!--        Authorization: "Bearer " + TOKEN.TOKEN,-->
<!--      },-->
<!--    {-->
<!--      body:{-->

<!--      }-->
<!--    }-->
<!--    });-->
<!--  } catch (error) {-->
<!--    console.log(error);-->
<!--  }-->
<!--});-->
<!--</script>-->

<style scoped>
.title-status {
  font-weight: 400;
  margin-right: 33%;
}
.borderStatus {
  border: 3px solid red;
}
#change-status {
  border: 1px solid #069255;
  color: #069255;
  height: 30px;
  width: 150px;
  margin-left: 20px;
  border-radius: 20px;
  margin-bottom: 25px;
}
#change-status:focus {
  outline: none;
}
</style>
