<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 8">
        <plus-outlined />
        <div class="ant-upload-text">Thêm ảnh</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
}
const previewVisible = ref(false);
const previewImage = ref("");
const fileList = ref([]);

const handleCancel = () => {
  previewVisible.value = false;
};

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }

  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
};

const handleChange = ({ fileList: newFileList }) => {
  fileList.value = newFileList;
};

defineExpose(
  previewVisible,
  previewImage,
  fileList,
  handleCancel,
  handlePreview,
  handleChange
);
</script>
<style scoped>
@import "css/ProfileStaff.css";
</style>
