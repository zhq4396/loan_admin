<template>
  <div class="elementPage">
    <!-- <avue-form
      ref="form"
      v-model="obj0"
      :option="option0"
      @submit="handleSubmit"
    >
    </avue-form>

    <avue-crud
      ref="crud"
      :data="data"
      :option="option"
      :page.sync="page"
      :table-loading="loading"
      @on-load="onLoad"
      @refresh-change="refresh"
    >
      <template slot-scope="scope" slot="menu">
        <el-button type="text" @click.stop="">编辑</el-button>
      </template>
    </avue-crud> -->
    <!--  @current-change="currentChange"
      @size-change="sizeChange" -->

    <!-- <ExportFile downUrl="/admin/book/exportSmallAmountDetail" /> -->
    <!-- <UploadTable uploadAddress="/admin/person/importPerson" /> -->
  </div>
</template>

<script>
import ExportFile from "@/component/exportFile/exportFile";
import UploadTable from "@/component/uploadTable/uploadTable";
export default {
  name: "elementPage",
  data() {
    return {
      data: [
        { name: "1", sex: "12" },
        { name: "2", sex: "12" },
        { name: "3", sex: "12" },
        { name: "4", sex: "12" },
        { name: "4", sex: "12" },
        { name: "4", sex: "12" },
        { name: "4", sex: "12" },
      ],
      page: {
        total: 50,
        pageSize: 10,
        currentPage: 1,
      },
      loading: false,
      option: {
        columnBtn: false,
        delBtn: false,
        editBtn: false,
        addBtn: false,
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
        ],
      },
      obj0: {},
      option0: {
        menuSpan: 6,
        column: [
          {
            type: "input",
            label: "用户名",
            prop: "username",
            span: 6,
          },
          {
            type: "input",
            label: "手机号",
            prop: "userPhone",
            span: 6,
          },
          {
            type: "select",
            label: "状态",
            prop: "status",
            span: 6,
            dicData: [
              {
                label: "正常",
                value: "0",
              },
              {
                label: "禁用",
                value: "1",
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    ExportFile,
    UploadTable,
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
    currentChange(currentPage) {
      console.log(currentPage);
    },
    sizeChange(pageSize) {
      console.log(pageSize);
    },
    refresh(val) {
      this.$message.success("刷新回调,当前分页对象" + JSON.stringify(val));
    },
    onLoad(page) {
      console.log(page.currentPage);
      console.log(page.pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
