<template>
  <div class="login__page">
    <!--    <button :class="$style.btn-test"></button>-->
    <div class="login-logo">
      <img src="../../../assets/moshop_logo.png" alt="" srcset="" />
    </div>
    <div class="login-section grid grid-cols-1">
      <p class="section-header">Đăng Nhập</p>
      <div class="section-form">
        <form action="" class="grid grid-cols-1">
          <div class="field-item grid grid-cols-1">
            <label class="field-title" for="username"
              >Số điện thoại hoặc email</label
            >
            <input type="text" autofocus placeholder="Nhập tên cửa hàng" />
          </div>
          <div class="field-item grid grid-cols-1">
            <label class="field-title" for="password">Mật Khẩu</label>
            <input type="password" placeholder="Nhập Mật Khẩu" />
            <!--            <div>-->
            <!--              <input-->
            <!--                v-if="showPassword"-->
            <!--                type="text"-->
            <!--                class="input"-->
            <!--                v-model="password"-->
            <!--              />-->
            <!--              <input v-else type="password" class="input" v-model="password" />-->
            <!--            </div>-->
            <!--            <div class="control is-expanded">-->
            <!--              <input v-if="showPassword" type="text" class="input" v-model="password" />-->
            <!--              <input v-else type="password" class="input" v-model="password">-->
            <!--            </div>-->
            <!--            <i class="fa-solid fa-eye"></i>-->

            <!--            <button class="button" @click="toggleShow"><span class="icon is-small is-right">-->
            <!--									<i class="fas"-->
            <!--                     :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>-->
            <!--								</span>-->
            <!--            </button>-->
            <!--            <input-->
            <!--              type="password"-->
            <!--              id="password-field"-->
            <!--              placeholder="Nhập Mật Khẩu"-->
            <!--              @click="toggleShow"-->
            <!--            />-->
          </div>
        </form>
      </div>
      <div class="section-footer">
        <button class="btn-login">Đăng Nhập</button>
      </div>
      <div class="register-shop">
        Bạn chưa có tài khoản?
        <span class="register-shop__link">Đăng kí ngay!</span>
      </div>
    </div>
  </div>
</template>
<script setup>
// import {ref, computed } from "vue";

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
.btn-test {
  background-color: red;
  width: 100px;
  height: 100px;
}
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
.section-form form {
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
