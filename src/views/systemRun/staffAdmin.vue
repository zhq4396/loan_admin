<template>
  <div>
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
        @click="chooseStaffModel(-1)"
        size="small"
        icon="el-icon-circle-plus-outline"
        >添加人员</el-button
      >
      <UploadTable
        @setNotice="getList"
        uploadAddress="/admin/person/importPerson"
        class="upload"
        style="margin: 10px"
        btnTxt="导入表格"
      />

      <ExportFile
        style="margin: 10px"
        downUrl="/admin/person/exportPersonTemplate"
      />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="onSubbranch(-1)"
        >新增部门</el-button
      >
      <el-button
        type="primary"
        size="small"
        icon="el-icon-delete"
        @click="delDepartment(subbranchId)"
        >删除部门</el-button
      >

      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="onSubbranch(subbranchId)"
        >编辑部门</el-button
      >
    </div>
    <el-row class="tac" :gutter="20">
      <el-col :span="4">
        <SilderMenu
          :subbranchlist="subbranchlist"
          @selcetDepartment="selcetDepartment"
        />
      </el-col>
      <el-col :span="20">
        <avue-crud
          ref="crud"
          :data="dataSource"
          :option="option"
          :page.sync="page"
          :table-loading="tableLoading"
          @on-load="onLoad"
          @refresh-change="refresh"
        >
          <template slot="personStatus" slot-scope="{ row }">
            <div>{{ row.personStatus == 1 ? "正常" : "禁用" }}</div>
          </template>
          <template slot-scope="{ row }" slot="menu">
            <el-button
              type="text"
              @click="chooseStaffModel(row.personId)"
              v-if="row.personId != 1"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="resetPassword(row.personId)"
              v-if="row.personId != 1"
              >重置密码</el-button
            >
            <el-button
              type="text"
              @click="del(row.personId)"
              v-if="row.personId != 1"
              >删除</el-button
            >
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <StaffModel
      ref="staffModel"
      :subList="subList"
      :roleList="roleList"
      :subbranchlist="subbranchlist"
      :departmentList="departmentList"
      @refreshList="getList"
    ></StaffModel>
    <Subbranch
      ref="subbranch"
      :subbranchlist="subbranchlist"
      @getNewBranch="getSubbranchListAll"
    ></Subbranch>
  </div>
</template>

