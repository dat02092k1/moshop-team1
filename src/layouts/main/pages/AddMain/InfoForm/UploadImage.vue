<template>
  <div class="avatar-upload">
    <div class="avatar-edit"></div>
    <div class="avatar-preview">
      <img
        id="imagePreview"
        src="https://moshop.com.vn/default-avatar.jpg"
        alt="default_avatar"
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
  }
}
</script>

<style scoped>
.avatar-upload {
  position: relative;
  margin: 50px auto;
}
.avatar-upload {
  overflow: hidden;
  margin-top: 0px;
}
.avatar-upload .avatar-preview input {
  display: none;
}
.avatar-preview > label {
  height: 148px;
  width: 148px;
  position: absolute;
  cursor: pointer;
  margin-top: -35px;
  background-color: rgba(255, 255, 255, 0.7);
}
.avatar-preview > label > img {
  margin: 0 auto;
}

.avatar-upload .avatar-preview {
  width: 148px;
  height: 148px;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
}
.avatar-upload .avatar-preview > img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
