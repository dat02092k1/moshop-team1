<script setup>
import { RouterLink, RouterView } from "vue-router";
import {ref} from 'vue';
// import {EmployeeStore} from './stores/ListEmployee.js';
import HomeView from "./views/HomeView.vue";
// const listEmployee = EmployeeStore();
</script>

<template>
  <div>
    <!-- <ViewEmployeeInfo /> -->
    <HomeView />
  </div>
</template>

<style scoped>

</style>
