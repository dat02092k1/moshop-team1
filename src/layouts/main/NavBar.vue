<template>
  <div>
    <div>
      <a-layout>
        <a-layout-header class="bg-[#069255] flex text-white px-5 h-[66px]">
          <div>
            <a
              class="h-full items-center text-[31px] text-white mr-3 font-bold"
              href=""
              >moshop</a
            >
          </div>

          <div>
            <ul class="flex">
              <li class="flex">
                <div
                  class="line w-[2px] h-[35px] bg-white text-white mt-3 mb-3 mr-3"
                ></div>
                <!-- <a class="font-bold text-[17px] text-white mr-3" href=""
                  >hncp7@gmail.com</a> -->
                <DropDown/>
                 
              </li>

              <li class="ml-5">
                <a href="" class="tooltip text-[20px] text-white">
                  <i class="fa-solid fa-chart-simple font-bold text-[20px]"></i
                  >Báo Cáo
                  <span class="tooltiptext text-[12px]">Báo cáo</span></a
                >
              </li>

              <li class="ml-5">
                <a href="" class="text-[20px] text-white">
                  <i class="fa-regular fa-user-group font-bold text-[20px]"></i>
                  Khách Hàng
                </a>
              </li>

              <li class="ml-5">
                <a href="" class="text-[20px] text-white">
                  <i
                    class="fa-regular fa-comment font-bold text-[20px] text-white"
                  ></i>
                  Chats
                </a>
              </li>

              <li class="ml-5">
                <a href="" class="text-[20px] text-white">
                  <i
                    class="fa-regular fa-video font-bold text-[20px] text-white"
                  ></i>
                  Lives
                </a>
              </li>

              <li @click="isActive()" class="ml-5 bg-white  ">
                <a href="" class="text-[20px] px-2 text-green-500">
                  <i
                    class="fa-regular fa-people-group font-bold text-[20px]"
                  ></i>
                  Nhân viên
                </a>
              </li>

              <li class="ml-5">
                <a href="" class="text-[20px] text-white">
                  <i
                    class="fa-regular fa-list-check font-bold text-[20px] text-white"
                  ></i>
                  Đơn Hàng
                </a>
              </li>

              <li class="ml-5 bg-[#da4838] px-2">
                <a class="text-[20px] text-white">
                  <i class="fa-regular fa-circle-up"></i>
                  Đăng Đơn
                </a>
              </li>
            </ul>
          </div>
        </a-layout-header>
      </a-layout>
    </div>
  </div>
</template>

<script setup>
import DropDown from './navbar/DropDown.vue';
let active = false;
function isActive() {
  active = true;
}
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  /* border-bottom: 1px dotted black; */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 100%;
  height: 50%;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
