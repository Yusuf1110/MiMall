<template>
  <div class="login">
    <div class="container">
      <div class="login-header">
        <a href="/#/index">
          <img src="/imgs/login-logo.png" />
        </a>
      </div>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span
            ><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box" @click="login">
            <a href="javascript:;" class="btn">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <div class="footer-link">
        <a href="javascript:">MUCHFUN</a><span>|</span>
        <a href="https://mail.qq.com/" target="_blank">邮箱@29051099@qq.com</a
        ><span>|</span> <a href="javascript:">vue项目练习</a><span>|</span>
        <a href="javascript:">HelloWorld!</a>
      </div>
      <p class="copyright">
        Copyright ©2022 <span>mi.futurefe.com</span> All Right Reserved
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    register() {
      const { username, password } = this;
      this.axios
        .post("/user/register", {
          username,
          password,
          email: "yusuf@163.com",
        })
        .then(() => {
          alert("注册成功");
        });
    },
    login() {
      let { username, password } = this; //es6语法/也可以用username=this.username;
      this.axios
        .post("/user/login", {
          username, //这里是因为key值和上面的一样所以可以简写/ username:username
          password,
        })
        .then((res) => {
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.$store.dispatch("saveUserName", res.username);
          this.$router.push({
            name: "index",
            params: {
              from: "login",
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
.login {
  .login-header {
    height: 113px;
    img {
      height: 100%;
      width: auto;
    }
  }
  .login-body {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      position: relative;
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: $colorG;
        position: absolute;
        bottom: 29px;
        right: 0px;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
        }
        input {
          width: 100%;
          height: 100%;
          padding: 18px;
          vertical-align: middle;
        }
        .btn {
          width: 100%;
          line-height: 50px;
          height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .login-footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>template