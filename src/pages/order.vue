<template>
  <div>
    <order-header :title="title">
      <template slot="tip">
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter.vue";
import ServiceBar from "../components/ServiceBar.vue";
import OrderHeader from "../components/OrderHeader.vue";
export default {
  name: "order",
  data() {
    return {
      title: "",
      tip: "",
    };
  },
  components: {
    NavFooter,
    ServiceBar,
    OrderHeader,
  },
  mounted() {
    let path = this.$route.path;
    if (path == "/order/confirm") {
      this.title = '确认订单';
      this.tip  = '请认真核对订单信息';
    }
    if (path == "/order/list") {
      this.title = '订单列表';
      this.tip  = '谨防钓鱼链接或诈骗电话';
    }
    if (path == "/order/pay") {
      this.title = '订单支付';
      this.tip  = '谨防钓鱼链接或诈骗电话';
    }
  },
};
</script>