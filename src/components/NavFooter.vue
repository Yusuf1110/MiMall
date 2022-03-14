<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="imgs/logo-footer.png" alt="" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:">MUCHFUN</a><span>|</span>
      <a href="https://mail.qq.com/" target="_blank">邮箱@29051099@qq.com</a
      ><span>|</span> <a href="javascript:">vue项目练习</a><span>|</span>
      <a href="javascript:">HelloWorld!</a>
    </div>
    <div class="copyright">
      Copyright ©2022 <span>mi.futurefe.com</span> All Right Reserved
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-footer",
};
</script>
<style lang="scss" > //scoped可以让改组件样式不污染其他组件
@import "../assets/scss/config.scss";
.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: $colorB;
  color: $colorD;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    margin-bottom: 13px;
    a {
      color: $colorD;
      display: inline-block;
    }
    span {
      margin: 0px 10px;
    }
  }
  .copyright span {
    color: $colorA;
  }
}
</style>