<template>
  <div class="layout">
    <div class="page__header grid grid-cols-1 md:grid-cols-2">
      <div class="left__content">
        <div class="info">
          <h1 class="info__title">Quản lý nhân viên</h1>
          <div class="info__live">
            <div class="live__icon">
              <div class="live__icon--ringing"></div>
              <div class="live__icon--circle"></div>
            </div>
            <div class="live__title">Live ( Cập nhật 15:15 )</div>
          </div>
        </div>
        <div class="filter">
          <button class="btn__filter">Hôm Nay</button>
          <button class="btn__filter">Tuần Này</button>
          <button class="btn__filter">Tháng Này</button>
          <button class="btn__filter">Tuỳ Chọn</button>
        </div>
      </div>

      <div class="right__content">
        <a-modal
          v-model:visible="visible"
          title="Cài đặt KPIs nhân viên"
          @ok="handleOk"
        >
          <h2>Phân công Nhân Viên Chat</h2>
          <h3>NV Online</h3>
          <a-radio-group v-model:value="valueRadio">
            <a-radio class="radioStyle" :value="1"
              >Nhận tất cả hội thoại</a-radio
            >
            <a-radio class="radioStyle" :value="2"
              >Nhận phần hội thoại được chia đều</a-radio
            >
            <a-radio class="radioStyle" :value="3"
              >Nhận phần hội thoại bấm xem trước tiên</a-radio
            >
            <a-radio class="radioStyle" :value="4"
              >Nhận tất cả hội thoại</a-radio
            >
            <a-radio class="radioStyle" :value="5"
              >Nhận phần hội thoại trả lời trước tiên</a-radio
            >
          </a-radio-group>
          <h3>NV Offline</h3>
          <a-radio-group>
            <a-radio class="radioStyle"
              >Tiếp tục hội thoại sau khi Offline</a-radio
            >
            <a-radio class="radioStyle"
              >Chuyển hội thoại chưa trả lời cho NV Online</a-radio
            >
            <button></button>
          </a-radio-group>
        </a-modal>
        <button class="btn-action" @click="showModalKpi">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span> KPIs nhân viên </span>
        </button>
        <button class="btn-action">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span> Thêm nhân viên </span>
        </button>
      </div>
    </div>
    <!--    <div class="staff-management">-->
    <!--      <a-table-->
    <!--        :columns="fixedColumns"-->
    <!--        :data-source="fixedData"-->
    <!--        :scroll="{ x: 2000, y: 500 }"-->
    <!--        bordered-->
    <!--      >-->
    <!--      </a-table>-->
    <!--    </div>-->
    <div class="staff-management">
      <table class="table-fixed">
        <thead>
          <tr>
            <th>Nhân viên</th>
            <th>KH tương tác</th>
            <th>KH có SĐT</th>
            <th>KH đã gọi</th>
            <th>ĐH đã chốt</th>
            <th>Tỷ lệ chốt</th>
            <th>ĐH thành công</th>
            <th>ĐH hoàn</th>
            <th>Doanh thu</th>
            <th>Phí hoàn</th>
            <th>TG phan hoi TB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="20%">
              <div class="staff flex">
                <div class="staff-info flex mr-10">
                  <div class="staffLeft">
                    <div class="staffLeft-avatar">
                      <img
                        src="https://cache.giaohangtietkiem.vn/image/show/c8eef17f-0a18-49c9-981a-3e69c96d8d4f/f6226f4f-9817-40c1-ae1a-4fb63376f95f.png"
                        alt=""
                      />
                    </div>
                    <div class="staff-status">
                      <div class="select-dropdown">
                        <select>
                          <option value="Option 1">Đang làm việc</option>
                          <option value="Option 2">Nghỉ tạm thời</option>
                          <option value="Option 3">Đã nghỉ việc</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="staffCenter">
                    <div class="staff-name font-bold">Huongcm</div>
                    <ul class="staffCenter__screens">
                      <li>Chat chốt đơn</li>
                      <li>Tổng quan</li>
                      <li>Khách hàng</li>
                      <li>Chats vận hành</li>
                      <li>Đơn hàng</li>
                    </ul>
                  </div>
                </div>

                <div class="staffRight">
                  <a class="btn-view-staff"> Xem</a>
                </div>
              </div>
            </td>
            <td width="8%">Malcolm</td>
            <td width="7%">1961</td>
            <td width="7%">The Sliding</td>
            <td width="7%">Malcolm</td>
            <td width="7%">1961</td>
            <td width="7%">The Sliding</td>
            <td width="7%">Malcolm</td>
            <td width="7%">1961</td>
            <td width="7%">Malcolm</td>
            <td width="7%">1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

