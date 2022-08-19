<script setup>
import { useToast } from "vue-toast-notification";
import PersonalInfoVue from "../components/create_staff/PersonalInfo.vue";
import WorkInfo from "../components/create_staff/WorkInfo.vue";
import { useInfoStaffStore } from "../stores/info-staff";
import { format } from "date-fns";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const $toast = useToast();
const router = useRouter();
const useInfoStaff = useInfoStaffStore();
const personalRef = ref();
const addStaff = () => {
  personalRef.value.validForm();
  if (useInfoStaff.formInfo.fullname.trim().length <= 0) {
    $toast.open({
      message: "Tên nhân viên không được để trống",
      type: "error",
      position: "bottom",
      duration: 3000,
    });
  }
  console.log(
    useInfoStaff.formInfo.avatar,
    "-",
    useInfoStaff.formInfo.fullname,
    "-",
    useInfoStaff.formInfo.tel,
    "-",
    useInfoStaff.formInfo.password,
    "-",
    useInfoStaff.formInfo.work_address,
    "-",
    useInfoStaff.formInfo.live_address,
    "-",
    format(useInfoStaff.formInfo.birthday.$d, "yyyy-MM-dd"),
    "-",
    format(useInfoStaff.formInfo.work_first_date.$d, "yyyy-MM-dd")
  );
};
onMounted(() => {
  useInfoStaff.getListAddress();
});
</script>
<template>
  <div class="create-staff container mx-auto">
    <div class="head flex justify-between items-center mb-8">
      <div
        class="head__back cursor-pointer text-moshop-color"
        @click="router.push('/')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div class="head__action">
        <button
          class="py-2 px-[52px] rounded-[20px] font-medium border-[2px] text-white bg-moshop-color hover:bg-[#218838] hover:border-[#1e7e34]"
          @click="addStaff"
        >
          Lưu
        </button>
      </div>
    </div>
    <PersonalInfoVue ref="personalRef" />
    <WorkInfo />
  </div>
</template>
