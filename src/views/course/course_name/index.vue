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
        label="课程名"
        min-width="180"
        prop="name"
      ></el-table-column>
      <el-table-column label="课程简介" min-width="180" prop="info">
        <template slot-scope="scope">
          <el-button
            @click="openDialog(0, scope.row)"
            icon="el-icon-view"
            size="small"
            type="info"
            >预览</el-button
          >
          <el-button
            @click="openDialog(1, scope.row)"
            icon="el-icon-edit"
            size="small"
            type="primary"
            >修改</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="缩略图" min-width="180" prop="thumb">
        <template slot-scope="scope">
          <el-button
            @click="openDialog(4, scope.row)"
            icon="el-icon-view"
            size="small"
            type="info"
            >预览</el-button
          >
          <el-button
            @click="openDialog(2, scope.row)"
            icon="el-icon-edit"
            size="small"
            type="primary"
            >上传</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="460">
        <template slot-scope="scope">
          <el-button
            @click="deleteTerm(scope.row)"
            icon="el-icon-delete"
            size="small"
            type="danger"
            >删除</el-button
          >
          <el-button
            @click="openDialog(3, scope.row)"
            icon="el-icon-edit"
            size="small"
            type="primary"
            >重命名</el-button
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
    <!-- 预览简介弹窗 -->
    <el-dialog :title="diglogTitles[0]" :visible.sync="dialogV0">
      <div class="intro-font-style intro-font">{{ curItem.info }}</div>
      <el-divider></el-divider>
    </el-dialog>
    <!-- 修改简介弹窗 -->
    <el-dialog :title="diglogTitles[1]" :visible.sync="dialogV1">
      <el-form :model="curItem">
        <el-form-item label="课程名" prop="info">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3 }"
            autocomplete="off"
            v-model="curItem.info"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogV1 = false">取 消</el-button>
        <el-button @click="upInfo" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片弹窗 -->
    <el-dialog :title="diglogTitles[2]" :visible.sync="dialogV2">
      <el-upload
        class="upload-demo"
        drag
        :action="`/api/img?height=600&width=1200`"
        :on-success="upThumb"
        :multiple="false"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png/gif文件，建议大小为1200*600,且w文件大小不超过4MB
        </div>
      </el-upload>
    </el-dialog>
    <!-- 重命名弹窗 -->
    <el-dialog :title="diglogTitles[3]" :visible.sync="dialogV3">
      <el-form :model="curItem">
        <el-form-item label="课程名" prop="name">
          <el-input autocomplete="off" v-model="curItem.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogV3 = false">取 消</el-button>
        <el-button @click="upName" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览图片弹窗 -->
    <el-dialog :title="diglogTitles[4]" :visible.sync="dialogV4">
      <el-image :src="'/api/img/' + curItem.thumb">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-divider></el-divider>
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
      dialogV0: false,
      dialogV1: false,
      dialogV2: false,
      dialogV3: false,
      dialogV4: false,
      diglogTitles: ["预览简介", "修改简介", "上传图片", "重命名", "预览图片"],
      curItem: {
        id: 0,
        name: "",
        thumb: "",
        info: "",
      },
      tableData: [],
    };
  },
  components: {},
  mounted() {
    this.upData();
  },
  methods: {
    async upData() {
      const res = await cn.getAll();
      this.tableData = res.data;
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    async enterDialog() {
      const res = await cn.add(this.form);
      if (res.code === 200) {
        await this.upData();
      }
      this.dialogFormVisible = false;
    },
    add() {
      this.dialogFormVisible = true;
    },
    async deleteTerm(id) {
      const res = await cn.deleteCourse(id);
      if (res.code === 200) {
        this.upData();
      }
    },
    openDialog(dg, data) {
      this.curItem = data;
      this["dialogV" + dg] = true;
    },
    async upName() {
      await cn.upName(this.curItem);
      await this.upData();
      this.dialogV3 = false;
    },
    async upInfo() {
      // this.curItem.info = this.curItem.info
      //   .replace(/\n|\r\n/g, "<br/>")
      //   .replace(/\s/g, "&nbsp;");
      await cn.upInfo(this.curItem);
      await this.upData();
      this.dialogV1 = false;
    },
    async upThumb(response) {
      this.curItem.thumb = response.data;
      await cn.upThumb(this.curItem);
      await this.upData();
      this.dialogV2 = false;
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
.intro-font-style {
  font-family: Microsoft YaHei;
}
.intro-font {
  color: #808080;
  margin-top: 15px;
  height: 100%;
}
</style>