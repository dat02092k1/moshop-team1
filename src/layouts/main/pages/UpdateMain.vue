<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import TOKEN from "../../../service/AllApi.js";
import AddMain from "./AddMain.vue";
import { useRoute } from "vue-router";
import { useAddMainStore } from "../../../stores/addMainStore.js";
const useStoreInUpdate = useAddMainStore();
const route = useRoute();
const idUpdate = route.params.id;
useStoreInUpdate.dataAddMain.current_id_user = idUpdate;
// console.log("id", idUpdate)

let userStore = useStoreInUpdate.dataAddMain;
onMounted(async () => {
  try {
    const res = await axios.get(
      `https://x.ghtk.vn/api/v2/staff/detail?shop_user_id=${idUpdate}`,
      {
        headers: {
          Authorization: "Bearer " + TOKEN.TOKEN,
        },
      }
    );
    const resData = res.data.data;
    console.log(resData);
    // userStore = resData;
    // console.log("userStore",userStore)

    userStore.birthday = resData.birthday;
    userStore.fullname = resData.fullname;
    userStore.tel = resData.tel;
    userStore.avatar = resData.avatar;
    userStore.live_address = resData.live_address;
    userStore.work_first_date = resData.work_first_date;
    userStore.work_address = resData.work_address;
    userStore.screens = resData.screens;
    userStore.defaultAvatar = resData.avatar

  } catch (error) {
    console.log(error);
  }
})


async function handleUpdateUser() {
  const formDataUpdate = new formData();
  formDataUpdate.append("avatar", useStoreInUpdate.dataAddMain.avatar);
  formDataUpdate.append("fullname", useStoreInUpdate.dataAddMain.fullname);
  formDataUpdate.append("tel", useStoreInUpdate.dataAddMain.tel);
  formDataUpdate.append("birthday", useStoreInUpdate.dataAddMain.birthday);

  try {
    const res = await axios.post(
      "http://x.ghtk.vn/api/v2/staff/update/",
        formDataUpdate,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + TOKEN.TOKEN,
        },
      }
    );
    console.log(res);
    if (res.data.success === true) {
      visible.value = true;
    } else {
      console.log(useStoreInAddMain.dataAddMain.tel);
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <AddMain />
</template>
<style scoped>
.head-back svg {
  color: #069255;
}
.btn-head-action {
  background-color: #069255;
  color: #fff;
  padding: 7px 52px;
  border: 2px solid #28a745;
  border-radius: 20px;
}
.btn-head-action:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
/*/thong tin*/
.bunker__info {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 18px 30px 20px;
  box-shadow: #ccc 0px 1px 3px 0px;
}
legend.bunker-title {
  width: 30%;

  font-size: 14px;
  border: 1px solid #ccc;
  text-align: left;
  padding: 6px 20px;
}
.avatar {
  position: relative;
  margin-right: 120px;
}

.upload-image img {
  width: 148px;
  height: 28px;
  cursor: pointer;
  background-color: #ccc;
}
.upload-image > input {
  visibility: hidden;
  width: 0;
  height: 0;
}
.profileStaff-item {
  margin-bottom: 15px;
}
.profileStaff-title {
  font-weight: 500;
  margin-bottom: 5px;
}
</style>
