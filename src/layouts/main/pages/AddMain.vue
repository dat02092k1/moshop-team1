<script setup>
import { ref } from "vue";
// import axios from "axios";
import UploadImage from "./AddMain/InfoForm/UploadImage.vue";
import InfoForm from "./AddMain/InfoForm/InfoForm.vue";
import ProfileStaff from "./AddMain/ProfileStaff.vue";
import JobInfomation from "./AddMain/JobInfomation.vue";
// import { useAddMainStore } from "../../../stores/counter.js";
// const store = useAddMainStore();
const getListWorkPlace = ref([]);
const refInfoForm = ref();
function handleSaveData() {
  refInfoForm.value.callValidateOnSubmit();
}
</script>
<template>
  <div class="grid grid-cols-1">
    <div class="head flex justify-between">
      <div class="head-back">
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
      </div>
      <div class="head-action">
        <button class="btn-head-action" @click="handleSaveData">Lưu</button>
        <!--              <a-modal :visible="visible" title="Xác nhận đăng ký">-->
        <!--                <span>-->
        <!--                  <p>-->
        <!--                    Mã OTP vừa được gửi đến số điện thoại quý khách đã đăng ký! Vui-->
        <!--                    lòng nhập đúng mã OTP để hoàn thành.-->
        <!--                  </p>-->
        <!--                </span>-->
        <!--                <span>-->
        <!--                  <label for="">Mã OTP</label>-->
        <!--                  <input class="block" type="text" placeholder="Nhập mã OTP" />-->
        <!--                </span>-->
        <!--                <span class="mt-4">-->
        <!--                  <p>-->
        <!--                    Lưu ý: Nếu bạn không nhận dược sms báo mã OTP, vui lòng thử lại-->
        <!--                    hoặc mail về cskh@ghtk.vn để được hỗ trọ nhanh nhất!-->
        <!--                  </p>-->
        <!--                </span>-->
        <!--              </a-modal>-->
      </div>
    </div>
    <!--    <HeadAction @emitSaveData = "handleEmitSaveData" />-->
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
          <JobInfomation :get-list-work-place="getListWorkPlace" />
        </fieldset>
      </div>
      <div class="page_profileStaff md:col-span-2 lg:col-span-1 sm:col-span-2">
        <fieldset class="bunker__info">
          <legend class="bunker-title">Hồ sơ nhân viên</legend>
          <div class="profileStaff-item">
            <div class="profileStaff-title">Chứng minh thư</div>
            <div class="profileStaff-upload">
              <ProfileStaff />
            </div>
          </div>
          <div class="profileStaff-item">
            <div class="profileStaff-title">Sơ yếu lý lịch</div>
            <div class="profileStaff-upload">
              <ProfileStaff />
            </div>
          </div>
          <div class="profileStaff-item">
            <div class="profileStaff-title">Hồ sơ</div>
            <div class="profileStaff-upload">
              <ProfileStaff />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<style>
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
