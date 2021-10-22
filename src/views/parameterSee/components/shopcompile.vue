<template>
  <div>
    <!--  编辑的弹窗 -->
    <el-dialog
      width="620px"
      :title="itemId == -1 ? '新增在途业务' : '编辑在途业务'"
      :visible.sync="dialogVisible"
      destroy-on-close
    >
      <el-form
        ref="ruleForm"
        :model="formData"
        label-width="180px"
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
                @click.native="onChangeLoan(item)"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称" prop="bookCustomer">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCustomer"
              placeholder="请输入客户名称"
            ></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="联系方式" prop="bookCustomerPhone">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCustomerPhone"
              placeholder="请输入联系方式"
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
              <el-option label="受理上报" :value="0"></el-option>
              <el-option label="审核审批" :value="1"></el-option>
              <el-option label="拒绝" :value="2"></el-option>
              <el-option label="合同签署及抵质押" :value="3"></el-option>
              <el-option label="上报预审" :value="4"></el-option>
              <el-option label="待放款" :value="5"></el-option>
              <el-option label="已放款" :value="6"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="是否已结顶" prop="bookItem" v-if="loanType == 0">
          <el-col :span="18">
            <el-radio-group v-model="formData.bookItem">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="2">是</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="是否为住房消费贷" prop="bookIsHousing">
          <el-col :span="18">
            <el-radio-group v-model="formData.bookIsHousing">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="是否公积金组合贷" prop="bookIsLoanOfPAF">
          <el-col :span="18">
            <el-radio-group v-model="formData.bookIsLoanOfPAF">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="放款模式" prop="bookLoanModel">
          <el-col :span="18">
            <el-radio-group v-model="formData.bookLoanModel" class="radio">
              <el-radio :label="1">见抵押预告登记回执放款</el-radio>
              <el-radio :label="2">见购房合同备案放款</el-radio>
              <el-radio :label="3">见抵押登记证明放款</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>

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
        <el-form-item label="楼盘名称" prop="bookBuildId" v-if="loanType == 0">
          <el-col :span="18">
            <el-select
              v-model="formData.bookBuildId"
              placeholder="请选择楼盘名称"
              filterable
            >
              <el-option
                :label="item.buildName"
                :value="item.buildId"
                v-for="item in buildList"
                :key="item.buildId"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="预审人员名称">
          <el-col :span="18">
            <el-input
              v-model="formData.bookCheckName"
              placeholder="请输入金额"
            ></el-input>
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
      loanType: -1,
      LoanList: [],
      formData: {},
      dialogVisible: false,
      form: {},
      rules: {
        bookLoanId: [
          { required: true, message: "请选择贷种", trigger: "change" },
        ],
        bookItem: [{ required: true, message: "请选择", trigger: "change" }],
        bookCustomer: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        bookIsHousing: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        bookLoanModel: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        bookIsLoanOfPAF: [
          { required: true, message: "请输入", trigger: "change" },
        ],

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
        bookBuildId: [
          { required: true, message: "请输入楼盘名称", trigger: "change" },
        ],
        // bookCheckName: [
        //   { required: true, message: "请输入预审名称", trigger: "blur" },
        // ],
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
        .getLoanList({ type: 1 })
        .then((res) => {
          this.LoanList = res.data.data.list;
        })
        .catch((res) => {});
    },
    getBuildList() {
      ajax
        .getBuildList()
        .then((res) => {
          this.buildList = res.data.data.list;
        })
        .catch((res) => {});
    },
    getModel(id) {
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.loanType = -1;
        this.formData = {
          bookLoanId: "",
          bookCustomer: "",
          // bookCustomerPhone: "",
          bookMoney: "",
          bookLink: undefined,
          bookItem: "",
          bookBuildId: "",
          bookEstimateMakeMonth: "",
          bookRemark: "",
          bookCheckName: "",
          bookIsHousing: undefined,
          bookIsLoanOfPAF: undefined,
          bookLoanModel: undefined,
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
          let current = moment().format("YYYY");
          console.log(current);
          this.formData = {
            bookLoanId: res.data.data.bookLoanId,
            bookCustomer: res.data.data.bookCustomer,
            // bookCustomerPhone: res.data.data.bookCustomerPhone,
            bookMoney: res.data.data.bookMoney,
            bookLink: res.data.data.bookLink,
            bookItem: res.data.data.bookItem?res.data.data.bookItem:'',
            bookEstimateMakeMonth: res.data.data.bookEstimateMakeMonth,
            bookRemark: res.data.data.bookRemark,
            bookCheckName: res.data.data.bookCheckName,
            bookIsHousing: res.data.data.bookIsHousing,
            bookIsLoanOfPAF: res.data.data.bookIsLoanOfPAF,
            bookLoanModel: res.data.data.bookLoanModel,
            bookId: res.data.data.bookId,
          };
          this.formData.bookEstimateMakeMonth;
          this.LoanList.forEach((item) => {
            if (item.loanId == this.formData.bookLoanId) {
              if (item.loanType == 0) {
                this.loanType = item.loanType;
              } else {
                this.loanType = -1;
              }
            }
          });
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
            bookType: 0,
            ...this.formData,
            bookEstimateMakeMonth: moment(
              this.formData.bookEstimateMakeMonth
            ).format("YYYY-MM"),
          };
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

      /*  this.formLoading = true;
      let apiAll = this.itemId == -1 ? ajax.addBook1 : ajax.editBook;
      let data = {
        bookType: 0,
        ...this.formData,
        bookEstimateMakeMonth: moment(
          this.formData.bookEstimateMakeMonth
        ).format("M"),
      };
      console.log(data);
      apiAll(data)
        .then((res) => {
          this.formLoading = false;
          this.dialogVisible = false;
          this.openNotification("success", res.data.errmsg);
          this.$emit('refresh')
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
          this.formLoading = false;
        }); */
    },
    onChangeLoan(item) {
      this.loanType = item.loanType;
      console.log(this.loanType);
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
.radio {
  > * {
    margin-top: 10px;
  }
}
</style>