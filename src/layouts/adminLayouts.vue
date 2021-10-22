<template>
  <div class="admin_layouts">
    <div class="bo_content">
      <AdminSider />
      <div id="page_router_view">
        <AdminPageTitle />
        <div class="page_body_area_person">
          <el-backtop target=".page_body_area_person"></el-backtop>
          <div :class="[greyBg ? 'really_content_area' : '']">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSider from "./assembly/adminSider";
import AdminPageTitle from "./assembly/adminPageTitle";

export default {
  name: "adminLayouts",
  data() {
    return {};
  },
  components: {
    AdminSider,
    AdminPageTitle,
  },
  computed: {
    greyBg() {
      return this.$route.meta.isGreyBg ? false : true;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.admin_layouts {
  display: flex;
  flex-direction: column;
  height: 100%;

  .bo_content {
    flex-grow: 2;
    display: flex;
    overflow-y: scroll;
    #page_router_view {
      flex-grow: 2;
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      .page_body_area_person {
        flex-grow: 2;
        padding: 20px;
        overflow-y: auto;
        background: rgba(240, 242, 245, 1);
      }
    }
  }
}
.really_content_area {
  padding: 20px;
  background: #fff;
}
.v-enter {
  opacity: 0;
  transform: translateX(-150px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
