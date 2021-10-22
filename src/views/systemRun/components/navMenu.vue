<template>
  <div>
    <el-submenu
      :index="item.subbranchId + ''"
      v-for="item in subbranchlist"
      :key="item.subbranchId"
    >
      <template slot="title">
        <span>{{ item.subbranchName }}</span>
      </template>
      <el-menu-item-group
        v-for="item1 in item.childList"
        :key="item1.subbranchId"
      >
        <el-submenu :index="item1.subbranchId + ''">
          <template slot="title">{{ item1.subbranchName }}</template>
          <!-- <NavMenu :subbranchlist="subbranchlist"></NavMenu> -->

          <el-menu-item-group
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
          </el-menu-item-group>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  props: {
    subbranchlist: {
      type: Array,
    },
  },
};
</script>

<style>
</style>