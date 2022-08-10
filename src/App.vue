<script setup>
import { RouterLink, RouterView } from "vue-router";
import AddMain from "./layouts/main/pages/AddMain.vue";
import NavBar from "./layouts/main/NavBar.vue";
import ShowMain from "./layouts/main/pages/ShowMain.vue"; 
import Show2 from "./layouts/main/pages/Show2.vue";
import Login from "./layouts/login/Login.vue"; 
import Show3 from "./layouts/main/pages/Show3.vue";

</script>

<template>
  <NavBar/>
  <!-- <Show3/> -->
   <!-- <Show2/> -->
  <!-- <ShowMain /> -->
  <!-- <AddMain /> -->
  <RouterView />
  <!-- <Login /> -->
</template>

<style scoped>

</style>
