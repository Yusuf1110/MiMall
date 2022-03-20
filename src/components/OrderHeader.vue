<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="left">
        <div class="log fl">
          <a href="/#/index"></a>
        </div>
        <div class="title fl">
          <h2>{{ title }} <slot name="tip"></slot></h2>
        </div>
      </div>
      <div class="right fr">
        <p>{{username}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState} from "vuex"
export default {
  name: "order-header",
  props: {
    title: String,
  },
  computed:{
    ...mapState(['username'])
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid $colorA;
  .left,
  .right {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .log,
  .title {
    display: inline-block;
  }
  a {
    @include bgImg(55px, 55px, "../../public/imgs/mi-home.png", 55px);
    background-color: $colorA;
  }
  .title {
    float: left;
    margin-left: 54px;
    h2 {
      font-size: 28px;
      color: $colorB;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: $colorD;
      font-weight: 200;
    }
  }
  .right {
    p {
      color: $colorC;
      font-size: 16px;
    }
  }
}
</style>