<template>
  <div>
    <el-button @click="jumpPage" size="medium">按钮</el-button>
    <el-button @click="showModel" size="medium">显示</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      destroy-on-close
      @close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "elements",
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    jumpPage() {
      this.$router.push("/elementd");
    },
    handleClose() {
      this.dialogVisible = false;
    },
    showModel() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>