<template>
  <div class="elementPage">
    <avue-form
      ref="form"
      v-model="obj0"
      :option="option0"
      @submit="handleSubmit"
      @reset-change="emptytChange"
    >
    </avue-form>
    <div class="btn_class">
      <el-button
        type="primary"
        @click="compile(-1)"
        size="small"
        icon="el-icon-circle-plus-outline"
        >新增</el-button
      >

      <ExportFile
        style="margin: 10px"
        downUrl="/admin/book/exportBook"
        :urlData="{ ...obj0, bookType: 1 }"
        btnTxt="导出表格"
      />
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
      <!-- <template slot="bookIsHousing" slot-scope="{ row }">
        <span>{{ row.bookIsHousing == 1 ? "否" : "是" }}</span>
      </template> -->

      <template slot="bookLoadingDay" slot-scope="{ row }">
        <span>{{ row.bookLoadingDay ? row.bookLoadingDay + "天" : "0天"}}</span>
      </template>

      <template slot="bookEstimateMakeMonth" slot-scope="{ row }">
        <span>{{ row.bookEstimateMakeMonth }}</span>
      </template>
      <template slot="lastUpdatetime" slot-scope="{ row }">
        <span>{{ row.lastUpdatetime ? row.lastUpdatetime + "天" : "0天" }}</span>
      </template>
      <!-- <template slot="bookLink" slot-scope="{ row }">
        <span>{{
          row.bookLink == 0
            ? "在途"
            : row.bookLink == 1
            ? "待放款"
            : row.bookLink == 2
            ? "已放款"
            : "拒贷"
        }}</span>
      </template> -->
      <template slot="menu" slot-scope="{ row }">
        <el-button type="text" @click.stop="compile(row.bookId)"
          >编辑</el-button
        >
        <el-button type="text" @click.stop="remove(row.bookId)">删除</el-button>
        <el-button type="text" @click.stop="change(row.bookId, row.bookLink)"
          >修改环节</el-button
        >
        <el-button type="text" @click.stop="time(row.bookId)"
          >查看时间节点</el-button
        >
      </template>
    </avue-crud>

    <Pettycompile ref="pettycompile" @refresh="onLoad"></Pettycompile>
    <!-- <Pettyremove ref="pettyremove"></Pettyremove> -->
    <Pettychange ref="pettychange" @changeList="getList"></Pettychange>
    <Pettytime ref="pettytime"></Pettytime>
  </div>
</template>

