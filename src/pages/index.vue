<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub ? '/#/product/' + sub.id : 'javascript:;'">
                      <img
                        :src="sub ? sub.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : "小米9" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/' + item.id"><img :src="item.img" /></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
        </swiper>
      </div>
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          :key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="" />
        </a>
      </div>
    </div>

    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'imgs/mix-alpha.jpg'" alt="" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, index) in phoneList" :key="index">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="" />
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">{{ item.price }}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="3"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="cancel"
    >
      <template v-slot:body>
        <p>{{isShowModule}}</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar.vue";
import Modal from "../components/Modal.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "index",
  components: {
    ServiceBar,
    Modal,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 60,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      slideList: [
        {
          id: "42",
          img: "imgs/slider/slide-1.jpg",
        },
        {
          id: "45",
          img: "imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "imgs/slider/slide-3.jpg",
        },
        {
          id: " ",
          img: "imgs/slider/slide-4.jpg",
        },
        {
          id: " ",
          img: "imgs/slider/slide-5.jpg",
        },
      ],
      menuList: [
        [
          {
            id: 30,
            name: "小米CC9",
            img: "/imgs/item-box-1.png",
          },
          {
            id: 31,
            name: "小米8青春版",
            img: "/imgs/item-box-2.png",
          },
          {
            id: 32,
            name: "Redmi K20 Pro",
            img: "/imgs/item-box-3.jpg",
          },
          {
            id: 33,
            name: "移动4G专区",
            img: "/imgs/item-box-4.jpg",
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png",
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg",
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png",
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg",
        },
      ],
      phoneList: [],
      showModal: false,
      addSuccess :false,
    };
  },
  computed:{
    isShowModule:function(){
      return this.addSuccess?"加入购物车成功！":"添加失败！";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          this.phoneList = [res.list.slice(6, 10), res.list.slice(10, 14)];
        });
    },
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true,
        })
        .then((res) => {
          this.showModal = true;
          this.addSuccess = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        }).catch(()=>{
          this.addSuccess = false;
          this.showModal = true;
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>
<style lang="scss" >
@import "../assets/scss/config.scss";
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
//最好从根路径开始定义，避免污染其他组件
.index {
  .swiper-box {
    .nav-menu {
      box-sizing: border-box;
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 5;
      padding: 26px 0px;
      background-color: #3333334d;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            display: block;
            position: relative; //其实绝对定位就是脱离文档流，子元素会向上找父级或父级的父级有没有定位，会一直向上推
            font-size: 16px;
            color: $colorG;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            transition: all 500ms;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1; //让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
                padding-left: 23px;
              }
              a {
                font-size: 14px;
                color: $colorB;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      .swiper-button-prev {
        left: 274px;
      }
      height: 451px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 30px;
    margin-top: 20px;
  }
  .product-box {
    background-color: $colorJ;
    padding: auto;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      margin-right: 16px;
      .banner-left {
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0px;
          }
          .item {
            width: 236px;
            background-color: $colorG;
            height: 302px;
            text-align: center;
            span {
              display: inline-block; //span是行内元素，只有文字，没有外围的block，所以得设为inline-block后面设width才有用
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px; // 可以实现文本居中
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                height: 195px;
                width: 190px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &::after {
                  //& 表示上一级选择器
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>