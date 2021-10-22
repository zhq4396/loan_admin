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
    <div>
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
      <template slot-scope="{ row }" slot="menu">
        <el-button type="text" @click="getModel(row.loanId)">编辑</el-button>
        <el-button type="text" @click="del(row.loanId)">删除</el-button>
      </template>
      <template slot="loanType" slot-scope="{ row }">
        <el-tag>{{
          row.loanType == 0
            ? "一手房"
            : row.loanType == 1
            ? "二手房"
            : row.loanType == 2
            ? "商住房"
            : row.loanType == 3
            ? "小额业务"
            : row.loanType == 5
            ? "消费-其他"
            : "无"
        }}</el-tag>
      </template>
    </avue-crud>

    <el-dialog
      :title="itemId == -1 ? '新增贷种信息' : '编辑贷种信息'"
      :visible.sync="dialogVisible"
      destroy-on-close
      width="620px"
    >
      <el-form
        ref="ruleForm"
        :model="formData"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="贷种名称：" prop="loanName">
          <el-col :span="18">
            <el-input
              v-model="formData.loanName"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="贷种类别：" prop="loanType">
          <el-col :span="18">
            <el-radio-group v-model="formData.loanType">
              <el-radio :label="0">一手房</el-radio>
              <el-radio :label="1">二手房</el-radio>
              <el-radio :label="2">商住房</el-radio>
              <el-radio :label="3">小额业务</el-radio>
              <el-radio :label="4">无</el-radio>
              <el-radio :label="5">消费-其他</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="所属部门：" prop="loanDeptId">
          <el-col :span="18">
            <!-- <el-select v-model="formData.loanDeptId" placeholder="请选择">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in departmentList"
                :key="item.value"
              ></el-option>
            </el-select> -->
            <el-cascader
              :options="departmentList"
              :show-all-levels="false"
              :props="props"
              v-model="formData.loanDeptId"
            ></el-cascader>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" :loading="formLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as ajax from "@/api/loanRun";
export default {
  name: "loanRun",
  data() {
    return {
      rules: {
        loanType: [{ required: true, message: "请输入", trigger: "change" }],
        loanName: [{ required: true, message: "请输入", trigger: "blur" }],
        loanDeptId: [{ required: true, message: "请输入", trigger: "change" }],
      },
      props: {
        children: "childList",
        label: "subbranchName",
        emitPath: false,
        value: "subbranchId",
        checkStrictly: true,
      },
      formLoading: false,
      obj: {},
      departmentList: [],
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
            label: "所属部门",
            prop: "loanDeptName",
          },
          {
            label: "贷款种类",
            prop: "loanType",
            slot: true,
          },
          {
            label: "贷款名称",
            prop: "loanName",
          },
        ],
      },
      page: {
        total: undefined,
        pageSize: 10,
        currentPage: 1,
      },
      dataSource: [],
      //   form
      obj0: {},
      option0: {
        menuSpan: 6,
        menuPosition: "left",
        submitText: "查询",
        emptyText: "重置",
        column: [
          {
            type: "input",
            label: "贷种名称",
            span: 6,
            prop: "loanName",
            dataType: "string",
          },
          {
            type: "cascader",
            label: "所属部门",
            span: 6,
            prop: "loanDeptId",
            dataType: "string",
            dicData: [],
            filterable: true,
            showAllLevels: false,
            checkStrictly: true,
            emitPath: false,
            props: {
              value: "subbranchId",
              label: "subbranchName",
              children: "childList",
            },
          },
          {
            type: "select",
            label: "贷种类别",
            dataType: "string",
            span: 6,
            prop: "loanType",
            dicData: [
              {
                label: "一手房",
                value: 0,
              },
              {
                label: "二手房",
                value: 1,
              },
              {
                label: "商住房",
                value: 2,
              },
              {
                label: "小额业务",
                value: 3,
              },
              {
                label: "无",
                value: 4,
              },
              {
                label: "消费-其他",
                value: 5,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.getSubbranchList();
  },
  methods: {
    // 获取部门
    getSubbranchList() {
      ajax
        .getSubbranchList({})
        .then((res) => {
          this.departmentList = res.data.data;
          this.departmentList.forEach((item) => {
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

          this.option0.column[1].dicData = this.departmentList;
        })
        .catch(() => {});
    },
    // 列表
    getList() {
      let data = {
        firstNum: (this.page.currentPage - 1) * this.page.pageSize,
        num: this.page.pageSize,
        ...this.obj0,
      };
      this.tableLoading = true;
      ajax
        .getLoanList(data)
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
    //新增编辑弹窗
    getModel(id) {
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.formData = {
          loanName: "",
          loanDeptId: undefined,
          loanType: 0,
        };
      } else {
        this.getLoanInfo(id);
      }
    },
    // 详情
    getLoanInfo(id) {
      ajax
        .getLoanInfo({ loanId: id })
        .then((res) => {
          this.dialogVisible = true;
          this.formData = res.data.data;
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
        });
    },
    // 删除
    del(id) {
      let that = this;
      this.$confirm("是否确定删除该贷种?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ajax
            .delLoan({ loanId: id })
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
    // 清空
    emptytChange() {
      this.page.currentPage = 1;
      this.obj0 = {
        loanName: "",
        loanDeptId: "",
      };
      this.getList();
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
      this.getList();
    },
    // 分页
    onLoad(page) {
      this.getList();
      console.log(page.currentPage);
      console.log(page.pageSize);
    },
    // 保存
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          let apiAll = this.itemId == -1 ? ajax.addLoan : ajax.editLoan;
          let data =
            this.itemId == -1
              ? {
                  ...this.formData,
                }
              : {
                  loanId: this.formData.loanId,
                  loanType: this.formData.loanType,
                  loanName: this.formData.loanName,
                  loanDeptId: this.formData.loanDeptId,
                };
          apiAll(data)
            .then((res) => {
              this.formLoading = false;
              this.dialogVisible = false;
              this.openNotification("success", res.data.errmsg);
              this.getList();
            })
            .catch((res) => {
              this.openNotification("error", res.data.errmsg);
              this.formLoading = false;
            });
        } else {
          return false;
        }
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

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>