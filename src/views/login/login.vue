<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="top" style="margin-top: 100px">
        <div class="header">
          <a href="/">
            <span class="title">Admin</span>
          </a>
        </div>
      </div>
      <div class="main">
        <el-form :model="loginForm" ref="loginForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.account">
              <i class="el-input__icon el-icon-user" slot="suffix"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="lock === 'lock' ? 'password' : 'text'"
              placeholder="请输入密码"
              v-model="loginForm.password"
            >
              <i
                :class="'el-input__icon el-icon-' + lock"
                @click="changeLock"
                slot="suffix"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item style="position: relative">
            <el-input
              v-model="loginForm.picPath"
              name="logVerify"
              placeholder="请输入验证码"
              style="width: 60%"
            />
            <div class="vPic">
              <img
                v-if="picPath"
                :src="picPath"
                width="100%"
                height="100%"
                alt="请输入验证码"
                @click="loginVefify()"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitForm"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login, captcha } from "@/api/user.js";

export default {
  name: "Login",
  data() {
    return {
      lock: "lock",
      loginForm: {
        account: "admin",
        password: "123456",
        picPath: "",
        captchaId: "",
      },
      logVerify: "",
      picPath: "",
    };
  },
  created() {
    this.loginVefify();
  },
  methods: {
    changeLock() {
      this.lock === "lock" ? (this.lock = "unlock") : (this.lock = "lock");
    },
    async submitForm() {
      const res = await login(this.loginForm);
      if (res.code === 200) {
        localStorage["token"] = res.data.token;
        this.$router.push("/");
      } else {
        this.loginVefify();
      }
    },
    loginVefify() {
      captcha({}).then((ele) => {
        this.picPath = ele.data.picPath;
        this.loginForm.captchaId = ele.data.captchaId;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/login.scss";
</style>
