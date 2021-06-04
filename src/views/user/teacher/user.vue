<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input
            placeholder="12345678"
            v-model="searchInfo.account"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser" type="primary">添加教师</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="账号" min-width="150" prop="id"></el-table-column>
      <el-table-column
        label="姓名"
        min-width="150"
        prop="name"
      ></el-table-column>
      <el-table-column label="用户角色" min-width="150" prop="role">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            authOptions[scope.row.role]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <div style="display: inline">
            <el-popover placement="top" width="160" v-model="scope.row.visible">
              <p>确定要删除此用户吗</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.visible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteUser(scope.row)"
                  >确定</el-button
                >
              </div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                slot="reference"
                >删除</el-button
              >
            </el-popover>
          </div>
          <div style="margin-left: 10px; display: inline">
            <el-tooltip
              class="item"
              effect="dark"
              content="重置密码为6个6"
              placement="right-start"
            >
              <el-button
                type="primary"
                size="small"
                @click="resetP(scope.row.id)"
                >重置密码</el-button
              >
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="true"
      :current-page="page"
      :page-size="16"
      :style="{ float: 'right', padding: '20px' }"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog
      :visible.sync="addUserDialog"
      custom-class="user-dialog"
      title="添加教师"
    >
      <el-form ref="userForm" :model="userInfo">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input
            v-model="userInfo.account"
            placeholder="用户名长度应大于四个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input
            v-model="userInfo.password"
            placeholder="用户密码长度应为4-16个ASCII字符"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeAddUserDialog">取 消</el-button>
        <el-button @click="enterAddUserDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import * as user from "@/api/user.js";

export default {
  name: "User",
  data() {
    return {
      page: 1,
      total: 10,
      pageSize: 10,
      tableData: [],

      authOptions: ["", "学生", "老师", "管理员"],
      addUserDialog: false,
      userInfo: {
        account: "",
        password: "",
      },
      searchInfo: {
        account: "",
      },
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      const res = await user.infoList(this.page, this.searchInfo.account, 2);
      if (res.code === 200) {
        this.total = res.data.tot;
        this.tableData = res.data.users;
      }
    },
    async deleteUser(row) {
      const res = await user.del(row.id);
      if (res.code == 200) {
        this.getTableData();
        row.visible = false;
      }
    },
    async enterAddUserDialog() {
      const res = await user.createTeacher(this.userInfo);
      if (res.code === 200) {
        this.userInfo = {
          account: "",
          password: "",
        };
        this.getTableData();
      }
      this.closeAddUserDialog();
    },
    closeAddUserDialog() {
      this.addUserDialog = false;
    },
    addUser() {
      this.addUserDialog = true;
    },
    async onSubmit() {
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    async resetP(account) {
      await user.resetPassword(account);
    },
  },
  async mounted() {
    this.getTableData();
  },
};
</script>
<style lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}

.user-dialog {
  .header-img-box {
    width: 200px;
    height: 200px;
    border: 1px dashed #ccc;
    border-radius: 20px;
    text-align: center;
    line-height: 200px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>