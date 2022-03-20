<template>
  <!-- 只能有一个根元素 -->
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="backLogin">登录</a>
          <a href="javascript:;">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"
            ><span class="icon-cart"></span>购物车{{cartCount}}</a
          >
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-log">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <!-- key可以缓存数据 -->
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Radmi手机</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-1.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米壁画电视65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-2.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-3.png" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-4.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-5.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="imgs/nav-img/nav-3-6.png" alt="" />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">小米电视</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-header",
  /* vue中data必须是函数是为了保证组件的独立性和可复用性,data是一个函数,组件实例化的时候这个函数将会被调用,返回一个对象,计算机会给这个对象分配一个内存地址,你实例化几次,就分配几个内存地址,他们的地址都不一样,所以每个组件中的数据不会相互干扰,改变其中一个组件的状态,其它组件不变。*/
  data() {
    return {
      // username:this.$store.state.username;这里不可以这样用，看下面
      phoneList: [],
    };
  },
  filters: {
    //过滤器
    currency(val) {
      if (!val) {
        return "0";
      }
      return "￥" + val.toFixed(2) + "元";
    },
  },
  computed:{  //因为在渲染时先获取了空的undefine的值，渲染好了才计算出username,所以在这里使用计算属性，一旦username改变，就会重新计算赋值；
    username(){
      return this.$store.state.username;
    },
    cartCount(){
      let count =this.$store.state.cartCount;
      return count!==undefined? "("+this.$store.state.cartCount+")":"(0)";
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    backLogin() {
      this.$router.push({ path: '/login' });
    },
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6,
          },
        })
        .then((res) => {
          this.phoneList = res.list;
          // if(res.list.length>=6){
          //   this.phoneList = res.list.slice(0,6);
          // }
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
        &:last-child {
          margin: 0px;
        }
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-log {
        display: inline-block;
        width: 55px;
        height: 55px;
        background: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            // scss设置伪类
            content: " "; // 占位
            @include bgImg(55px, 55px, "../../public/imgs/mi-logo.png", 55px);
            margin-left: 0;
            transition: 500ms;
          }
          &:after {
            content: " ";
            @include bgImg(55px, 55px, "../../public/imgs/mi-home.png", 55px);
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin-left 500ms;
          }
        }
      }
      .header-menu {
        display: inline-block;
        padding-left: 209px;
        width: 643px;
        .item-menu {
          color: #333333;
          display: inline-block;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 100%;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0; //动画初始状态
            overflow: hidden;
            transition: all 500ms;
            border-top: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            background-color: #ffffff;
            .product {
              position: relative;
              float: left; //图片浮动一般使用float
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              &:before {
                content: " ";
                position: absolute;
                top: 28px;
                right: 0px;
                border-left: 1px solid $colorF;
                width: 1px;
                height: 100px;
              }
              &:last-child:before {
                display: none;
              }
            }
            a {
              display: inline-block;
              img {
                height: 110px;
                width: auto;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          border: solid 1px #e0e0e0;
          height: 50px;
          display: flex;
          align-items: center;
          input {
            height: 50px;
            width: 264px;
            box-sizing: border-box;
            border: none;
            border-right: solid 1px #e0e0e0;
            padding-left: 14px;
          }
          a {
            @include bgImg(
              18px,
              18px,
              "../../public/imgs/icon-search.png",
              contain
            );
            //background-size: contain; //背景充满
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>>
