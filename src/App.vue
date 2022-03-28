<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import storage from "./storage";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {
    //本地加载请求静态mock
    // this.axios.get("mock/user/login").then((res) => {
    //   this.res = res;
    // });
    //通过
    // this.axios.get("/user/login").then((res) => {
    //   this.res = res;
    // });
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get("/user").then((res) => {
        //  /user 有问题
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res) => {
        // window.console.log(res);
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style lang="scss">
//引入注意顺序

@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/mixin.scss";
@import "./assets/scss/base.scss";
@import "./assets/scss/button.scss";

</style>
