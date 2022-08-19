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
.btn-add-time-job {
  /*background-color: #069255;*/
  color: #069255;
  padding: 8px 22px;
  border: 1px solid #069255;
  border-radius: 4px;
}
.btn-add-time-job:hover {
  background-color: #069255;
  color: #fff;
}
</style>
