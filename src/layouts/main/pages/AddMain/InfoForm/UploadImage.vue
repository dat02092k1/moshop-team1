<template>
  <div class="avatar-upload">
    <div class="avatar-edit"></div>
    <div class="avatar-preview">
      <img
        id="imagePreview"
        :src="useStoreInUpload.dataAddMain.defaultAvatar"
        alt=""
      />
      <input
        id="imageUpload"
        type="file"
        accept=".png, .jpg, .jpeg"
        @change="previewFile()"
      />
      <label for="imageUpload">
        <img src="https://moshop.com.vn/_nuxt/img/camera.7c2ff9c.svg" alt="" />
      </label>
    </div>
  </div>
</template>

<script setup>
import {useAddMainStore} from "../../../../../stores/addMainStore.js";
const useStoreInUpload = useAddMainStore()
function previewFile() {
  const preview = document.getElementById("imagePreview");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
    useStoreInUpload.dataAddMain.avatar = file

  }
}
</script>

<style scoped>
@import "../css/UploadImage.css";
</style>
