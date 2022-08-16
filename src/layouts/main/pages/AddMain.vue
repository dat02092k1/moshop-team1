<script setup>
import { ref } from "vue";
// import axios from "axios";
import UploadImage from "./AddMain/InfoForm/UploadImage.vue";
import InfoForm from "./AddMain/InfoForm/InfoForm.vue";
import ProfileStaff from "./AddMain/ProfileStaff.vue";
import JobInfomation from "./AddMain/JobInfomation.vue";
import HeadAction from "./AddMain/HeadAction.vue";
const getListWorkPlace = ref([]);
defineExpose(getListWorkPlace);
</script>
<template>
  <div class="grid grid-cols-1">
    <HeadAction />
    <div class="page__info">
      <fieldset class="bunker__info">
        <legend class="bunker-title">Thông tin</legend>
        <div class="grid sm:grid-cols-12">
          <div class="avatar col-span-3 inline-block align-top">
            <UploadImage />
          </div>
          <div class="col-span-9">
            <div class="info_form">
              <InfoForm />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="grid md:grid-cols-12 gap-x-5 flex mt-10">
      <div class="page_jobInfomation col-span-6">
        <fieldset class="bunker__info">
          <legend class="bunker-title">Thông tin công việc</legend>
          <JobInfomation :get-list-work-place="getListWorkPlace" />
        </fieldset>
      </div>
      <div class="page_profileStaff col-span-6">
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
