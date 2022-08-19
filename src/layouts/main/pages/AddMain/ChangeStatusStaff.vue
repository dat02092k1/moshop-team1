<template>
  <div>Change status staff</div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import TOKEN from "../../../../service/AllApi";
const api_change_status_staff =
  "https://x.ghtk.vn/api/fulfilment/v1/shops/get-pick-addresses";
onMounted(async () => {
  try {
    const list = await axios.get(api_change_status_staff, {
      headers: {
        Authorization: "Bearer " + TOKEN.TOKEN,
      },
    {
      body:{

      }
    }
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
