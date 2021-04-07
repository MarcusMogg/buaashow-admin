<template>
  <div class="authority">
    <div class="button-box clearflex">
      <el-button @click="add()" type="primary">新增学期</el-button>
    </div>
    <el-table :data="tableData" border row-key="id" stripe style="width: 100%">
      <el-table-column
        label="学期"
        min-width="180"
        prop="tname"
      ></el-table-column>
      <el-table-column
        label="开始时间"
        min-width="180"
        prop="tbegin"
      ></el-table-column>
      <el-table-column
        label="结束时间"
        min-width="180"
        prop="tend"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="460">
        <template slot-scope="scope">
          <el-button
            @click="deleteTerm(scope.row.tid, scope.$index)"
            icon="el-icon-delete"
            size="small"
            type="danger"
            >删除</el-button
          >
          <el-button
            @click="updateTermDialog(scope.row)"
            icon="el-icon-edit"
            size="small"
            type="primary"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增Term弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label=" 学期名" prop="tname">
          <el-input
            autocomplete="off"
            v-model="form.tname"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="tbegin">
          <el-date-picker
            v-model="form.tbegin"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="tend">
          <el-date-picker
            v-model="form.tend"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改Term弹窗 -->
    <el-dialog :title="upDialogTitle" :visible.sync="upDialogFormVisible">
      <el-form :model="upform" label-width="120px">
        <el-form-item label=" 学期名" prop="tname">
          <el-input
            autocomplete="off"
            v-model="upform.tname"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="tbegin">
          <el-date-picker
            v-model="upform.tbegin"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="tend">
          <el-date-picker
            v-model="upform.tend"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="upDialogFormVisible = false">取 消</el-button>
        <el-button @click="updateTerm" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as term from "@/api/term.js";
import { formatTimeToStr } from "@/utils/date.js";

export default {
  name: "Term",
  data() {
    return {
      dialogTitle: "新增学期",
      dialogFormVisible: false,
      upDialogTitle: "修改学期",
      upDialogFormVisible: false,
      form: {
        tname: "",
        tbegin: "",
        tend: "",
      },
      upform: {
        tid: 0,
        tname: "",
        tbegin: "",
        tend: "",
      },
      tableData: [],
    };
  },
  components: {},
  async mounted() {
    const res = await term.getTerms();
    this.tableData = res.data;
  },
  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
    },
    async enterDialog() {
      this.form.tbegin = formatTimeToStr(this.form.tbegin, "yyyy-MM-dd");
      this.form.tend = formatTimeToStr(this.form.tend, "yyyy-MM-dd");
      const res = await term.addTerms(this.form);
      if (res.code === 200) {
        this.form = {
          tname: "",
          tbegin: "",
          tend: "",
        };
        this.tableData.push(res.data);
        this.closeDialog();
      }
    },
    add() {
      this.dialogFormVisible = true;
    },
    async deleteTerm(id, index) {
      const res = await term.deleteTerm(id);
      if (res.code === 200) {
        this.tableData.splice(index, 1);
      }
    },
    updateTermDialog(data) {
      console.log(data);
      this.upform.tid = data.tid;
      this.upform.tname = data.tname;
      this.upform.tbegin = data.tbegin;
      this.upform.tend = data.tend;
      this.upDialogFormVisible = true;
    },
    async updateTerm() {
      this.upform.tbegin = formatTimeToStr(this.upform.tbegin, "yyyy-MM-dd");
      this.upform.tend = formatTimeToStr(this.upform.tend, "yyyy-MM-dd");
      await term.updateTerm(this.upform);
      const res = await term.getTerms();
      this.tableData = res.data;
      this.upDialogFormVisible = false;
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