<script>
import UploadTable from "@/component/uploadTable/uploadTable";
import ExportFile from "@/component/exportFile/exportFile";
import * as ajax from "@/api/subbranch";
import SilderMenu from "./components/sliderMenu";
import StaffModel from "./components/staffModel";
import Subbranch from "./components/subbranch";
export default {
  name: "staffAdmin",
  components: { SilderMenu, StaffModel, Subbranch, ExportFile, UploadTable },
  data() {
    return {
      subList: [],
      roleList: [],
      departmentList: [],
      subbranchId: "", //支行id获取详情
      tableLoading: false,
      subbranchlist: [], //支行列表
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
            label: "工号",
            prop: "personNumber",
          },
          {
            label: "员工姓名",
            prop: "personName",
          },
          {
            label: "联系方式",
            prop: "personPhone",
          },
          {
            label: "角色",
            prop: "personRoleName",
          },
          {
            label: "所在组织",
            prop: "personSubbranchName",
          },
          {
            label: "上次登录时间",
            prop: "personLastLogin",
          },
          {
            label: "状态",
            prop: "personStatus",
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
        searchMessage: "",
        personSubbranchId: "",
        personDeptId: "",
        personRoleId: "",
        personStatus: "",
      },
      option0: {
        menuSpan: 6,
        menuPosition: "left",
        submitText: "查询",
        emptyText: "重置",
        column: [
          {
            type: "input",
            label: "员工信息",
            span: 6,
            dataType: "string",
            prop: "searchMessage",
          },
          {
            label: "部门",
            span: 6,
            dataType: "string",
            prop: "personDeptId",
            type: "cascader",
            dicData: [],
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
          // {
          //   type: "select",
          //   label: "支行",
          //   dataType:'string',
          //   span: 6,
          //   prop: "personSubbranchId",
          //   dicData: [],
          //   change: (value) => {
          //     this.get(value);
          //   },
          //   filterable: true,
          // },
          // {
          //   type: "select",
          //   label: "所属部门",
          //   dataType:'string',
          //   span: 6,
          //   prop: "personDeptId",
          //   dicData: [],
          //   filterable: true,
          // },
          {
            type: "select",
            label: "角色",
            dataType: "string",
            span: 6,
            prop: "personRoleId",
            dicData: [],
            filterable: true,
          },
          {
            type: "select",
            label: "状态",
            dataType: "string",
            span: 6,
            prop: "personStatus",
            dicData: [
              {
                label: "禁用",
                value: 0,
              },
              {
                label: "正常",
                value: 1,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.getSubbranchListAll();
    // this.getDepartmentList();
    this.getRoleAllList();
    // this.getBankList();
  },
  methods: {
    // 获取部门
    // getDepartmentList() {
    //   ajax
    //     .getSubbranchListAll({})
    //     .then((res) => {
    //       let list = res.data.data[0].childList;
    //       let departmentList = list.map((item) => {
    //         return item.childList.map((item) => {
    //           let label = item.subbranchName;
    //           let value = item.subbranchId;
    //           return {
    //             label,
    //             value,
    //           };
    //         });
    //       });
    //       this.option0.column[2].dicData = departmentList.flat();
    //       this.departmentList = departmentList.flat();
    //     })
    //     .catch(() => {});
    // },
    // get(value) {
    //   if (value.value > 0) {
    //     ajax
    //       .getSubList({ subbranchPid: value.value })
    //       .then((res) => {
    //         let dataList = res.data.data;
    //         let list = dataList.map((item) => {
    //           let label = item.subbranchName;
    //           let value = item.subbranchId;
    //           return {
    //             label,
    //             value,
    //           };
    //         });
    //         this.option0.column[2].dicData = list;
    //         this.obj0.personDeptId = list[0].value;
    //       })
    //       .catch((res) => {});
    //   }
    // },
    // 获取角色
    getRoleAllList() {
      ajax
        .getRoleAllList({ num: 0 })
        .then((res) => {
          let dataList = res.data.data.list;
          let list = dataList.map((item) => {
            let label = item.roleName;
            let value = item.roleId;
            return {
              label,
              value,
            };
          });
          this.option0.column[2].dicData = list;
          this.roleList = list;
          console.log(this.roleList);
        })
        .catch((res) => {});
    },
    // 获取支行
    getBankList() {
      ajax
        .getSubList({
          subbranchLevel: 1,
        })
        .then((res) => {
          let dataList = res.data.data;
          let list = dataList.map((item) => {
            let label = item.subbranchName;
            let value = item.subbranchId;
            return {
              label,
              value,
            };
          });
          this.option0.column[1].dicData = list;
          this.subList = list;
        })
        .catch(() => {});
    },
    // 获取所有架构
    getSubbranchListAll() {
      ajax
        .getSubbranchListAll({})
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
          this.option0.column[1].dicData = this.subbranchlist;
        })
        .catch(() => {});
    },
    // 获取列表
    getList(key) {
      this.tableLoading = true;
      let data = {
        firstNum: (this.page.currentPage - 1) * this.page.pageSize,
        num: this.page.pageSize,
        ...this.obj0,
      };
      if (key > 0) {
        data.personDeptId = key;
      }
      ajax
        .getPersonList(data)
        .then((res) => {
          let dataSource = res.data.data.list;
          dataSource.filter((item) => {
            return item.personId != 1;
          });
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
    chooseStaffModel(id) {
      this.$refs.staffModel.getModel(id);
    },
    // 编辑支行架构
    onSubbranch(id) {
      if (!id) {
        this.openNotification("error", "请先选择部门");
        return;
      }
      this.$refs.subbranch.getModel(id);
    },

    // 删除部门
    delDepartment(id) {
      let that = this;
      that
        .$confirm("是否确定删除该部门?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          ajax
            .delSubbranch({ subbranchId: id })
            .then((res) => {
              this.openNotification("success", res.data.errmsg);
              this.getSubbranchListAll();
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
    openNotification(type, cotnent) {
      this.$notify({
        title: "系统提示",
        message: cotnent,
        type: type,
      });
    },
    selcetDepartment(key) {
      this.subbranchId = key;
      this.getList(key);
    },
    // 清空
    emptytChange() {
      this.page.currentPage = 1;
      this.obj0 = {
        searchMessage: "",
        personSubbranchId: "",
        personDeptId: "",
        personRoleId: "",
        personStatus: "",
      };
      this.getList();
    },
    del(id) {
      let that = this;
      this.$confirm("是否确定删除该人员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ajax
            .delPerson({ personId: id })
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
    resetPassword(id) {
      let that = this;
      that
        .$confirm("是否确定重置密码?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          ajax
            .resetPassword({ personId: id })
            .then((res) => {
              this.openNotification("success", '重置密码为1qaz@WSX');
              this.getList();
            })
            .catch((res) => {
              this.openNotification("error", res.data.errmsg);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消重置",
          });
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
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          if (!this.obj0.personDeptId) {
            this.obj0.personDeptId = "";
          }
          this.page.currentPage = 1;
          this.getList();
          done();
        }
      });
    },
    refresh() {
      this.getList();
    },
    onLoad(page) {
      this.getList();
      console.log(page.currentPage);
      console.log(page.pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.btn_class {
  display: flex;
  align-items: center;
}
</style>