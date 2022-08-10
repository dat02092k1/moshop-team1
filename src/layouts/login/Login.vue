<template>
  <div class="product-form">
    <h3 class="text-xl my-3">Product Information</h3>
    <form>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label"
          >Tài khoản</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control border-solid border-2"
            id="inputName"
            v-model="username"
          />
          <div class="invalid-feedback" v-if="errors.name">
            {{ errors.name }}
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Mật khẩu
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control border-solid border-2"
            v-bind:class="{ 'is-invalid': errors.price }"
            v-model="password"
            id="inputPrice"
          />
          <div class="invalid-feedback" v-if="errors.price">
            {{ errors.price }}
          </div>
        </div>
      </div>

      <div class="btn">
        <button type="button" @click="login()" class="btn bg-blue-600 mr-1">
          Save
        </button>
        <button type="reset" class="btn bg-red-500 ml-1">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductForm",
  data() {
    return {
      errors: {
        name: "",
        price: "",
        description: "",
      },
      product: {
        name: "",
        price: "",
        description: "",
      },
      username: "hncp7@gmail.com",
      password: "Reset0103",
      // account: {
      //   username: 'hncp7@gmail.com',
      //   password: 'Reset0103'
      // }
    };
  },
  methods: {
    // async login() {
    //   console.log(this);
    //   var data = JSON.stringify({
    //     username: "hncp7@gmail.com",
    //     password: "Reset0103",
    //   });

    //   var config = {
    //     method: "post",
    //     url: "https://x.ghtk.vn/api/fulfilment/auth/login",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: data,
    //   };

    //   await axios(config)
    //     .then(function (response) {
    //       if (response.data.success) {
    //         localStorage.setItem("token", response.data.data.access_token);
    //         // const routes = [{ path: '/login', redirect: '/staff/home' }]
    //         this.$router.go("/staff/home");
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    async login(){
      const res = await axios.post('https://x.ghtk.vn/api/fulfilment/auth/login',
      {
        username:this.username,
        password: this.password,
      })
      // console.log(this);
      if(res.status === 200){
        localStorage.setItem('acessToken',res.data.data.access_token)
        this.$router.go("/staff/home");
      }
    }
  },
};
</script>
