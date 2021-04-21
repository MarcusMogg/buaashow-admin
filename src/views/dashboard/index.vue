<template>
  <div class="big">
    <el-row>
      <div class="card">
        <el-col :xs="24" :lg="16" :md="16">
          <div class="car-left">
            <el-row>
              <div>
                <el-col :xs="20" :lg="12" :md="12">
                  <div class="text">
                    <h4>欢迎，管理员， 请开始您一天的工作吧！</h4>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-card shadow="hover">
        <h2>
          管理员使用手册：<a
            style="color: #409eff"
            target="view_window"
            href="https://www.yuque.com/sd6csu/ngd5zk/bcugiw"
            >https://www.yuque.com/sd6csu/ngd5zk/bcugiw</a
          >
        </h2>
        <br />

        <div></div>
      </el-card>
    </el-row>

    <div class="bottom">
      <el-row>
        <el-card class="box-card">
          <div class="text item">
            <span>课程数量:{{ state.Course }}</span>
            <a
              style="color: #409eff"
              target="view_window"
              href="https://www.yuque.com/sd6csu/ngd5zk/bcugiw"
              >了解详情</a
            >
          </div>
          <br />
          <hr />
          <div class="text item">
            <span>作业数量:{{ state.Exp }}</span>
            <a
              style="color: #409eff"
              target="view_window"
              href="https://www.yuque.com/sd6csu/ngd5zk/bcugiw"
              >了解详情</a
            >
          </div>
          <br />
          <hr />
          <div class="text item">
            <span>用户数量:{{ state.User }}</span>
          </div>
          <br />
          <hr />
          <div class="textitem">
            <span>用户提交的作品数量:{{ state.Submit }}</span>
          </div>
          <br />
          <hr />
          <div class="textitem">
            <span>教师推荐的作品数量:{{ state.Rec }}</span>
          </div>
          <br />
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getCnt } from "@/api/system.js";
export default {
  name: "dashboard",
  data() {
    return {
      state: {},
    };
  },
  created() {
    this.reload();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    async reload() {
      const { data } = await getCnt();
      this.state = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.big {
  margin: 100px 0 0 0;
  padding-top: 0;
  background-color: rgb(243, 243, 243);
  padding-top: 15px;
  .top {
    width: 100%;
    height: 360px;
    margin-top: 20px;
    overflow: hidden;
    .chart-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: #fff;
    }
  }
  .mid {
    width: 100%;
    height: 380px;
    .chart-wrapper {
      height: 340px;
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .bottom {
    width: 100%;
    height: 300px;
    // margin: 20px 0;
    .el-row {
      margin-right: 4px !important;
    }
    .chart-player {
      width: 100%;
      height: 270px;
      padding: 10px;
      background-color: #fff;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-top: 18px;
  }
}
</style>
