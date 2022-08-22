<template>
  <div class="preview-image-list">
    <img v-for="(item, i) in listBase64" :key="i" :src="item" :alt="{ item }" />
    <input
      id="upload_syll"
      ref="upload_syll"
      type="file"
      accept=".png, .jpg, .jpeg"
      multiple
      hidden
      @change="prhandle(this)"
    />
    <div class="btn-upload-file" @click.prevent="handleClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p>Thêm Ảnh</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAddMainStore } from "../../../../stores/addMainStore.js";
const useStoreInProfileStaff = useAddMainStore();
const upload_syll = ref();
const listBase64 = useStoreInProfileStaff.dataAddMain.preview_img_syll;
function handleClick() {
  upload_syll.value.click();
}
function prhandle() {
  const list = document.getElementById("upload_syll").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      const d = reader.result;
      useStoreInProfileStaff.dataAddMain.preview_img_syll.push(d);
    },
    false
  );
  if (list) {
    reader.readAsDataURL(list);
    useStoreInProfileStaff.dataAddMain.syll_images.push(list);
  }
}
</script>
<style scoped>
@import "css/uploadFile.css";
.preview-image-list {
  display: flex;
}
</style>
