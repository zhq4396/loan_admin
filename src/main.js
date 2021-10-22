import Vue from "vue";
import App from "./App.vue";
import less from "less";
import router from "./router";
import store from "./store";
import Viewer from "v-viewer";
import echarts from "echarts";
// import Antd from 'ant-design-vue';
import moment from "moment";
import "./router/monitor";
import "./config/config.css";
import "moment/locale/zh-cn";
// import 'ant-design-vue/dist/antd.less';
import "viewerjs/dist/viewer.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
const hls = require("videojs-contrib-hls");
Vue.use(hls);
Vue.use(VideoPlayer);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
moment.locale("zh-cn");
Vue.use(VueAwesomeSwiper);
Vue.use(less);
Vue.use(Viewer);
// Vue.use(Antd);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
import axios from "axios";
Vue.use(Avue, { axios });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
