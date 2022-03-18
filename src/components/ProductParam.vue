<template>
  <div class="nav-bar" :class="{ is_sticky: isSticky }">
    <div class="container">
      <div class="pro-title">小米8</div>
      <div class="pro-param">
        <a href="javascript:;">概述<span>|</span></a>
        <a href="javascript:;">参数<span>|</span></a>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      isSticky: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let top = window.pageYOffset||window.body.scrollTop ;
      if(top > 221 ) this.isSticky = true ;
      if(top < 151 ) this.isSticky = false ;
    },
  },
  destroyed(){
    window.removeEventListener('scroll',this.initHeight,false);
  }
};
</script>

<style lang='scss'>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.nav-bar {
  background-color: $colorG;
  height: 70px;
  line-height: 70px;
  border: 1px, solid $colorH;
  transition: top 0.7s;
  top:-100px;
  &.is_sticky {
    position: sticky; //还有另一种方式就是使用fixed，但是需要获取网页的高度
    top: 0;
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>