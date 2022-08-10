<template>
  <a-space>
    <a-select
      ref="select"
      v-model:value="value1"
      :size="size"
      style="width: 100%"
      @focus="focus"
      @change="handleChange"
    >
      <a-select-option value="jack">0355263237, Huyện Hòa Vang, Đà Nẵng</a-select-option>
      <a-select-option value="lucy">Tòa CT2B chung cư Nghĩa Đô ngõ 106, Quận Cầu Giấy, Hà Nội</a-select-option>
      <a-select-option value="Yiminghe">mtd số 15 ngõ 29/4 , Quận Thanh Xuân, Hà Nội</a-select-option>
    </a-select>
  </a-space>

  
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const options1 = ref([
      {
        value: "jack",
        label: "Jack",
      },
      {
        value: "lucy",
        label: "Lucy",
      },
      {
        value: "yiminghe",
        label: "Yiminghe",
      },
    ]);
    const options2 = ref([
      {
        value: "lucy",
        label: "Lucy",
      },
    ]);
    const options3 = ref([
      {
        value: "lucy",
        label: "Lucy",
      },
    ]);

    const focus = () => {
      console.log("focus");
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    return {
      focus,
      handleChange,
      value1: ref("lucy"),
      value2: ref("lucy"),
      value3: ref("lucy"),
      options1,
      options2,
      options3,
    };
  },
});
</script>
