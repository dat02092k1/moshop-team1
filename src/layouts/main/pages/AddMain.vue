<template>
  <div>
    <div class="page mt-[1.75rem]">
      <div class="page-container">
        <div class="page-head flex items-center justify-between mt-3">
          <div class="head-left">
            <router-link to="/staff/home"
              ><div
                class="angle-left text-green-600 font-bold text-[35px] ml-5"
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i></div
            ></router-link>
          </div>
          <div class="head-right">
            <div class="save-btn text-white bg-[#069255] mr-5 rounded-2xl">
              <button @click="showModal()" class="py-2 px-12">Lưu</button>
            </div>
            <a-modal
              title="Xác nhận đăng ký"
              v-model:visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
            >
              <span>
                <p>
                  Mã OTP vừa được gửi đến số điện thoại quý khách đã đăng ký!
                  Vui lòng nhập đúng mã OTP để hoàn thành.
                </p>
              </span>
              <span>
                <label for="">Mã OTP</label>
                <input class="block" type="text" placeholder="Nhập mã OTP" />
              </span>
              <span class="mt-4">
                <p>
                  Lưu ý: Nếu bạn không nhận dược sms báo mã OTP, vui lòng thử
                  lại hoặc mail về cskh@ghtk.vn để được hỗ trọ nhanh nhất!
                </p>
              </span>
              <!-- <p>{{ modalText }}</p> -->
            </a-modal>
          </div>
        </div>
        <div class="page-info mx-5">
          <fieldset
            class="frame-info border-solid border-2 pt-4 pr-7 pb-7 pl-7"
          >
            <legend class="lg-info w-auto p-2">Thông tin</legend>
            <div class="info-details grid grid-cols-5">
              <div class="col1 col-span-1">
                <div class="avt relative">
                  <img
                    src="https://moshop.com.vn/default-avatar.jpg"
                    class="avatar rounded-[50%]"
                    alt=""
                  />
                  <div class="choose-img absolute bottom-3 left-[57px]">
                    <img
                      src="https://moshop.com.vn/_nuxt/img/camera.7c2ff9c.svg"
                      alt=""
                    />
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  class="hidden"
                />
              </div>
              <div class="col2 col-span-2">
                <div class="inputForm">
                  <div class="inputForm-item flex">
                    <label for="input" class="required">Tên nhân viên:</label>
                    <input type="text" class="input-control w-full" />
                  </div>
                  <div class="inputForm-item flex">
                    <label for="input" class="required">SĐT:</label>
                    <input type="text" class="input-control w-full" />
                  </div>
                  <div class="inputForm-item flex">
                    <label for="input" class="required">Ngày sinh:</label>
                    <input
                      type="date"
                      placeholder="Chọn ngày"
                      class="input-control w-full"
                    />
                  </div>
                </div>
              </div>
              <div class="col3 col-span-2">
                <div class="inputForm">
                  <div class="inputForm-item flex">
                    <label for="input" class="required">Tên nhân viên:</label>
                    <input type="text" class="input-control w-full" />
                  </div>
                  <div class="inputForm-item flex">
                    <label for="input" class="required">SĐT:</label>
                    <input type="text" class="input-control w-full" />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="page-details grid grid-cols-2 mt-3 mx-5">
          <div class="detail-left mr-2">
            <fieldset
              class="frame-info border-solid border-2 pt-4 pr-7 pb-7 pl-7"
            >
              <legend class="lg-info w-auto p-2">Thông tin công việc</legend>
              <div class="job-details">
                <div class="job-info">
                  <div class="inputForm-item flex">
                    <label for="input" class="required font-bold mr-2"
                      >Ngày bắt đầu làm việc
                    </label>
                    <DatePicker />
                  </div>
                  <div class="inputForm-item flex">
                    <label for="input" class="required font-bold mr-5"
                      >Nơi bắt đầu làm việc
                    </label>
                    <WorkSpace />
                    <!-- <select class="selection w-full" name="cars" id="cars">
                      <option value="volvo">8 Phạm Hùng</option>
                      <option value="saab">DUy Tân CG</option>
                      <option value="opel">Xuân Thủy</option>
                      <option value="audi">Trung Hòa</option>
                    </select> -->
                  </div>
                </div>
                <div class="job-time mb-3">
                  <label for="input" class="required font-bold"
                    >Thời gian làm việc:</label
                  >

                  <ul class="mt-6">
                    <li>
                      1.Từ <a-time-picker v-model:value="value" class="mx-2" />
                      đến
                      <a-time-picker
                        class="mx-2"
                        v-model:value="strValue"
                        valueFormat="HH:mm:ss"
                      />
                    </li>
                  </ul>

                  <div class="add-time font-bold">
                    <button
                      @click="addTime()"
                      class="add-time-btn inline-block text-[#069255] p-2 hover:bg-green-500 hover:text-white"
                    >
                      <i class="fa-solid fa-plus"></i> Thêm thời gian
                    </button>
                  </div>
                </div>
                <div class="pages">
                  <h3 class="font-bold my-3">Màn hình được sử dụng</h3>

                  <label class="container-box"
                    >Chats chốt đơn
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-box"
                    >Tổng quan (Tổng quan shop)
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-box"
                    >Đơn hàng (Quản lý và đăng đơn GHTK)
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-box"
                    >Khách hàng (Quản lý và chăm sóc KH)
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-box"
                    >Kho và sản phẩm (Quản lý sản phẩm và xuất nhập)
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-box"
                    >Nhân viên (Quản lý nhân viên)
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="detail-right ml-2">
            <fieldset
              class="frame-info border-solid border-2 pt-4 pr-7 pb-7 pl-7"
            >
              <legend class="lg-info w-auto p-2">Hồ sơ nhân viên</legend>
              <div class="info-details">
                <div class="id-card">
                  <div class="id-title">
                    <h3 class="font-bold">Chứng minh thư</h3>
                  </div>
                  <div class="id-img">
                    <Calendar />
                  </div>
                </div>
                <div class="curriculum-vitae my-4">
                  <div class="curriculum-title">
                    <h3 class="font-bold">Sơ yếu lý lịch</h3>
                  </div>
                  <div class="curriculum-img">
                    <Calendar />
                  </div>
                </div>
                <div class="profile my-4">
                  <div class="profile-title">
                    <h3 class="font-bold">Hồ sơ</h3>
                  </div>
                  <div class="profile-img">
                    <Calendar />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from "./Calendar.vue";
