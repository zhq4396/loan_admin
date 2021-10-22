<template>
  <div>
    <el-dialog
      :title="itemId == -1 ? '新增支行架构' : '编辑支行架构'"
      :visible.sync="dialogVisible"
      destroy-on-close
      width="620px"
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="formData"
        label-width="150px"
      >
        <el-form-item label="架构名称：" prop="subbranchName">
          <el-col :span="18">
            <el-input
              v-model="formData.subbranchName"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级架构名称：">
          <el-col :span="18">
            <el-tree
              :data="subbranchlist"
              :props="defaultProps"
              node-key="subbranchId"
              @node-click="handleNodeClick"
              :default-expanded-keys="list"
            ></el-tree>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
          @load="formLoading"
          v-if="itemId == -1"
          >确 定</el-button
        >
        <el-button type="primary" @click="saveEdit" @load="formLoading" v-else
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as ajax from "@/api/subbranch";
export default {
  props: {
    subbranchlist: {
      type: Array,
    },
  },
  data() {
    return {
      defaultProps: {
        children: "childList",
        label: "subbranchName",
      },
      list: [],
      formLoading: false,
      itemId: undefined,
      formData: {},
      dialogVisible: false,
      rules: {
        subbranchName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    getModel(id) {
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.formData = {
          subbranchName: "",
          subbranchPid: "",
          // subbranchLevel: "",
        };
      } else {
        this.getSubbranchInfo(id);
      }
    },
    // 组织详情
    getSubbranchInfo(id) {
      ajax
        .getSubbranchInfo({ subbranchId: id })
        .then((res) => {
          this.list = res.data.data.subbranchFullPathId.split(",");
          this.formData = {
            subbranchId: res.data.data.subbranchId,
            subbranchName: res.data.data.subbranchName,
            subbranchPid: res.data.data.subbranchPid,
          };
          this.dialogVisible = true;
          // this.formLoading = false;
        })
        .catch((res) => {
          // this.formLoading = false;
          this.openNotification("error", res.data.errmsg);
        });
    },
    handleNodeClick(data) {
      this.formData.subbranchPid = data.subbranchId;
      console.log(this.formData);
      if (this.itemId > -1) {
        this.formData.subbranchPid = data.subbranchPid;
        this.formData.subbranchId = data.subbranchId;
      }
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (this.formData.subbranchLevel > 2) {
            this.openNotification("error", "部门已经在最底部了。！！！");
            return;
          }
          ajax
            .addSubbranch({ ...this.formData })
            .then((res) => {
              this.formLoading = false;
              this.dialogVisible = false;
              this.$emit("getNewBranch");
              this.openNotification("success", res.data.errmsg);
            })
            .catch((res) => {
              this.formLoading = false;
              this.openNotification("error", res.data.errmsg);
            });
        } else {
          return false;
        }
      });
    },
    saveEdit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          ajax
            .editSubbranch({ ...this.formData })
            .then((res) => {
              this.formLoading = false;
              this.dialogVisible = false;
              this.$emit("getNewBranch");
              this.openNotification("success", res.data.errmsg);
            })
            .catch((res) => {
              this.formLoading = false;
              this.openNotification("error", res.data.errmsg);
            });
        } else {
          return false;
        }
      });
    },
    openNotification(type, cotnent) {
      this.$notify({
        title: "系统提示",
        message: cotnent,
        type: type,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>