// Modal!!!
const visible = ref(false);

const showModalKpi = () => {
  visible.value = true;
};

const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const valueRadio = {};
// Table data

// const fixedColumns = ref([
//   {
//     title: "nhan vien",
//     dataIndex: "name_staff",
//     fixed: true,
//     width: "10%",
//   },
//   {
//     title: "Nhân viên",
//     dataIndex: "kh_tuongtac",
//     sorter: (a, b) => a - b,
//     width: "8%",
//   },
//   {
//     title: "KH có SĐT",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "KH đã gọi",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "ĐH đã chốt",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "Tỷ lệ chốt",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "ĐH thành công",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "ĐH hoàn",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "Doanh thu",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "Phí Hoàn",
//     dataIndex: "",
//     width: "8%",
//   },
//   {
//     title: "TG phản hồi TB",
//     dataIndex: "",
//     width: "8%",
//   },
// ]);
//
// const fixedData = ref([]);
//
// for (let i = 0; i < 15; i += 1) {
//   fixedData.value.push({
//     key: i,
//     name_staff: ["Light", "Bamboo", "Little"][i % 3],
//     kh_tuongtac: [20, 10, 30][i % 3],
//     smksdmlsd: "Everything that has a beginning, has an end.",
//   });
// }

defineExpose({
  // fixedColumns,
  // fixedData,
  visible,
  showModalKpi,
  handleOk,
});
</script>
<style scoped>
.page__header {
  display: flex;
  justify-content: space-between;
  /*padding: 0px 0px 20px 0px;*/
  padding-bottom: 20px;
}
.info {
  display: flex;
}
.info__title {
  font-size: 40px;
  font-weight: 700;
  margin-right: 26px;
}
.info__live {
  /*display: flex;*/
  font-style: italic;
  padding-left: 5px;
  padding-top: 10px;
}
.live__icon {
  position: relative;
  top: -2px;
}
.live__title {
  margin: 15px 40px 0;
}

.live__icon--circle {
  width: 9px;
  height: 9px;
  background-color: #ff5d5d;
  border-radius: 50%;
  position: absolute;
  top: 23px;
  left: 23px;
}

.live__icon--ringing {
  border: 3px solid #ff5d5d;
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: absolute;
  left: 15px;
  top: 15px;
  -webkit-animation: ringing 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
}
@-webkit-keyframes ringing {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.1, 1.1);
    opacity: 0;
  }
}
/*//filter//*/
.btn__filter {
  padding: 6px 20px;
  margin: 0px 15px 10px 0px;
  color: #069255;
  background-color: rgb(239, 239, 239);
  border-radius: 15px;
  font-weight: 400;
}
.btn__filter:hover {
  background-color: #069255;
  color: #ffffff;
}
.btn-action {
  display: flex;
  width: 182px;
  /*height: 50px;*/
  padding: 10px 20px;
  background-color: #069255;
  color: #ffffff;
  font-weight: 500;
  border-radius: 25px;
}
.btn-action svg {
  margin-right: 5px;
}
.btn-action:last-child {
  margin-top: 20px;
}
.right__content {
  margin-top: 20px;
}
/*////table*/
/*#components-table-demo-summary tfoot th,*/
/*#components-table-demo-summary tfoot td {*/
/*  background: #fafafa;*/
/*}*/
.staff-management table th,
td {
  border: 1px solid silver;
}
.staff-management table th {
  height: 100px;
  text-align: left;
}
.staff-management table th:first-child {
  text-align: center;
}
.staff-management table td {
  text-align: center;
}
/*dropdown select*/
.select-dropdown,
.select-dropdown * {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}
.select-dropdown {
  position: relative;
  background-color: #e6e6e6;
  border-radius: 4px;
}
.select-dropdown select {
  font-size: 1rem;
  font-weight: normal;
  max-width: 100%;
  padding: 8px 24px 8px 10px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.select-dropdown select:active,
.select-dropdown select:focus {
  outline: none;
  box-shadow: none;
}
.select-dropdown {
  width: 50%;
  background-color: white;
  border: 1px solid silver;
  border-radius: 20px;
}
.select-dropdown:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  width: 0;
  height: 0;
  margin-top: -2px;
  border-top: 5px solid #aaa;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}

/*staff-center*/
.staffCenter__screens {
  text-align: left;
  list-style: disc outside;
}
.staffCenter__screens li {
  color: silver;
}
.btn-view-staff {
  width: 100px;
  color: #069255;
  padding: 3px 10px;
  border: 1px solid #069255;
  border-radius: 20px;
}
.radioStyle {
  display: block;
  height: 30px;
  lineheight: 30px;
}
</style>
