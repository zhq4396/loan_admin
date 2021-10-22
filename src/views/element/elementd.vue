<template>
  <div>
    <!-- <avue-form
      ref="form"
      v-model="obj0"
      :option="option0"
      @submit="handleSubmit"
    >
    </avue-form>

    <avue-crud
      :data="data"
      :option="option"
      v-model="obj"
      :before-close="beforeOpen"
    ></avue-crud>
    <el-tag>当前弹出框表单中的数据{}</el-tag> -->
  </div>
</template>

<script>
export default {
  name: "elementd",
  data() {
    return {
      obj: {},
      data: [
        {
          name: "张三",
          sex: "男",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "李四",
          sex: "女",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "王五",
          sex: "女",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "赵六",
          sex: "男",
          date: "1994-02-23 00:00:00",
        },
      ],
      option: {
        title: "表格的标题",
        page: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "性别",
            prop: "sex",
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
        ],
      },
      obj0: {},
      option0: {
        column: [
          {
            type: "input",
            label: "员工信息：",
            span: 6,
            prop: "info",
          },
          {
            type: "input",
            label: "支行：",
            span: 6,
            prop: "bank",
          },
          {
            type: "input",
            label: "所属部门：",
            span: 6,
            prop: "department",
          },
          {
            type: "select",
            label: "角色",
            span: 6,
            prop: "role",
            dicData: [
              {
                label: "选项一",
                value: "1",
              },
              {
                label: "选项二",
                value: "2",
              },
              {
                label: "选项三",
                value: "3",
              },
            ],
            cascaderItem: [],
          },
        ],
        menuPosition: "left",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          console.log(this.obj0);
          done(); //取消loading
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>