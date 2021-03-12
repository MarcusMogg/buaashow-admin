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
import { login } from "@/api/user.js";

export default {
  name: "Login",
  data() {
    return {
      lock: "lock",
      loginForm: {
        account: "admin",
        password: "123456",
      },
    };
  },
  created() {},
  methods: {
    changeLock() {
      this.lock === "lock" ? (this.lock = "unlock") : (this.lock = "lock");
    },
    async submitForm() {
      const res = await login(this.loginForm);
      if (res.code === 200) {
        localStorage["token"] = res.data.token;
        this.$router.push({ name: "Layout" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/login.scss";
</style>
