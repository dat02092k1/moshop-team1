<script setup>
import { ref } from "vue";
import { useInfoStaffStore } from "../../stores/info-staff";
const useInfoStaff = useInfoStaffStore();
const inputFile = ref(null);
const file = ref(null);
const inputAvatar = () => {
  inputFile.value.click();
};
const uploadImage = (e) => {
  file.value = e.target.files[0];
  useInfoStaff.formInfo.avatar = URL.createObjectURL(file.value);
  e.target.value = "";
};
const formRef = ref();

const validateInfo = {
  fullname: [
    {
      required: true,
      message: "Tên nhân viên không được để trống !",
    },
  ],
  tel: [
    {
      required: true,
      message: "Số điện thoại không được để trống !",
    },
    {
      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      message: "Số điện thoại không hợp lệ !",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Mật khẩu không được để trống !",
    },
    {
      min: 6,
      message: "Mật khẩu tối thiểu 6 kí tự !",
    },
  ],
};

const validForm = () => {
  formRef.value.validate();
};
defineExpose({
  validForm,
});
</script>
<template>
  <div class="personal-info mb-5">
    <fieldset class="wrap-form text-base text-black">
      <legend class="form-title">Thông tin</legend>
      <a-form
          ref="formRef"
          :model="useInfoStaff.formInfo"
          :colon="false"
          :rules="validateInfo"
          class="grid lg:grid-cols-12 gap-x-8"
      >
        <div class="col-span-2 mb-8 lg:mb-0">
          <div class="flex">
            <div class="relative">
              <img
                  :src="useInfoStaff.formInfo.avatar"
                  alt=""
                  class="w-[148px] h-[148px] rounded-[50%] object-cover lg:max-w-fit lg:w-[148px]"
              />
              <div
                  @click="inputAvatar"
                  class="cursor-pointer absolute bottom-0 h-10 w-full bg-[rgba(255,255,255,0.7)]"
              >
                <div class="absolute bottom-[6px] left-[58px]">
                  <img src="../../assets/images/camera.svg" class="w-7 h-7" />
                </div>
              </div>
            </div>
            <input
                type="file"
                accept="image/*"
                style="display: none"
                ref="inputFile"
                @change="uploadImage"
            />
          </div>
        </div>
        <div class="col-span-5">
          <a-form-item label="Tên nhân viên" name="fullname">
            <a-input v-model:value="useInfoStaff.formInfo.fullname" />
          </a-form-item>

          <a-form-item label="SĐT" name="tel">
            <a-input v-model:value="useInfoStaff.formInfo.tel" />
          </a-form-item>

          <a-form-item label="Ngày sinh" name="birthday">
            <a-date-picker
                v-model:value="useInfoStaff.formInfo.birthday"
                placeholder="Chọn ngày"
            />
          </a-form-item>
        </div>
        <div class="col-span-5">
          <a-form-item label="Mật khẩu" name="password">
            <a-input-password
                v-model:value="useInfoStaff.formInfo.password"
                placeholder="Mật khẩu phải có ít nhất 6 kí tự"
            />
          </a-form-item>
          <a-form-item label="Địa chỉ" name="live_address">
            <a-input v-model:value="useInfoStaff.formInfo.live_address" />
          </a-form-item>
        </div>
      </a-form>
    </fieldset>
  </div>
</template>
<style scoped>
:deep(.ant-form-item-label > label) {
  font-weight: 500;
  width: 125px;
  font-size: 1rem;
}
:deep(.ant-form-item-label > label)::after {
  content: "";
  color: #dc3545;
}
:deep(.ant-input*) {
  padding: 0.375rem 0.75rem;
}
:deep(.ant-picker) {
  padding: 0.375rem 0.75rem;
  width: 100%;
}
:deep(.ant-input-affix-wrapper) {
  padding: 0.375rem 0.75rem;
}
:deep(.ant-form-item-label
    > label*.ant-form-item-required:not*(.ant-form-item-required-mark-optional))::before {
                                                                                  content: "";
                                                                                }
:deep(.ant-form-item-label
    > label*.ant-form-item-required:not*(.ant-form-item-required-mark-optional))::after {
                                                                                  content: "*";
                                                                                }

