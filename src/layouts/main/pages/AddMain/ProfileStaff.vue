<template>
  <div class="preview-image-list">
    <div v-for="(item, i) in listBase64" :key="i">
      <div class="hover-show">
        <!--        flex text-gray-500 font-thin-->
        <div class="flex">
          <svg
            id="eye-show"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>

          <svg id="trash-delete"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>

      <img class="img-item" :src="item" :alt="{ item }" />
    </div>

    <input
      id="upload_cmnd"
      ref="inputUploadCmnd"
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
const inputUploadCmnd = ref();
import { useAddMainStore } from "../../../../stores/addMainStore.js";
const useStoreInProfileStaff = useAddMainStore();
const listBase64 = useStoreInProfileStaff.dataAddMain.preview_img_cmnd;
function prhandle() {
  const list = document.getElementById("upload_cmnd").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      const d = reader.result;
      useStoreInProfileStaff.dataAddMain.preview_img_cmnd.push(d);
    },
    false
  );
  if (list) {
    reader.readAsDataURL(list);
    useStoreInProfileStaff.dataAddMain.cmnd_images.push(list);
  }
}
function handleClick() {
  inputUploadCmnd.value.click();
}
</script>
<style scoped>
@import "css/uploadFile.css";
.img-item {
  position: relative;
  /*cursor: pointer;*/
}
.hover-show {
  /*display: none;*/
  color: red;
  position: absolute;
  margin-left: 20px;
  margin-top: 50px;
  z-index: 99999;
}
#eye-show {
  /*display: none;*/

  cursor: pointer;
}
#trash-delete{
  cursor: pointer;
}
.img-item:hover + #eye-show {
  display: block;
}
</style>
