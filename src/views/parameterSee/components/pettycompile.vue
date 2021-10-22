<template>
  <div>
    <!--  编辑的弹窗 -->
    <el-dialog
      width="620px"
      :title="itemId == -1 ? '新增在途业务' : '编辑在途业务'"
      :visible.sync="dialogVisible"
      destroy-on-close
      destroy-on-close:true
    >
      <el-form
        ref="ruleForm"
        :model="formData"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="贷种" prop="bookLoanId">
          <el-col :span="18">
            <el-select
              v-model="formData.bookLoanId"
              placeholder="请选择贷种"
              filterable
            >
              <el-option
                :label="item.loanName"
                :value="item.loanId"
                v-for="item in LoanList"
                :key="item.loanId"
                :disabled="itemId == -1 ? false : true"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称" prop="bookCustomer">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCustomer"
              placeholder="请输入客户名称"
              :disabled="itemId == -1 ? false : true"
            ></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="联系方式" prop="bookCustomerPhone">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCustomerPhone"
              placeholder="请输入联系方式"
              :disabled="itemId == -1 ? false : true"
            ></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="金额（万元）" prop="bookMoney">
          <el-col :span="18">
            <el-input
              v-model="formData.bookMoney"
              placeholder="请输入金额"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所处环节" prop="bookLink">
          <el-col :span="18">
            <el-select v-model="formData.bookLink" placeholder="请选择所处环节">
              <el-option label="申请受理" :value="10"></el-option>
              <el-option label="授信调查" :value="11"></el-option>
              <el-option label="审查审批" :value="12"></el-option>
              <el-option label="拒贷" :value="13"></el-option>
              <el-option label="合同签署" :value="14"></el-option>
              <el-option label="抵质押" :value="15"></el-option>
              <el-option label="待放款" :value="16"></el-option>
              <el-option label="已放款" :value="17"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="是否为住房消费贷：" prop="bookIsHousing">
          <el-col :span="18">
            <el-radio-group v-model="formData.bookIsHousing">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item> -->

        <el-form-item label="预计放款时间" prop="bookEstimateMakeMonth">
          <el-col :span="18">
            <el-date-picker
              type="month"
              prop="data"
              placeholder="选择日期"
              v-model="formData.bookEstimateMakeMonth"
              style="width: 100%"
            >
              ></el-date-picker
            >
          </el-col>
        </el-form-item>
        <el-form-item label="抵押物地址" prop="bookCollateral">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCollateral"
              placeholder="请输入抵押物地址"
              :disabled="itemId == -1 ? false : true"
            ></el-input>
            <!-- <el-select
              v-model="formData.bookBuildId"
              placeholder="请选择楼盘名称"
            >
              <el-option
                :label="item.buildName"
                :value="item.buildId"
                v-for="item in buildList"
                :key="item.buildId"
              ></el-option>
            </el-select> -->
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="bookRemark">
          <el-col :span="18">
            <el-input
              type="textarea"
              v-model="formData.bookRemark"
              placeholder="请输入备注"
            ></el-input>
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
var moment = require("moment");
import * as ajax from "@/api/parameterSee";
export default {
  data() {
    return {
      itemId: undefined,
      formLoading: false,
      buildList: [],
      LoanList: [],
      formData: {},
      dialogVisible: false,
      form: {},
      rules: {
        bookLoanId: [
          { required: true, message: "请选择贷种", trigger: "change" },
        ],
        bookCustomer: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        // bookIsHousing: [
        //   { required: true, message: "请输入", trigger: "change" },
        // ],
        // bookCustomerPhone: [
        //   { required: true, message: "请输入联系方式", trigger: "blur" },
        // ],
        bookMoney: [{ required: true, message: "请输入金额", trigger: "blur" }],
        bookLink: [
          { required: true, message: "请选择所处环节", trigger: "change" },
        ],
        bookEstimateMakeMonth: [
          { required: true, message: "请选择预计放款时间", trigger: "change" },
        ],
        bookCollateral: [
          { required: true, message: "请输入抵押物地址", trigger: "blur" },
        ],
        // bookRemark: [
        //   { required: true, message: "请输入备注", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.getLoanList();
    this.getBuildList();
  },
  methods: {
    getLoanList() {
      ajax
        .getLoanList({ type: 2 })
        .then((res) => {
          this.LoanList = res.data.data.list;
        })
        .catch((res) => {});
    },
    getBuildList() {
      ajax
        .getBuildList({ num: 0 })
        .then((res) => {
          this.buildList = res.data.data.list;
        })
        .catch((res) => {});
    },
    getModel(id) {
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.formData = {
          bookLoanId: "",
          bookCustomer: "",
          // bookCustomerPhone: "",
          bookMoney: "",
          bookLink: "",
          bookCollateral: "",
          // bookBuildId: "",
          bookEstimateMakeMonth: "",
          bookRemark: "",
          // bookIsHousing: 1,
        };
      } else {
        // this.getLoanInfo(id);
        this.getBookInfo(id);
      }
    },
    // 详情
    getBookInfo(id) {
      ajax
        .getBookInfo({ bookId: id })
        .then((res) => {
          this.dialogVisible = true;
          this.formData = {
            bookLoanId: res.data.data.bookLoanId,
            bookCustomer: res.data.data.bookCustomer,
            // bookCustomerPhone: res.data.data.bookCustomerPhone,
            bookMoney: res.data.data.bookMoney,
            bookLink: res.data.data.bookLink,
            bookCollateral: res.data.data.bookCollateral,
            // bookBuildId: res.data.data.bookBuildId,
            bookEstimateMakeMonth: res.data.data.bookEstimateMakeMonth,
            bookRemark: res.data.data.bookRemark,
            // bookIsHousing: res.data.data.bookIsHousing,
            bookId: res.data.data.bookId,
          };
          this.formData.bookEstimateMakeMonth;
          // this.formData = res.data.data;
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
        });
    },
    // 保存
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          let apiAll = this.itemId == -1 ? ajax.addBook1 : ajax.editBook;
          let data = {
            bookType: 1,
            ...this.formData,
            bookEstimateMakeMonth: moment(
              this.formData.bookEstimateMakeMonth
            ).format("YYYY-MM"),
          };
          console.log(data);
          apiAll(data)
            .then((res) => {
              this.formLoading = false;
              this.dialogVisible = false;
              this.openNotification("success", res.data.errmsg);
              this.$emit("refresh");
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
</style>