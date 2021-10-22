<template>
  <div class="no_page">
    <img src="./../../assets/404/404.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "noPage",
  data() {
    return {};
  },
  created() {
    this.returnHome();
  },
  components: {},
  methods: {
    returnHome() {
      this.$message({
        type: "warning",
        message: "即将返回上一页面",
        onClose: () => {
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.no_page {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
}
</style>
