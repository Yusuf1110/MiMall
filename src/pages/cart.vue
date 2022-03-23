<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                :class="{ checked: allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  v-bind:class="{ checked: item.productSelected }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="" />
                <span>{{
                  item.productName + " , " + item.productSubtitle
                }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
          <div class="item-fooer">
            <div class="left">
              <a href="/#/index">继续购物</a>
              <p>
                共 <span>{{ cartSum }}</span> 件商品,已选择
                <span>{{ checkedNum }}</span> 件
              </p>
            </div>
            <div class="right">
              <p>
                合计:  <span>{{ cartTotalPrice }}</span> &nbsp; 元
              </p>
              <a href="javascript:;" class="btn" @click="order">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  computed: {
    cartSum() {
      return this.list.length;
    },
  },
  methods: {
    getCartList() {
      this.axios.get("/carts").then((res) => {
        this.list = res.cartProductVoList || [];
        this.renderData(res);
      });
    },
    // 公共赋值
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkedNum = this.list.filter((item) => item.productSelected).length; //filter返回的是一个数组
    },
    // 控制全选功能
    toggleAll() {
      let url = this.allChecked ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then((res) => {
        this.renderData(res);
      });
    },
    updateCart(item, type) {
      let quantity = item.quantity,
        selected = item.productSelected;
      if (type == "-") {
        if (quantity == 1) {
           this.$Message.warning("商品至少保留一件");
          return;
        }
        --quantity;
      } else if (type == "+") {
        if (quantity > item.productStock) {
          this.$Message.warning("购买数量不能超过库存数量");
          return;
        }
        ++quantity;
      } else {
        selected = !item.productSelected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected,
        })
        .then((res) => {
          this.renderData(res);
        });
    },
    // 删除购物车商品
    delProduct(item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        this.renderData(res);
        this.$Message.success("删除成功");
      });
    },
    order(){
        if(this.checkedNum===0){
          this.$Message.warning('请选择一件商品');
        }else{
          this.$router.push('/order/confirm');
        }
    }
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.cart {
  .wrapper {
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart {
      background-color: $colorG;
      font-size: 14px;
      color: $colorD;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid $colorH;
        vertical-align: middle;
        margin-right: 17px;
        margin-left: 30px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
    }
    .cart-item-list {
      .cart-item {
        display: flex;
        align-items: center;
        height: 125px;
        border-top: 1px solid #e5e5e5;
        font-size: 16px;
        .item-check {
          flex: 1;
        }
        .item-name {
          flex: 3;
          font-size: 18px;
          color: #333333;
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
          }
        }
        .item-price {
          flex: 1;
          color: #333333;
        }
        .item-num {
          flex: 2;
          .num-box {
            display: inline-block; //为什么会自动对齐
            width: 150px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #e5e5e5;
            font-size: 14px;
            a {
              display: inline-block;
              width: 50px;
              color: #333333;
            }
            span {
              display: inline-block;
              width: 50px;
              color: #333333;
            }
          }
        }
        .item-total {
          flex: 1;
          color: #ff6600;
        }
        .item-del {
          flex: 1;
          width: 14px;
          height: 12px;
          background: url("/imgs/icon-close.png") no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }
    }
    .item-fooer {
      font-size: 14px;
      color: $colorC;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      @include flex();
      .left {
        margin-left: 47px;
        a,
        p {
          display: inline-block;
        }
        a {
          color: $colorC;
          margin-right: 37px;
        }
        p {
          span {
            color: $colorA;
            margin: 0 5px;
          }
        }
      }
      .right {
        p {
          font-size: 14px;
          color: $colorA;
          span {
            font-size: 24px;
            vertical-align: middle;
          }
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
        p,
        a {
          display: inline-block;
        }
      }
    }
  }
}
</style>