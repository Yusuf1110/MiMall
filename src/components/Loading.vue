<template>
  <div class="loading">
    <img src="imgs/loading-svg/loading-bubbles.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "loading",
};
</script>
<style lang="scss">
.loading {
  position: relative;
  display: inline-block;
  height: 100px;
  width: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80px;
    width: 80px;
  }
}
</style>