import DatePicker from "./DatePicker.vue";
import WorkSpace from "./WorkSpace.vue";
import TimeChild from "./TimeChild.vue";
import { ref, onMounted } from "vue";

const modalText = ref("Content of the modal");
const visible = ref(false);
const confirmLoading = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  modalText.value = "The modal will be closed after two seconds";
  confirmLoading.value = true;
  setTimeout(() => {
    visible.value = false;
    confirmLoading.value = false;
  }, 2000);
};

const listTimeWork = [
  {
    id: "1",
    component: TimeChild,
  },
];

const addTime = () => {
  listTimeWork.id = listTimeWork.length + 1;
  console.log(listTimeWork.id);
  listTimeWork.push(listTimeWork.component);
};

// const confirm-act = () => {

// }
</script>

<style scoped>
.frame-info {
  border: 1px solid #ccc;
  border-radius: 10px;
}

.lg-info {
  border: 1px solid #ccc;
}

.avatar {
  width: 148px;
  height: 148px;
}

.input-control {
  border: 1px solid #ccc;
  border-radius: 10px;
}

.inputForm-item {
  margin: 10px;
}

.selection {
  border: 1px solid #ccc;
  border-radius: 10px;
}
.add-time-btn {
  border: 1px solid green;
}

.container-box {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container-box input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  border-radius: 2px;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}

.container-box:hover input ~ .checkmark {
  background-color: #ccc;
}

.container-box input:checked ~ .checkmark {
  background-color: #069255;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container-box input:checked ~ .checkmark:after {
  display: block;
}

.ant-modal-header {
  background: #069255 !important;
}
.container-box .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

<!-- <script>
// import moment from 'moment';
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const value = ref(('08:00:00', 'HH:mm:ss'));
    const strValue = ref('09:00:00');
    watch(value, () => {
      console.log(value.value);
    });
    watch(strValue, () => {
      console.log(strValue.value);
    });
    return {
      value,
      strValue,
      
    };
  },
});
</script> -->
