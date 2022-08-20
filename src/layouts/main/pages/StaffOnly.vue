<template>
  <div class="m-3">
    <div class="staff-info grid grid-cols-3">
      <div class="staff-left ml-3 mr-3">
        <div class="staff-avt">
          <img
            :src="propsStaff.avatar"
            class="w-[64px] h-[64px rounded-[50%]"
            alt=""
          />
        </div>
        <div class="staff-status mt-3">
          <div class="drop-down relative"></div>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <div class="active-btn">
                <span v-if="propsStaff.active === 0">
                  <button class="staff-status-btn-temp text-amber-400">
                    {{ workStatus[propsStaff.active] }}
                    <i
                      data-v-c7a8b578=""
                      aria-hidden="true"
                      class="fa fa-angle-down"
                    ></i>
                  </button>
                </span>
                <span v-if="propsStaff.active === 1">
                  <button class="staff-status-btn-on">
                    {{ workStatus[propsStaff.active] }}
                    <i
                      data-v-c7a8b578=""
                      aria-hidden="true"
                      class="fa fa-angle-down"
                    ></i>
                  </button>
                </span>
                <span v-if="propsStaff.active === 2">
                  <button class="staff-status-btn-off text-red-500">
                    {{ workStatus[propsStaff.active] }}
                    <i
                      data-v-c7a8b578=""
                      aria-hidden="true"
                      class="fa fa-angle-down"
                    ></i>
                  </button>
                </span>
              </div>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  <button @click="setStatus(propsStaff.id, statusObj[1].value)">
                    Đang làm việc
                  </button>
                </a-menu-item>
                <a-menu-item key="0">
                  <button @click="setStatus(propsStaff.id, statusObj[0].value)">
                    Nghỉ tạm thời
                  </button>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="2">
                  <button @click="setStatus(propsStaff.id, statusObj[2].value)">
                    Đã nghỉ việc
                  </button>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="staff-right ml-6 mr-3">
        <div class="staff-name font-bold text-black">
          {{ propsStaff.fullname }}
        </div>
        <div class="staff-screen mt-2">
          <ul
            class="list-disc"
            v-for="staff_screen in propsStaff.screens"
            :key="staff_screen"
          >
            <li>
              {{ screenList[staff_screen] }}
            </li>
          </ul>
        </div>
      </div>
      <div class="below ml-6">
        <router-link :to="{ path: '/staff/view/' + propsStaff.id }">
          <button class="staff-status-btn-primary text-[#069255]">Xem</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import { format, isToday } from "date-fns";

const currentDate = new Date();
const today = format(currentDate, "yyyy-MM-dd");
const props = defineProps(["staff", "staffAll"]);
import { defineComponent } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useStaffStore } from "../../../stores/store";
const propsStaff = props.staff;
const propsBig = props.staffAll;
const getStatus = useStaffStore();

const screenList = reactive({
  sale: "Chats chốt đơn",
  order: "Đơn hàng",
  chat_ops: " Chats vận hành",
  statistic: "Tổng quan",
  customer: " Khách hàng",
  staff: "Nhân viên",
  product: "Kho và sản phẩm",
});

const workStatus = reactive({
  0: "Nghỉ tạm thời",
  1: "Đang làm việc",
  2: "Đã nghỉ việc",
});

const statusObj = reactive([
  {
    value: "0",
    name: "Nghỉ tạm thời",
  },
  {
    value: "1",
    name: "Đang làm việc",
  },
  {
    value: "2",
    name: "Đã nghỉ việc",
  },
]);

async function setStatus(shop_user_id, status) {
  console.log(status);
  getStatus.changeStatus(shop_user_id, status);
  getStatus.clearStaff();
  await getStatus.getStaff(today, today);
  console.log(today);
}
const isSeen = ref(false);
</script>

<style scoped>
.staff-status-btn-on {
  border-radius: 20px;
  font-size: 14px;
  padding: 2px 8px;
  color: #069255;
  border: 1px solid #069255;
}

.staff-status-btn-temp {
  border-radius: 20px;
  font-size: 14px;
  padding: 2px 8px;
  color: #ffc107;
  border: 1px solid #ffc107;
}

.staff-status-btn-off {
  border-radius: 20px;
  font-size: 14px;
  padding: 2px 8px;
  color: red;
  border: 1px solid red;
}

.staff-status-btn-primary {
  border-radius: 20px;
  font-size: 14px;
  padding: 2px 8px;
  color: #069255;
  border: 1px solid;
}
.show {
  display: block;
}
</style>
