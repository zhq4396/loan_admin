<template>
  <div class="slider_menu">
    <el-menu
      default-active=""
      class="el-menu-vertical-demo"
      @select="select"
      @open="select"
    >
      <NavMenu :subbranchlist="subbranchlist"></NavMenu>

      <!-- <NavMenu :prop> -->

      <!-- <el-menu-item-group
          v-for="item1 in item.childList"
          :key="item1.subbranchId"
        >
          <el-submenu :index="item1.subbranchId + ''">
            <template slot="title">{{ item1.subbranchName }}</template> -->

      <!-- <el-menu-item-group
              v-for="item2 in item1.childList"
              :key="item2.subbranchId"
            >
              <el-submenu :index="item2.subbranchId + ''">
                <template slot="title">{{ item2.subbranchName }}</template>
                <el-menu-item
                  :index="item3.subbranchId + ''"
                  v-for="item3 in item2.childList"
                  :key="item3.subbranchId"
                >
                  {{ item3.subbranchName }}
                </el-menu-item>
              </el-submenu>
            </el-menu-item-group> -->

      <!-- 
          </el-submenu>
        </el-menu-item-group> -->
    </el-menu>
  </div>
</template>

<script>
import NavMenu from "./navMenu";
export default {
  props: {
    subbranchlist: {
      type: Array,
    },
  },
  components: {
    NavMenu,
  },
  data() {
    return {};
  },
  methods: {
    select(key, keyPath) {
      console.log(key);
      this.$emit("selcetDepartment", key);
    },
  },
};
</script>

<style lang="less" scoped>
.slider_menu {
  padding-top: 40px;
}
.slider_menu /deep/.el-menu-item {
  min-width: auto;
}
</style>