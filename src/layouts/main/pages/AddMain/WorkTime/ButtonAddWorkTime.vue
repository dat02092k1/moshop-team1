<template>
  <button class="flex btn-add-time-job" @click="handleClickAddWorkTime">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    Thêm thời gian
  </button>
</template>

<script setup>
const emit = defineEmits(["emitTest"]);
function handleClickAddWorkTime() {
  emit("emitTest");
}
</script>

<style scoped>
@import "../css/ButtonAddWorkTime.css";
</style>
