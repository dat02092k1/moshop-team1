<script setup>
import { employeeStore } from "../stores/ListEmployee";
import { onMounted, computed } from "vue";
const vd = employeeStore();
onMounted(() => {
  vd.getEmployee();
});
</script>

<template>
  <main>
    <button class="text-xl font-bold bg-red-600" type="button">abc</button>
  </main>
</template>
