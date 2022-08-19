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
:deep(.ant-upload-select-picture-card i) {
  font-size: 32px;
  color: #069255;
}

:deep(.ant-upload-select-picture-card .ant-upload-text) {
  margin-top: 8px;
  color: #069255;
}
:deep(.ant-upload.ant-upload-select-picture-card) {
  border-radius: 15px;
}
:deep(.ant-upload.ant-upload-select-picture-card):hover {
  border: 1px dashed #069255;
  border-radius: 15px;
}
:deep(.anticon svg) {
  color: #069255;
}
</style>
