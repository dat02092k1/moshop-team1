<script setup>
import { employeeStore } from '../stores/ListEmployee';
import { onMounted, computed } from 'vue';
const vd = employeeStore();
onMounted(() => {
  vd.getEmployee();
})


 </script>

<template>
  <div>
    Home
  </div>
</template>
