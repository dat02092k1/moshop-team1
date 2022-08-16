<template>
  <div class="head flex justify-between">
    <div class="head-back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
    <div class="head-action">
      <button class="btn-head-action" @click="handleSaveData">Lưu</button>
      <!--              <a-modal :visible="visible" title="Xác nhận đăng ký">-->
      <!--                <span>-->
      <!--                  <p>-->
      <!--                    Mã OTP vừa được gửi đến số điện thoại quý khách đã đăng ký! Vui-->
      <!--                    lòng nhập đúng mã OTP để hoàn thành.-->
      <!--                  </p>-->
      <!--                </span>-->
      <!--                <span>-->
      <!--                  <label for="">Mã OTP</label>-->
      <!--                  <input class="block" type="text" placeholder="Nhập mã OTP" />-->
      <!--                </span>-->
      <!--                <span class="mt-4">-->
      <!--                  <p>-->
      <!--                    Lưu ý: Nếu bạn không nhận dược sms báo mã OTP, vui lòng thử lại-->
      <!--                    hoặc mail về cskh@ghtk.vn để được hỗ trọ nhanh nhất!-->
      <!--                  </p>-->
      <!--                </span>-->
      <!--              </a-modal>-->
    </div>
  </div>
</template>

<script setup>
const handleSaveData=()=>{
  alert(123)
}
</script>

<style scoped></style>
