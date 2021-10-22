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
        <el-button type="text" @click="getModel(row.buildId)">编辑</el-button>
        <el-button type="text" @click="del(row.buildId)">删除</el-button>
      </template>
     <!-- <template slot="buildArea" slot-scope="{ row }">
        <span>{{
          row.buildArea == 0
            ? "椒江"
            : row.buildArea == 1
            ? "黄岩"
            : row.buildArea == 2
            ? "路桥"
            : row.buildArea == 3
            ? "仙居"
            : row.buildArea == 4
            ? "天台"
            : row.buildArea == 5
            ? "三门"
            : row.buildArea == 6
            ? "玉环"
            : row.buildArea == 7
            ? "临海"
            : "温岭"
        }}</span>
      </template> -->
    </avue-crud>

    <el-dialog
      :title="itemId == -1 ? '新增楼盘信息' : '编辑楼盘信息'"
      :visible.sync="dialogVisible"
      destroy-on-close
      width="620px"
    >
      <el-form ref="form1" :model="formData" label-width="100px">
        <el-form-item label="楼盘名称：">
          <el-col :span="18">
            <el-input
              v-model="formData.buildName"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
      <el-form-item label="开发商：">
          <el-col :span="18">
            <el-input
              v-model="formData.buildBuilder"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所属县市区：">
          <el-col :span="18">
            <el-select v-model="formData.buildArea" placeholder="请选择">
             <el-option label="椒江" :value="0"></el-option>
              <el-option label="黄岩" :value="1"></el-option>
              <el-option label="路桥" :value="2"></el-option>
              <el-option label="仙居" :value="3"></el-option>
              <el-option label="天台" :value="4"></el-option>
              <el-option label="三门" :value="5"></el-option>
              <el-option label="玉环" :value="6"></el-option>
              <el-option label="临海" :value="7"></el-option>
              <el-option label="温岭" :value="8"></el-option>
            </el-select>
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
import * as ajax from "@/api/houses";
export default {
  name: "houses",
  data() {
    return {
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
            label: "所属县市区",
            prop: "buildAreaName",
          },
          {
            label: "楼盘名称",
            prop: "buildName",
            slot: true,
          },
          {
            label: "开发商",
            prop: "buildBuilder",
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
            label: "楼盘名称",
            span: 6,
            prop: "buildName",
          },
          {
            type: "select",
            label: "所属县市区",
            span: 6,
            prop: "buildArea",
            dicData: [
              {
                label: "椒江",
                value: "0",
              },
               {
                label: "黄岩",
                value: "1",
              },
               {
                label: "路桥",
                value: "2",
              },
               {
                label: "仙居",
                value: "3",
              },
               {
                label: "天台",
                value: "4",
              },
               {
                label: "三门",
                value: "5",
              },
               {
                label: "玉环",
                value: "6",
              },
               {
                label: "临海",
                value: "7",
              },
               {
                label: "温岭",
                value: "8",
              },
            ],
            filterable: true,
          },
          {
            type: "input",
            label: "开发商",
            span: 6,
            prop: "buildBuilder",
          },
        ],
      },
    };
  },
 
  methods: {
   
    // 列表
    getList() {
      let data = {
        firstNum: (this.page.currentPage - 1) * this.page.pageSize,
        num: this.page.pageSize,
        ...this.obj0,
      };
      this.tableLoading = true;
      ajax
        .getBuildList(data)
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
      this.dialogVisible = false;
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.formData = {
          buildName: "",
          buildBuilder:'',
          buildArea:''
         /*  loanType: 0, */
        };
      } else {
        this.getBuildInfo(id);
      }
    },
    // 详情
    getBuildInfo(id) {
      ajax
        .getBuildInfo({ buildId: id })
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
            .delBuild({ buildId: id })
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
      this.obj0 = {};
      this.getList();
    },
    // 搜索
    handleSubmit() {
      this.$refs.form.validate((vaild, done) => {
        if (vaild) {
          this.page.currentPage = 1;
          this.getList();
          done()
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
      this.formLoading = true;
      
      let apiAll = this.itemId == -1 ? ajax.addBuild : ajax.editBuild;
      let data =
        this.itemId == -1
          ? {
              ...this.formData,
            }
          : {
             buildId: this.formData.buildId,
             buildName: this.formData.buildName,
             buildArea: this.formData.buildArea,
             buildBuilder: this.formData.buildBuilder,
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