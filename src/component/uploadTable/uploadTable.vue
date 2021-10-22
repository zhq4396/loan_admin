<template>
  <div class="upload_table">
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :show-file-list="false"
      :data="ortherData"
      name="file"
      :on-error="handleError"
      :on-success="handleSuccess"
    >
      <el-button size="small" icon="el-icon-upload2" type="primary">{{
        btnTxt
      }}</el-button>
    </el-upload>
  </div>
</template>

<script>
/**
 * 用于表单导入 
 * 
    import uploadTable from "@/components/uploadTable/uploadTableIcon";
    <uploadTable @setNotice="getNotice" uploadAddress="/Room/uploadRoom" />

  * @getNotice      Function  导入完成之后的回调  用于页面的刷新
  * @uploadAddress  String  导入地址
  * @btnTxt         String  按钮名字   默认：导入模板
    
    getNotice(val) {
      this.searchList();
    },
*/

import { API_HOST } from "@/server/network";
export default {
  name: "uploadTable",
  data() {
    return {
      API_HOST,
    };
  },
  props: {
    uploadAddress: {
      type: String,
      default: "",
    },
    btnTxt: {
      type: String,
      default: "导入模板",
    },
  },
  computed: {
    uploadUrl() {
      return this.API_HOST + this.uploadAddress;
    },
    ortherData() {
      return {
        sessionid: localStorage.getItem("sessionAdminId")
          ? JSON.parse(localStorage.getItem("sessionAdminId"))
          : "",
      };
    },
  },
  methods: {
    handleError(err) {
      this.$emit("setNotice", {});
    },
    handleSuccess(response) {
      if (response.errcode == 0) {
        this.openNotification("success", "新增人员成功，初始密码为1qaz@WSX");
        this.$emit("setNotice", {});
      } else {
        this.$message.error(response.errmsg);
      }
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
</style>