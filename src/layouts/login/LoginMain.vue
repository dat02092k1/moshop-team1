<template>
  <div class="login__page">
    <div class="login-logo mb-[45px]">
      <img
        src="https://moshop.com.vn/_nuxt/img/moshop.5640f4d.png"
        alt=""
        srcset=""
      />
    </div>

    <div>
      <div class="w-full flex justify-center" v-if="loginFunc.check">
        <div class="bg-red-500 text-white p-3 w-[350px] rounded-[10px]">
            <span>Thông tin tài khoản không đúng hoặc chưa được kích hoạt, bạn vui lòng thử lại!</span>
        </div>
      </div>
      <div class="login-section grid grid-cols-1 mt-6">
        <p class="section-header">Đăng Nhập</p>
        <div class="section-form">
          <form action="" class="grid grid-cols-1">
            <div class="field-item grid grid-cols-1">
              <label class="field-title" for="username"
                >Số điện thoại hoặc email</label
              >
              <input
                type="text"
                v-model="username"
                autofocus
                placeholder="Nhập tên cửa hàng"
              />
            </div>
            <div class="field-item grid grid-cols-1">
              <label class="field-title" for="password">Mật Khẩu</label>
              <input
                type="password"
                v-model="password"
                placeholder="Nhập Mật Khẩu"
              />
            </div>
          </form>
        </div>
        <div class="section-footer">
          <button @click="loginHandle" class="btn-login">Đăng Nhập</button>
        </div>
        <div class="register-shop">
          Bạn chưa có tài khoản?
          <span class="register-shop__link">Đăng kí ngay!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "../../stores/counter.js";
import { useStaffStore } from "../../stores/store.js";
const username = ref("hncp7@gmail.com");
const password = ref("Reset0103");
const router = useRouter();
const loginFunc = useLoginStore();
const loadStaff = useStaffStore();
import { format, isToday } from "date-fns";
const currentDate = new Date();
const today = format(currentDate, "yyyy-MM-dd");
console.log(loginFunc.check);
async function loginHandle() {
  // const res = await axios.post("https://x.ghtk.vn/api/fulfilment/auth/login", {
  //   username: this.username,
  //   password: this.password,
  // });
  // if (res.status === 200) {
  //   localStorage.setItem("acessToken", res.data.data.access_token);
  //   console.log(res.data.data);
  //   router.push("/staff/home");

  // }
  console.log(username.value);
  loadStaff.getStaff(today, today);
  loginFunc.getLogin(username.value, password.value);
  // setInterval((() => {console.log(loginFunc.user.id);}), 5000)
}

// import {computed} from "vue";

defineExpose({
  showPassword: false,
  password: null,
});
// computed()
// function toggleShow() {
//     return this.showPassword ? "Hide" : "Show";
//   }
// computed{
//   buttonShowHide() {
//     return this.showPassword ? "Hide" : "Show";
//   },
//   toggleShow() {
//     this.showPassword = !this.showPassword;
//   },
// });
</script>
<style scoped>

::placeholder {
  opacity: 0.4;
}
.login__page {
  background-color: #069255;
  padding: 200px;
}
.login-logo img {
  width: 214px;
  height: 62px;
  margin: 0 auto;
}
.section-header {
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 0;
}
.login-section {
  width: 350px;
  height: 50%;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
}
.section-form {
  padding: 15px;
}
 
.field-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
  height: 21px;
}
.field-item {
  margin-bottom: 15px;
}
.field-item input {
  height: 24px;
  outline: none;
  border-bottom: 1px solid #e8e8e8;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;

  /*outline-color: #069255;*/
}
.field-item input:focus {
  border-bottom: 1px solid #069255;
}

.section-footer {
  padding: 15px 10px;
  text-align: center;
}
.section-footer .btn-login {
  width: 100%;
  background-color: #069255;
  color: #fff;
  font-weight: 500;
  padding: 10px;
  border-radius: 5px;
}
.register-shop {
  padding-bottom: 15px;
  text-align: center;
}
.register-shop__link {
  font-size: 14px;
  color: #069255;
}
</style>
