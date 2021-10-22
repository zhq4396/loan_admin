<template>
  <div class="admin_page_title">
    <div class="page_title" v-if="$route.meta.pageTitle != 'element'">
      {{ pageTitle }}
    </div>
    <!-- <div class="img">
      <img src="../../assets/logo.png" alt="" class="img_logo" />
    </div> -->
    <div class="bottom_area">
      <!-- <div>{{ userName }}</div> -->
      <!-- <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">退出登录</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <!-- <el-button type="text" >退出登陆</el-button> -->
    </div>
    <!-- <el-button size="small" @click="renturnPage" icon="el-icon-arrow-left"
      >返回</el-button
    > -->
    <el-dialog
      title="修改密码"
      modal
      destroy-on-close
      :visible.sync="dialogVisible"
      width="620px"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData">
        <el-form-item label="工号：" label-width="100px">
          <el-col :span="18">
            <el-input
              v-model="personNumber"
              :disabled="true"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="原密码：" prop="password" label-width="100px">
          <el-col :span="18">
            <el-input
              v-model="formData.password"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword" label-width="100px">
          <el-col :span="18">
            <el-input
              type="password"
              v-model="formData.newPassword"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="新密码："
          prop="newPasswordRepart"
          label-width="100px"
        >
          <el-col :span="18">
            <el-input
              type="password"
              v-model="formData.newPasswordRepart"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as ajax from "@/api/public";
import { mapMutations, mapState } from "vuex";
export default {
  name: "adminPageTitle",
  data() {
    return {
      personNumber: "",
      formData: {
        password: "",
        newPassword: "",
        newPasswordRepart: "",
        // newPasswordRepart:"",
      },
      rules: {
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入", trigger: "blur" }],
        newPasswordRepart: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      silderMenu: [],
      userName: "",
    };
  },
  computed: {
    ...mapState(["pageTitle"]),
  },
  watch: {
    $route(val) {
      this.setPageTiel();
    },
  },
  created() {
    this.setPageTiel();
    this.userName = JSON.parse(
      localStorage.getItem("loanUserAdmin")
    ).personName;
    this.personNumber = JSON.parse(
      localStorage.getItem("loanUserAdmin")
    ).personNumber;
    this.silderMenu = JSON.parse(localStorage.getItem("loanPageMenu"));
  },
  methods: {
    ...mapMutations(["modifyPageT"]),
    setPageTiel() {
      this.modifyPageT(this.$route.meta.pageTitle);
    },
    renturnPage() {
      this.$router.go(-1);
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.formData.newPassword != this.formData.newPasswordRepart) {
            this.openNotification("error", "确认新密码输入错误");
            return;
          }
          ajax
            .editPassword({
              password: this.formData.password,
              newPassword: this.formData.newPassword,
            })
            .then((res) => {
              this.openNotification("success", res.data.errmsg);
              this.dialogVisible = false;
            })
            .catch((res) => {
              this.openNotification("error", res.data.errmsg);
            });
        } else {
          return false;
        }
      });
    },
    handleCommand(command) {
      if (command == "a") {
        ajax.loginOut().then((res) => {
          localStorage.clear();
          this.$router.push("/");
        });
      } else {
        this.dialogVisible = true;
        this.formData = {
          password: "",
          newPassword: "",
          newPasswordRepart: "",
        };
      }
    },
    openNotification(type, cotnent) {
      this.$notify({
        title: "系统提示",
        message: cotnent,
        type: type,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.admin_page_title {
  flex-shrink: 0;
  display: flex;
  height: 68px;
  padding: 0 60px 0 30px;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e4e4e4;
  .page_title {
    position: relative;
    padding-left: 10px;
    margin-right: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #999999;
    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 18px;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: #0079fe;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.el-menu-vertical-demo {
  border: 0;
  font-size: 12px;
  /deep/ .is-active {
    color: #fff !important;
    background: #1890ff !important;
  }
}
.bottom_area {
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  button {
    color: #fff;
  }
}
.admin_sider {
  flex-shrink: 0;
  display: flex;
  width: 180px;
  height: 100%;
  flex-direction: column;
  background-color: #242836;
}

.amenu {
  width: 180px;
}
.sider_title {
  padding: 20px 0;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.scroll_div {
  flex-grow: 2;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// .img {
//   display: flex;
//   justify-content: center;
//   flex: 1;
// }
// .img_logo {
//   margin-left: -100px;
//   width: 600px;
//   height: 50px;
// }
</style>
