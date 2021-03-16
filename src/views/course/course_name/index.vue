<template>
  <div class="authority">
    <div class="button-box clearflex">
      <el-button @click="add()" type="primary">新增课程</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      row-key="index"
      stripe
      style="width: 100%"
    >
      <el-table-column
        label="课程"
        min-width="180"
        prop="name"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="460">
        <template slot-scope="scope">
          <el-button
            @click="deleteTerm(scope.row.name, scope.$index)"
            icon="el-icon-delete"
            size="small"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增角色弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="课程名" prop="name">
          <el-input autocomplete="off" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as cn from "@/api/course_name.js";

export default {
  name: "CourseName",
  data() {
    return {
      dialogTitle: "新增课程",
      dialogFormVisible: false,
      form: {
        name: "",
      },
      tableData: [],
    };
  },
  components: {},
  async mounted() {
    const res = await cn.getAll();
    this.tableData = res.data.map((x) => {
      return {
        name: x,
      };
    });
  },
  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
    },
    async enterDialog() {
      const res = await cn.add(this.form.name);
      if (res.code === 200) {
        this.tableData.push({ name: this.form.name });
        this.form.name = "";
        this.dialogFormVisible = false;
      }
    },
    add() {
      this.dialogFormVisible = true;
    },
    async deleteTerm(id, index) {
      const res = await cn.deleteCourse(id);
      if (res.code === 200) {
        this.tableData.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="scss">
.authority {
  .el-input-number {
    margin-left: 15px;
    span {
      display: none;
    }
  }
  .button-box {
    padding: 10px 20px;
    .el-button {
      float: right;
    }
  }
}
.role-box {
  .el-tabs__content {
    height: calc(100vh - 150px);
    overflow: auto;
  }
}
</style>