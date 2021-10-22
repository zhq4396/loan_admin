<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {
      input: "",
    };
  },
  components: {},
  computed: {
    ...mapState(["ycIsLoginBool"]),
  },
  created() {
    if (sessionStorage.getItem("love_tabls_session_data_vuezx")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("love_tabls_session_data_vuezx"))
        )
      );
    }
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem(
        "love_tabls_session_data_vuezx",
        JSON.stringify(this.$store.state)
      );
    });
  },
};
</script>
<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 0.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
