<template>
  <div class="export_file">
    <el-button
      :loading="loading"
      type="primary"
      size="small"
      icon="el-icon-download"
      @click="exportAjaxFile"
      >{{ btnTxt }}</el-button
    >
  </div>
</template>

<script>
/**
 * 用于 下载模板、导出列表
 *
 * import ExportFile from "@/component/exportFile/exportFile";
 * <ExportFile/>
 *
 * @btnTxt   String  按钮名字   默认：下载模板
 * @downUrl  String  下载地址
 * @urlData  Object  下载参数
 */
import { downLoadTemplate } from "@/server/network.js";
export default {
  name: "exportFile",
  data() {
    return {
      loading: false,
    };
  },

  props: {
    btnTxt: {
      type: String,
      default: "下载模板",
    },
    downUrl: {
      type: String,
      default: "",
    },
    urlData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    exportAjaxFile() {
      this.loading = true;
      downLoadTemplate(this.downUrl, this.urlData).then((res) => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>