.wrap-form {
  padding: 18px 30px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  position: relative;
}
.form-title {
  display: block;
  width: auto;
  padding: 6px 20px;
  margin-bottom: 0;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #ccc;
  background: #fff;
}
</style>
<script setup>
import { ref } from "vue";
import { useInfoStaffStore } from "../../stores/info-staff";
const useInfoStaff = useInfoStaffStore();
const inputFile = ref(null);
const file = ref(null);
const inputAvatar = () => {
  inputFile.value.click();
};
const uploadImage = (e) => {
  file.value = e.target.files[0];
  useInfoStaff.formInfo.avatar = URL.createObjectURL(file.value);
  e.target.value = "";
};
const formRef = ref();

const validateInfo = {
  fullname: [
    {
      required: true,
      message: "Tên nhân viên không được để trống !",
    },
  ],
  tel: [
    {
      required: true,
      message: "Số điện thoại không được để trống !",
    },
    {
      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      message: "Số điện thoại không hợp lệ !",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Mật khẩu không được để trống !",
    },
    {
      min: 6,
      message: "Mật khẩu tối thiểu 6 kí tự !",
    },
  ],
};

const validForm = () => {
  formRef.value.validate();
};
defineExpose({
  validForm,
});
</script>
<template>
  <div class="personal-info mb-5">
    <fieldset class="wrap-form text-base text-black">
      <legend class="form-title">Thông tin</legend>
      <a-form
          ref="formRef"
          :model="useInfoStaff.formInfo"
          :colon="false"
          :rules="validateInfo"
          class="grid lg:grid-cols-12 gap-x-8"
      >
        <div class="col-span-2 mb-8 lg:mb-0">
          <div class="flex">
            <div class="relative">
              <img
                  :src="useInfoStaff.formInfo.avatar"
                  alt=""
                  class="w-[148px] h-[148px] rounded-[50%] object-cover lg:max-w-fit lg:w-[148px]"
              />
              <div
                  @click="inputAvatar"
                  class="cursor-pointer absolute bottom-0 h-10 w-full bg-[rgba(255,255,255,0.7)]"
              >
                <div class="absolute bottom-[6px] left-[58px]">
                  <img src="../../assets/images/camera.svg" class="w-7 h-7" />
                </div>
              </div>
            </div>
            <input
                type="file"
                accept="image/*"
                style="display: none"
                ref="inputFile"
                @change="uploadImage"
            />
          </div>
        </div>
        <div class="col-span-5">
          <a-form-item label="Tên nhân viên" name="fullname">
            <a-input v-model:value="useInfoStaff.formInfo.fullname" />
          </a-form-item>

          <a-form-item label="SĐT" name="tel">
            <a-input v-model:value="useInfoStaff.formInfo.tel" />
          </a-form-item>

          <a-form-item label="Ngày sinh" name="birthday">
            <a-date-picker
                v-model:value="useInfoStaff.formInfo.birthday"
                placeholder="Chọn ngày"
            />
          </a-form-item>
        </div>
        <div class="col-span-5">
          <a-form-item label="Mật khẩu" name="password">
            <a-input-password
                v-model:value="useInfoStaff.formInfo.password"
                placeholder="Mật khẩu phải có ít nhất 6 kí tự"
            />
          </a-form-item>
          <a-form-item label="Địa chỉ" name="live_address">
            <a-input v-model:value="useInfoStaff.formInfo.live_address" />
          </a-form-item>
        </div>
      </a-form>
    </fieldset>
  </div>
</template>
<style scoped>
:deep(.ant-form-item-label > label) {
  font-weight: 500;
  width: 125px;
  font-size: 1rem;
}
:deep(.ant-form-item-label > label)::after {
  content: "";
  color: #dc3545;
}
:deep(.ant-input*) {
  padding: 0.375rem 0.75rem;
}
:deep(.ant-picker) {
  padding: 0.375rem 0.75rem;
  width: 100%;
}
:deep(.ant-input-affix-wrapper) {
  padding: 0.375rem 0.75rem;
}
:deep(.ant-form-item-label
    > label*.ant-form-item-required:not*(.ant-form-item-required-mark-optional))::before {
                                                                                  content: "";
                                                                                }
:deep(.ant-form-item-label
    > label*.ant-form-item-required:not*(.ant-form-item-required-mark-optional))::after {
                                                                                  content: "*";
                                                                                }

.wrap-form {
  padding: 18px 30px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  position: relative;
}
.form-title {
  display: block;
  width: auto;
  padding: 6px 20px;
  margin-bottom: 0;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #ccc;
  background: #fff;
}
</style>