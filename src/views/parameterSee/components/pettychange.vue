<template>
  <!--  修改的弹窗 -->
  <el-dialog
    width="620px"
    title="修改环节"
    :visible.sync="change"
    destroy-on-close
    destroy-on-close:true
  >
    <el-form ref="form" :model="formData" label-width="100px">
      <el-form-item label="修改环节：">
        <el-col :span="18">
          <el-select
            v-model="formData.bookLink"
            placeholder="请选择所处环节"
            class="update_class"
          >
            <el-option label="申请受理" :value="10"></el-option>
            <el-option label="授信调查" :value="11"></el-option>
            <el-option label="审查审批" :value="12"></el-option>
            <el-option label="拒贷" :value="13"></el-option>
            <el-option label="合同签署" :value="14"></el-option>
            <el-option label="抵质押" :value="15"></el-option>
            <el-option label="待放款" :value="16"></el-option>
            <el-option label="已放款" :value="17"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="change = false">取 消</el-button>
      <el-button type="primary" @click="save" :loading="formLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { batchEditBookLink } from "@/api/parameterSee";
export default {
  data() {
    return {
      formLoading: false,
      id: "",
      formData: {
        bookLink: "",
      },
      change: false,
    };
  },
  methods: {
    getModel(id,linkId) {
      this.id = id;
      this.formData.bookLink = linkId
      this.change = true;
    },
    save() {
      let data = {
        bookType:1,
        bookIdList: [this.id],
        bookLink: this.formData.bookLink,
      };
      batchEditBookLink(data)
        .then((res) => {
          this.openNotification("success", res.data.errmsg);
          this.formLoading = false;
          this.change = false;
          this.$emit("changeList");
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
          this.formLoading = false;
        });
    },
    // 提示
    openNotification(type, msg) {
      this.$notify({
        title: "系统提示",
        message: msg,
        type: type,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.update_class {
  width: 300px;
}
</style>