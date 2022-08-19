<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import AddMain from "./layouts/main/pages/AddMain.vue";
import NavBar from "./layouts/main/NavBar.vue";
import ShowMain from "./layouts/main/pages/ShowMain.vue";
import Show3 from "./layouts/main/pages/Show3.vue";

const route = useRoute();
</script>

<template>
  <div>
    <NavBar v-if="route.name !== 'login'" />
    <RouterView />
  </div>
</template>

<style scoped></style>
