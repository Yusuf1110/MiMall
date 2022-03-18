<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
        <button class="btn">立即购买</button>
      </template>
    </product-param>
    <div class="test">123</div>
  </div>
</template>

<script>
import ProductParam from "./../components/ProductParam";

export default {
  name: "product",
  components: {
    ProductParam,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/button.scss";
.product{
  button{
    margin-left: 10px;
  }

}
  .test{
  height: 1000px;
  background-color: green;
}

</style>