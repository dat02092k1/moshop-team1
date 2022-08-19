<template>
  <div class="inline-block">
    <a-button class="text-[#069255]" type="primary" @click="showModal"
      >Tùy chọn</a-button
    >
    <div class="modal-pop">
      <a-modal v-model:visible="visible" class="" title="Tùy chọn hiển thị">
        <a-space direction="vertical" class="flex-row">
          <div class="date-pick ml-[80px]">
            <a-date-picker
              @change="change1"
              v-model="vanue1"
              placeholder="Chọn ngày bắt đầu"
              class="mr-3"
            />

            <a-date-picker
              @change="change2"
              v-model="vanue2"
              placeholder="Chọn ngày kết thúc"
            />
          </div>
          <div></div>
        </a-space>
        <div class="text-center ml-[125px]">
          <div
            @click="$emit('changeDrop')"
            class="text-center bg-[#069255] my-2 p-2 w-[50%] text-[14px] text-white"
          >
            <a class="text-white">
              <button @click="handleSave()" class="">Xác nhận</button></a
            >
          </div>
          <div
            @click="cancel()"
            class="text-center bg-[#aaaaaa] my-2 p-2 w-[50%]"
          >
            <button>Hủy bỏ</button>
          </div>
        </div>

        <div
          v-if="checkDate === false"
          class="bg-red-500 text-white px-4 absolute bottom-[-90%] py-2 rounded-full"
        >
          <span>Ngày bắt đầu không thể lớn hơn ngày kết thúc</span>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import SelectDate from "./SelectDate.vue";
import { useStaffStore } from "../../../stores/store";
export default defineComponent({
  setup() {
    const visible = ref(false);
    const vanue1 = ref("");
    const vanue2 = ref("");
    const showModal = () => {
      visible.value = true;
    };

    const staff_contain = useStaffStore();
    const checkDate = ref(true);
    const handleOk = () => {
      visible.value = false;
    };

    async function handleSave() {
      console.log(vanue1.value);
      console.log(vanue2.value);
      if (vanue2.value < vanue1.value) {
        checkDate.value = false;
        console.log(checkDate.value);
        setTimeout(() => (checkDate.value = true), 3000);
      } else {
        await staff_contain.getStaff(vanue1.value, vanue2.value);
        visible.value = false;
      }
    }

    const cancel = () => {
      visible.value = false;
    };
    const change1 = (date, dateString) => {
      console.log(date);
      vanue1.value = dateString;
      console.log(vanue1.value);
      // console.log(value2);
    };

    const change2 = (date, dateString) => {
      vanue2.value = dateString;
      console.log(vanue2.value);
    };
    return {
      visible,
      vanue1,
      vanue2,
      showModal,
      handleOk,
      SelectDate,
      change1,
      change2,
      checkDate,
      cancel,
      handleSave,
      value1: ref(),
      value2: ref(),
    };
  },
});
</script>

<style scoped>
.ant-modal-header {
  align-items: center;
}

:deep(.ant-modal-title) {
  background: #069255;
}
</style>
