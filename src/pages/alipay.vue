<template>
  <div class="ali-pay">
    <loading v-if="Loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from "./../components/Loading.vue";
export default {
  name: "alipay",
  components: {
    Loading,
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "", //后端返回码
      Loading: true,
    };
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "Vue高仿小米商城",
          amount: 0.01, //测试1分
          payType: 1, //1支付宝，2微信
        })
        .then((res) => {
          this.content = res.content;
          setTimeout(() => {
            //等待渲染
            document.forms[0].submit(); //返回的是form
          }, 100);
        });
    },
  },
};
</script>
<style lang="scss">
</style>
