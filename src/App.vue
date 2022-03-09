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
  },
};
</script>

<style>
@import "./assets/scss/reset.scss";
</style>
