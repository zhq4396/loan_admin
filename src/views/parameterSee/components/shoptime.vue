<template>
  <!--  时间节点的弹窗 -->
  <el-dialog
    width="620px"
    title="时间节点"
    :visible.sync="dialogVisible"
    destroy-on-close
  >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.nodeCreatetime"
      >
        {{
          activity.nodeStatus == 0
            ? "受理上报"
            : activity.nodeStatus == 1
            ? "审查审核"
            : activity.nodeStatus == 2
            ? "拒绝"
            : activity.nodeStatus == 3
            ? "合同签署及抵质押"
            : activity.nodeStatus == 4
            ? "上报预审"
            : activity.nodeStatus == 5
            ? "待放款"
            :'已放款'
        }}
      </el-timeline-item>
    </el-timeline>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import * as ajax from "@/api/parameterSee";
export default {
  data() {
    return {
      //时间轴数据

      dialogVisible: false,
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  created() {},

  methods: {
    getModel(id) {
      ajax
        .getNodeListByBookId({ bookId: id })
        .then((res) => {
          this.dialogVisible = true;
          this.activities = res.data.data;
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
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