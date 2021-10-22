<template>
  <div class="loan_run_class">
    <avue-form
      ref="form"
      v-model="obj0"
      :option="option0"
      @submit="handleSubmit"
      @reset-change="emptytChange"
    >
    </avue-form>
    <div class="">
      <el-button
        type="primary"
        @click="getModel(-1)"
        size="small"
        icon="el-icon-circle-plus-outline"
        >新增</el-button
      >
    </div>
    <avue-crud
      ref="crud"
      :data="dataSource"
      :option="option"
      :page.sync="page"
      :table-loading="tableLoading"
      @on-load="onLoad"
      @refresh-change="refresh"
    >
      <template slot="roleStatus" slot-scope="{ row }">
        <el-tag>{{ row.roleStatus == 1 ? "正常" : "禁用" }}</el-tag>
      </template>
      <template slot-scope="{ row }" slot="menu">
        <el-button type="text" @click="getModel(row.roleId)">编辑</el-button>
        <el-button type="text" @click="del(row.roleId)" v-if="row.roleId != 3"
          >删除</el-button
        >
      </template>
    </avue-crud>
  </div>
</template>

<script>
import * as ajax from "@/api/role";
export default {
  name: "roleAdmin",
  data() {
    return {
      obj: {},
      loading: false,
      tableLoading: false,
      formData: {},
      itemId: undefined,
      dialogVisible: false,
      option: {
        columnBtn: false,
        delBtn: false,
        editBtn: false,
        addBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "序号",
            prop: "indexNumber",
          },
          {
            label: "角色名称",
            prop: "roleName",
          },
          {
            label: "状态",
            prop: "roleStatus",
            slot: true,
          },
        ],
      },
      page: {
        total: 50,
        pageSize: 10,
        currentPage: 1,
      },
      dataSource: [],
      //   form
      obj0: {
        roleName: "",
        roleStatus: "",
      },
      option0: {
        menuSpan: 6,
        menuPosition: "left",
        submitText: "查询",
        emptyText: "重置",
        column: [
          {
            type: "input",
            label: "角色查询",
            dataType: "string",
            span: 6,
            prop: "roleName",
          },
          {
            type: "select",
            label: "状态",
            span: 6,
            dataType: "string",
            prop: "roleStatus",
            dicData: [
              {
                label: "正常",
                value: "1",
              },
              {
                label: "禁用",
                value: "0",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    // 列表
    getList() {
      this.tableLoading = true;
      let data = {
        firstNum: (this.page.currentPage - 1) * this.page.pageSize,
        num: this.page.pageSize,
        ...this.obj0,
      };
      ajax
        .getRoleList(data)
        .then((res) => {
          let dataSource = res.data.data.list;
          dataSource.map((item, index) => {
            return (item.indexNumber =
              index + 1 + (this.page.currentPage - 1) * this.page.pageSize);
          });
          this.dataSource = dataSource;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        })
        .catch((res) => {
          this.tableLoading = false;
          this.openNotification("error", res.data.errmsg);
        });
    },
    getModel(id) {
      this.$router.push(`/addRole?id=${id}`);
    },
    // 清空
    emptytChange() {
      this.page.currentPage = 1;
      this.obj0 = {
        roleName: "",
        roleStatus: "",
      };
      this.getList();
    },

    del(id) {
      let that = this;
      this.$confirm("是否确定删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ajax
            .delRole({ roleId: id })
            .then((res) => {
              this.openNotification("success", res.data.errmsg);
              this.getList();
            })
            .catch((res) => {
              this.openNotification("error", res.data.errmsg);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 搜索
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          this.page.currentPage = 1;
          this.getList();
          done();
        }
      });
    },
    // 刷新
    refresh() {
      console.log(this.page.currentPage);
      this.getList();
    },
    onLoad(page) {
      this.getList();
      console.log(page.currentPage);
      console.log(page.pageSize);
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

<style lang="less" scoped>
.page_header {
  padding-bottom: 20px;
}
</style>