<template>
  <div>
    <div class="staff-info grid grid-cols-2">
      <div class="staff-left">
        <div class="staff-avt">
          <img
            :src="propsStaff.avatar"
            class="w-[64px] h-[64px rounded-[50%]"
            alt=""
          />
        </div>
        <div class="staff-status mt-3">
          <!-- <span v-if="propsStaff.active === 0">
            {{ workStatus[propsStaff.active] }}
          </span>  
          <span v-if="propsStaff.active === 1">
            {{ workStatus[propsStaff.active] }}
          </span> 
          <span v-if="propsStaff.active === 2">
            {{ workStatus[propsStaff.active] }}
          </span>      -->
          <div @click="isSeen = true" class="drop-down relative">
            <button class="staff-status-btn">
              Đang làm việc
              <i
                data-v-c7a8b578=""
                aria-hidden="true"
                class="fa fa-angle-down"
              ></i>
            </button>

            <div v-if="!isSeen" id="show" class="dropdown-menu absolute hidden">
              <div class="dropdown-item">
                <div class="active-item">
                  <img src="/_nuxt/img/check-circle-green.af1a7f4.svg" />
                </div>
                <div>Đang làm việc</div>
              </div>
              <div class="dropdown-item">
                <div class="active-item"></div>
                <div>Nghỉ tạm thời</div>
              </div>
              <div class="dropdown-item">
                <div class="active-item"></div>
                <div>Đã nghỉ việc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="staff-right ml-4">
        <div class="staff-name font-bold text-black">
          {{ propsStaff.fullname }}
        </div>
        <div class="staff-screen">
          <ul v-for="staff_screen in propsStaff.screens" :key="staff_screen">
            <li>
              {{ screenList[staff_screen] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const props = defineProps(["staff", "staffAll"]);
const propsStaff = props.staff;
const propsBig = props.staffAll;

const screenList = reactive({
  order: "Đơn hàng",
  chat_ops: " Chats vận hành",
  statistic: "Tổng quan",
  customer: " Khách hàng",
  staff: "Nhân viên",
});

const workStatus = reactive({
  0: "Đã nghỉ việc",
  1: "Nghỉ tạm thời",
  2: "Đã nghỉ việc",
});

const isSeen = ref(false);
</script>

<style scoped>
.staff-status-btn {
  border-radius: 20px;
  font-size: 14px;
  padding: 2px 8px;
  color: #069255;
  border: 1px solid #069255;
}

.show {
  display: block;
}
</style>
