<template>
  <el-container class="layout-cont">
    <el-container
      :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']"
    >
      <el-row
        :class="[isShadowBg ? 'shadowBg' : '']"
        @click.native="changeShadow()"
      ></el-row>
      <el-aside class="main-cont main-left">
        <div class="tilte">
          <img alt class="logoimg" src="~@/assets/nav_logo.png" />
          <h2 class="tit-text" v-if="isSider">Admin</h2>
        </div>
        <Aside class="aside" />
      </el-aside>
      <!-- 分块滑动功能 -->
      <el-main class="main-cont main-right">
        <transition
          :duration="{ enter: 800, leave: 100 }"
          mode="out-in"
          name="el-fade-in-linear"
        >
          <div
            :style="{
              width: `calc(100% - ${
                isMobile ? '0px' : isCollapse ? '54px' : '220px'
              })`,
            }"
            class="topfix"
          >
            <el-row>
              <el-header class="header-cont">
                <el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1">
                  <div @click="totalCollapse" class="menu-total">
                    <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                    <i class="el-icon-s-fold" v-else></i>
                  </div>
                </el-col>
                <el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14">
                  <el-breadcrumb
                    class="breadcrumb"
                    separator-class="el-icon-arrow-right"
                  >
                    <el-breadcrumb-item
                      :key="item.path"
                      v-for="item in matched.slice(1, matched.length)"
                      >{{ item.meta.title }}</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
              </el-header>
            </el-row>
          </div>
        </transition>
        <transition mode="out-in" name="el-fade-in-linear">
          <keep-alive>
            <router-view
              :key="$route.fullPath"
              v-loading="loadingFlag"
              element-loading-text="正在加载中"
              class="admin-box"
              v-if="$route.meta.keepAlive && reloadFlag"
            ></router-view>
          </keep-alive>
        </transition>
        <transition mode="out-in" name="el-fade-in-linear">
          <router-view
            :key="$route.fullPath"
            v-loading="loadingFlag"
            element-loading-text="正在加载中"
            class="admin-box"
            v-if="!$route.meta.keepAlive && reloadFlag"
          ></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/views/layout/aside";
export default {
  name: "Layout",
  data() {
    return {
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag: false,
      reloadFlag: true,
      value: "",
    };
  },
  components: {
    Aside,
  },
  methods: {
    reload() {
      this.reloadFlag = false;
      this.$nextTick(() => {
        this.reloadFlag = true;
      });
    },
    totalCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isSider = !this.isCollapse;
      this.isShadowBg = !this.isCollapse;
      this.$bus.emit("collapse", this.isCollapse);
    },
    toPerson() {
      this.$router.push({ name: "person" });
    },
    changeShadow() {
      this.isShadowBg = !this.isShadowBg;
      this.isSider = !!this.isCollapse;
      this.totalCollapse();
    },
  },
  computed: {
    title() {
      return this.$route.meta.title || "当前页面";
    },
    matched() {
      return this.$route.matched;
    },
  },
  mounted() {
    let screenWidth = document.body.clientWidth;
    if (screenWidth < 1000) {
      this.isMobile = true;
      this.isSider = false;
      this.isCollapse = true;
    } else if (screenWidth >= 1000 && screenWidth < 1200) {
      this.isMobile = false;
      this.isSider = false;
      this.isCollapse = true;
    } else {
      this.isMobile = false;
      this.isSider = true;
      this.isCollapse = false;
    }
    this.$bus.emit("collapse", this.isCollapse);
    this.$bus.emit("mobile", this.isMobile);
    this.$bus.on("reload", this.reload);
    this.$bus.on("showLoading", () => {
      this.loadingFlag = true;
    });
    this.$bus.on("closeLoading", () => {
      this.loadingFlag = false;
    });
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (screenWidth < 1000) {
          this.isMobile = true;
          this.isSider = false;
          this.isCollapse = true;
        } else if (screenWidth >= 1000 && screenWidth < 1200) {
          this.isMobile = false;
          this.isSider = false;
          this.isCollapse = true;
        } else {
          this.isMobile = false;
          this.isSider = true;
          this.isCollapse = false;
        }
        this.$bus.emit("collapse", this.isCollapse);
        this.$bus.emit("mobile", this.isMobile);
      })();
    };
  },
};
</script>
<style lang="scss">
@import "@/style/mobile.scss";
</style>
