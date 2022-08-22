<template>
  <div class="grid grid-cols-1 mt-5 mx-5">
    <div class="head flex justify-between">
      <RouterLink to="/staff/home" class="head-back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </RouterLink>
      <div class="head-action">
        <button
          v-if="isRouter"
          class="btn-delete-user"
          @click="handleDeleteUser"
        >
          Xoá
        </button>
        <button class="btn-head-action" @click="handleSaveData">Lưu</button>
        <!--        modal-->
        <div>
          <a-modal
            :visible="visible"
            class="pr-4"
            title="Xác nhận đăng ký"
            @ok="handleOk"
          >
            <p class="pl-4 mt-5">
              {{ useStoreInAddMain.dataAddMain.confirmOtp }}
              Mã OTP vừa được gửi đến số điện thoại quý khách đã đăng ký!
              <br />
              Vui lòng nhập đúng mã OTP để hoàn thành
            </p>
            <input
              v-model="confirmOtp"
              type="text"
              class="border h-10 p-5 mx-6"
              style="width: 90%"
              placeholder="Nhập mã OTP"
            />
            <p class="mt-5 pl-4">
              Lưu ý: Nếu bạn không nhận dược sms báo mã OTP, vui lòng thử lại
              hoặc
              <br />
              mail về <u>cskh@ghtk.vn</u> để được hỗ trợ nhanh nhất!
            </p>
          </a-modal>
        </div>
      </div>
    </div>
    <div class="page__info">
      <fieldset class="bunker__info">
        <legend class="bunker-title">Thông tin</legend>
        <div class="grid sm:grid-cols-12 md:col-span-12 lg:col-span-12">
          <div
            class="avatar col-span-4 sm:col-span-12 lg:col-span-4 inline-block align-top flex justify-around"
          >
            <UploadImage />
          </div>
          <div class="col-span-8 sm:col-span-12 lg:col-span-8">
            <div class="info_form">
              <InfoForm ref="refInfoForm" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="grid md:grid-cols-2 gap-x-5 gap-y-7 flex mt-10">
      <div class="page_jobInfomation md:col-span-2 lg:col-span-1 sm:col-span-2">
        <fieldset class="bunker__info">
          <legend class="bunker-title">Thông tin công việc</legend>
          <JobInfomation
            ref="refJobInfomation"
            :get-list-work-place="getListWorkPlace"
          />
        </fieldset>
      </div>
      <div class="page_profileStaff md:col-span-2 lg:col-span-1 sm:col-span-2">
        <fieldset class="bunker__info">
          <legend class="bunker-title">Hồ sơ nhân viên</legend>
          <div class="profileStaff-item">
            <div class="profileStaff-title mb-5">Chứng minh thư</div>
            <div class="profileStaff-upload mb-5">
              <ProfileStaff />
            </div>
          </div>
          <div class="profileStaff-item">
            <div class="profileStaff-title mb-5">Sơ yếu lý lịch</div>
            <div class="profileStaff-upload mb-5">
              <SoYeuLyLich />
            </div>
          </div>
          <div class="profileStaff-item">
            <div class="profileStaff-title mb-5">Hồ sơ</div>
            <div class="profileStaff-upload mb-5">
              <HopDongLaoDong />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import UploadImage from "./AddMain/InfoForm/UploadImage.vue";
import InfoForm from "./AddMain/InfoForm/InfoForm.vue";
import ProfileStaff from "./AddMain/ProfileStaff.vue";
import JobInfomation from "./AddMain/JobInfomation.vue";
import { useRouter } from "vue-router";
import { useAddMainStore } from "../../../stores/addMainStore.js";
const useStoreInAddMain = useAddMainStore();
// useStoreInAddMain;
import TOKEN from "../../../service/AllApi";
import SoYeuLyLich from "./AddMain/SoYeuLyLich.vue";
import HopDongLaoDong from "./AddMain/HopDongLaoDong.vue";
const confirmOtp = ref();
// import { useAddMainStore } from "../../../stores/counter.js";
// const store = useAddMainStore();
const getListWorkPlace = ref([]);
const refInfoForm = ref();
const refJobInfomation = ref();
console.log(useStoreInAddMain.dataAddMain.current_id_user);
const isRouter = computed(() => {
  return useRouter().currentRoute.value.name === "staff.update";
  // console.log(useRouter().currentRoute.value.name === "staff.update") ;
});
// const isRouterAdd = computed(() => {
//   return useRouter().currentRoute.value.name === "satff.add";
// });
// console.log(isRouter)
// console.log(useStoreInAddMain)
// const storeReq = useStoreInAddMain.dataAddMain;
const visible = ref(false);
async function handleOk() {
  // console.log(confirmOtp.value);
  try {
    const res = await axios.post(
      "https://x.ghtk.vn/api/fulfilment/v2/staff/confirm/",
      {
        otp: confirmOtp.value,
      },
      {
        headers: {
          Authorization: "Bearer " + TOKEN.TOKEN,
        },
      }
    );
    const resData = res.data.data;
    console.log(resData);
  } catch (error) {
    console.log(error);
  }

  visible.value = false;
}
async function handleDeleteUser() {
  try {
    await axios.post(
      "https://x.ghtk.vn/api/v2/staff/destroy",
      {
        shop_user_ids: useStoreInAddMain.dataAddMain.current_id_user,
      },
      {
        headers: {
          Authorization: "Bearer " + TOKEN.TOKEN,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
async function handleSaveData() {
  const formData = new FormData();
  formData.append("avatar", useStoreInAddMain.dataAddMain.avatar);
  formData.append("fullname", useStoreInAddMain.dataAddMain.fullname);
  formData.append("tel", useStoreInAddMain.dataAddMain.tel);

  // formData.append("birthday", useStoreInAddMain.dataAddMain.birthday);
  formData.append("password", useStoreInAddMain.dataAddMain.password);
  // formData.append("live_address", useStoreInAddMain.dataAddMain.live_address);
  // formData.append(
  //   "work_first_date",
  //   useStoreInAddMain.dataAddMain.work_first_date
  // );
  // formData.append("work_address", useStoreInAddMain.dataAddMain.work_address);
  // formData.append("screens", useStoreInAddMain.dataAddMain.screens);
  // formData.append("pages", useStoreInAddMain.dataAddMain.pages);
  // for (var pair of formData.entries()) {
  //   console.log(pair[0]+ ', ' + pair[1]);
  // }

  try {
    const res = await axios.post(
      "http://x.ghtk.vn/api/v2/staff/create",
      formData,
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
.btn-delete-user {
  color: #dc3545;
  background-color: white;
  padding: 7px 52px;
  border: 2px solid #dc3545;
  margin-right: 20px;
  border-radius: 20px;
  /*background-color: rgb(220, 53, 69);*/
}
.btn-delete-user:hover {
  color: #fff;
  background-color: #dc3545;
}
</style>