<script>
var moment = require("moment");
import { getSubbranchListAll } from "@/api/subbranch";
import * as ajax from "../../api/parameterSee";
import ExportFile from "@/component/exportFile/exportFile";
import Pettychange from "./components/pettychange";
import Pettycompile from "./components/pettycompile";
// import Pettyremove from "./components/pettyremove";
import Pettytime from "./components/pettytime";
import Derived from "./components/derived.vue";
export default {
  name: "pettyParameter",
  components: {
    Pettychange,
    Pettycompile,
    // Pettyremove,
    Pettytime,
    Derived,
    ExportFile,
  },
  data() {
    return {
      subbranchlist: [],
      value1: undefined,
      tableLoading: false,
      formLoading: false,
      dialogVisible: false,
      formData: {},
      dataSource: [],
      page: {
        total: undefined,
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
            label: "申报时间",
            prop: "bookReportTime",
          },
          {
            label: "客户经理",
            prop: "bookPersonName",
          },
          {
            label: "工号",
            prop: "bookPersonNumber",
          },
          {
            label: "所在组织",
            prop: "subbranchFullName",
          },
          {
            label: "客户姓名",
            prop: "bookCustomer",
          },
          // {
          //   label: "联系方式",
          //   prop: "bookCustomerPhone",
          // },
          {
            label: "贷种",
            prop: "bookLoanName",
          },
          {
            label: "金额(万元)",
            prop: "bookMoney",
          },
          {
            label: "受理时间",
            prop: "bookAcceptanceTime",
          },
          {
            label: "所处环节",
            prop: "bookLinkName",
          },
          // {
          //   label: "是否住房消费贷款",
          //   prop: "bookIsHousing",
          //   slot: true,
          // },
          {
            label: "预计放款时间",
            prop: "bookEstimateMakeMonth",
            slot: true,
          },
          {
            label: "距离上次更新时间",
            prop: "lastUpdatetime",
            slot: true,
          },
          {
            label: "在途时长",
            prop: "bookLoadingDay",
            slot: true,
          },
          {
            label: "抵押物地址",
            prop: "bookCollateral",
          },
          {
            label: "备注",
            prop: "bookRemark",
          },
        ],
      },
      obj0: {
        pSearchMessage: "",
        cSearchMessage: "",
        searchSubbranchId: "",
        bookLoanId: "",
        bookLink: "",
        bookCollateral: "",
        time: "",
        daterange: "",
        bookRemark: "",
      },
      option0: {
        menuSpan: 6,
        menuPosition: "left",
        submitText: "查询",
        emptyText: "重置",
        column: [
          {
            type: "input",
            label: "客户经理",
            prop: "pSearchMessage",
            span: 6,
            placeholder: "请输入客户经理姓名或工号",
            dataType: "string",
          },
          {
            type: "input",
            label: "客户",
            prop: "cSearchMessage",
            span: 6,
            placeholder: "请输入客户姓名或手机号码",
            dataType: "string",
          },
          {
            type: "cascader",
            label: "部门",
            prop: "searchSubbranchId",
            span: 6,
            dicData: [],
            dataType: "string",
            filterable: true,
            showAllLevels: false,
            emitPath: false,
            checkStrictly: true,
            props: {
              value: "subbranchId",
              label: "subbranchName",
              children: "childList",
            },
          },
          {
            type: "select",
            label: "贷种",
            prop: "bookLoanId",
            span: 6,
            placeholder: "请输入",
            dataType: "string",
            filterable:true,
            dicData: [
              {
                label: "一手房",
                value: "0",
              },
              {
                label: "二手房",
                value: "1",
              },
              {
                label: "商住房",
                value: "2",
              },
              {
                label: "无",
                value: "3",
              },
            ],
          },
          {
            type: "select",
            label: "所处环节",
            prop: "bookLink",
            dataType: "string",
            span: 6,
            placeholder: "请输入",
            dicData: [
              {
                label: "申请受理",
                value: "10",
              },
              {
                label: "授信调查",
                value: "11",
              },
              {
                label: "审查审批",
                value: "12",
              },
              {
                label: "拒贷",
                value: "13",
              },
              {
                label: "合同签署",
                value: "14",
              },

              {
                label: "抵质押",
                value: "15",
              },
              {
                label: "待放款",
                value: "16",
              },
              {
                label: "已放款",
                value: "17",
              },
            ],
          },
          {
            type: "input",
            label: "抵押物地址",
            prop: "bookCollateral",
            dataType: "string",
            span: 6,
            placeholder: "请输入",
          },
          {
            label: "申报时间",
            prop: "time",
            type: "datetimerange",
            dataType: "string",
            span: 6,
            startPlaceholder: "请选择",
            endPlaceholder: "请选择",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            startPlaceholder: "请选择",
            endPlaceholder: "请选择",
          },

          {
            prop: "daterange",
            label: "受理时间",
            type: "datetimerange",
            dataType: "string",
            span: 6,
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            startPlaceholder: "请选择",
            endPlaceholder: "请选择",
          },
          {
            type: "input",
            label: "备注",
            prop: "bookRemark",
            dataType: "string",
            span: 6,
            placeholder: "请输入",
          },
        ],
      },
    };
  },
  created() {
    this.getLoanList();
    this.getBuildList();
    this.getSubbranchListAll();
  },
  methods: {
    // 获取所有架构
    getSubbranchListAll() {
      getSubbranchListAll({})
        .then((res) => {
          this.subbranchlist = res.data.data;
          this.subbranchlist.forEach((item) => {
            if (item.childList.length <= 0) {
              item.childList = null;
            } else {
              item.childList.forEach((item) => {
                if (item.childList.length <= 0) {
                  item.childList = null;
                } else {
                  item.childList.forEach((item) => {
                    if (item.childList.length <= 0) {
                      item.childList = null;
                    } else {
                      item.childList.forEach((item) => {
                        if (item.childList.length <= 0) {
                          item.childList = null;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
          // this.subbranchlist.forEach((item) => {
          //   item.childList.forEach((item) => {
          //     item.childList.forEach((item) => {
          //       item.childList = null;
          //     });
          //   });
          // });
          this.option0.column[2].dicData = this.subbranchlist;
        })
        .catch(() => {});
    },
    // 获取支行
    // getBankList() {
    //   ajax
    //     .getSubList1({
    //       subbranchLevel: 1,
    //     })
    //     .then((res) => {
    //       let dataList = res.data.data;
    //       let list = dataList.map((item) => {
    //         let label = item.subbranchName;
    //         let value = item.subbranchId;
    //         return {
    //           label,
    //           value,
    //         };
    //       });
    //       this.option0.column[2].dicData = list;
    //     })
    //     .catch(() => {});
    // },
    //楼盘
    getBuildList() {
      ajax
        .getBuildList({
          num: 0,
        })
        .then((res) => {
          let dataList = res.data.data.list;
          let list = dataList.map((item) => {
            let label = item.buildName;
            let value = item.buildId;
            return {
              label,
              value,
            };
          });
          this.option0.column[5].dicData = list;
        })
        .catch(() => {});
    },
    changeDate() {
      this.value1;
    },
    // 列表
    getList() {
      let data = {
        bookType: 1,
        firstNum: (this.page.currentPage - 1) * this.page.pageSize,
        num: this.page.pageSize,
        ...this.obj0,
        endTime: this.obj0.endTime ? this.obj0.endTime : "",
        startTime: this.obj0.startTime ? this.obj0.startTime : "",
        reportEndTime: this.obj0.reportEndTime ? this.obj0.reportEndTime : "",
        reportStartTime: this.obj0.reportStartTime
          ? this.obj0.reportStartTime
          : "",
        // bookBuildName: this.obj0.bookBuildName ? this.obj0.bookBuildName : "",
      };
      this.tableLoading = true;
      ajax
        .getBookList1(data)
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
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          // if (this.obj0.daterange) {
            console.log(this.obj0.daterange)
            let a = this.obj0.daterange.split(",");
            this.obj0.startTime = a[0];
            this.obj0.endTime = a[1];
          // }
          // if (!this.obj0.daterange) {
            // this.obj0.startTime = "";
            // this.obj0.endTime = "";
          // }
          
          if (!this.obj0.searchSubbranchId) {
            this.obj0.searchSubbranchId = "";
          }
          // if (this.obj0.time) {
            let b = this.obj0.time.split(",");
            this.obj0.reportStartTime = b[0];
            this.obj0.reportEndTime = b[1];
          // }
          // if (!this.obj0.time) {
          //   this.obj0.reportEndTime = "";
          //   this.obj0.reportStartTime = "";
          // }
          this.page.currentPage = 1;
          this.getList();
          done();
        }
      });
    },
    // 分页
    onLoad(page) {
      this.getList();
      console.log(page.currentPage);
      console.log(page.pageSize);
    },
    getLoanList() {
      ajax
        .getLoanList({ type: 2})
        .then((res) => {
          let dataList = res.data.data.list;
          let list = dataList.map((item) => {
            let label = item.loanName;
            let value = item.loanId;
            return {
              label,
              value,
            };
          });
          this.option0.column[3].dicData = list;
        })
        .catch((res) => {});
    },

    refresh() {
      this.getList();
    },
    compile(id) {
      this.$refs.pettycompile.getModel(id);
    },
    // 清空
    emptytChange() {
      this.page.currentPage = 1;
      this.obj0 = {
        pSearchMessage: "",
        cSearchMessage: "",
        searchSubbranchId: "",
        bookLoanId: "",
        bookLink: "",
        bookCollateral: "",
        time: "",
        daterange: "",
        bookRemark: "",
      };
      this.getList();
    },
    remove(id) {
      let that = this;
      this.$confirm("是否确定删除这条小额信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ajax
            .delBook({ bookId: id })
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
      // this.$refs.pettyremove.getModel();
    },
    // 提示
    openNotification(type, msg) {
      this.$notify({
        title: "系统提示",
        message: msg,
        type: type,
      });
    },
    change(id, linkId) {
      this.$refs.pettychange.getModel(id, linkId);
    },
    time(id) {
      this.$refs.pettytime.getModel(id);
    },
    derived() {
      this.$message({
        type: "success",
        message: "操作成功,已成功导出表格",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btn_class {
  display: flex;
  align-items: center;
}
.update_class {
  width: 500px;
}
</style>
