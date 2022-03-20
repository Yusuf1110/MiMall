<template>
  <div>
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span></span>
      </template>
    </order-header>
    <div></div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter.vue";
import ServiceBar from "../components/ServiceBar.vue";
import OrderHeader from "../components/OrderHeader.vue";
export default {
  components: {
    NavFooter,
    OrderHeader,
    ServiceBar,
  },
  name: "cart",
  data() {
    return {
      list: [], //商品列表
      allChecked: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0, //选中商品数量
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.axios.get("/carts").then((res) => {
        this.list = res.cartProductVoList || [];
      });
    },
  },
};
</script>