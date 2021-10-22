<template>
  <div class="login">
    <div class="login_img">
      <img src="@/assets/logo.png" alt="" class="img_logo" />
    </div>
    <div class="login_area">
      <div class="login_title">中国邮政邮储银行台州市分行-信贷业务管控系统</div>
      <div class="form_area">
        <el-form :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item prop="personNumber">
            <div class="form_item">
              <img class="head_img" src="@/assets/login/login_user.png" alt />
              <el-input
                v-model="formData.personNumber"
                placeholder="请输入用户工号"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="personPassword">
            <div class="form_item">
              <img
                class="head_img"
                src="@/assets/login/login_password.png"
                alt
              />
              <el-input
                v-model="formData.personPassword"
                type="password"
                placeholder="请输入登录密码"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <div class="form_item">
              <img
                class="head_img"
                src="@/assets/login/login_password.png"
                alt
              />
              <el-input
                v-model="formData.code"
                type="password"
                placeholder="请输入验证码"
              ></el-input>
              <img class="code_img" :src="codeImage" @click="getCode" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm()"
              class="login_btn"
              :loading="loginBtnLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { API_HOST } from "@/server/network.js";
var moment = require("moment");
import * as ajax from "@/api/public";
export default {
  name: "login",
  data() {
    return {
      loginBtnLoading: false,
      codeImage: "",
      formData: {
        personNumber: "",
        personPassword: "",
        code: "",
        number: "",
      },
      rules: {
        personNumber: [
          { required: true, message: "请输入用户工号", trigger: "blur" },
        ],
        personPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    if (process.env.NODE_ENV === "development") {
      this.formData = {
        personNumber: "10001",
        personPassword: "1qaz@WSX",
        code: "",
        number: "",
      };
    }
    this.getCode();
  },
  methods: {
    getCode() {
      let number = moment().format("x");
      this.codeImage = API_HOST + "/admin/login/getCode?number=" + number;
      this.formData.number = number;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loginBtnLoading = true;
          ajax
            .login({ ...this.formData })
            .then((res) => {
              localStorage.setItem(
                "sessionAdminId",
                JSON.stringify(res.data.data.admin.sessionId)
              );

              localStorage.setItem(
                "loanUserAdmin",
                JSON.stringify(res.data.data.admin)
              );

              localStorage.setItem(
                "loanPageMenu",
                JSON.stringify(res.data.data.menuList)
              );
              this.$router.push("/element");
              this.openNotification("success", res.data.errmsg);
            })
            .catch((res) => {
              this.loginBtnLoading = false;
              this.openNotification("error", res.data.errmsg);
            });
        } else {
          return false;
        }
      });
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
.login {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  background: url("../../assets/login/login_background.png") no-repeat center
    center fixed;
  background-size: cover;
  .login_area {
    width: 518px;
    height: 561px;
    margin-right: 250px;
    background: #fff;
    border-radius: 18px;
    .login_title {
      position: relative;
      margin-top: 60px;
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: #333333;
      letter-spacing: 4px;
      // &::after {
      //   position: absolute;
      //   content: "";
      //   width: 80px;
      //   height: 6px;
      //   bottom: -10px;
      //   left: 50%;
      //   transform: translateX(-50%);
      //   border-radius: 3px;
      //   background: #53b961;
      // }
    }
    .form_area {
      margin-top: 50px;
      padding: 0 70px;
      .login_btn {
        width: 100%;
        margin-top: 40px;
        height: 48px;
        border-color: #53b961;
        background: linear-gradient(to right, #53b961, #0ac8a9);
        border-radius: 24px;
        font-size: 24px;
        color: #ffffff;
        font-weight: 500;
      }
      .form_item {
        display: flex;
        padding-bottom: 7px;
        margin-top: 10px;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        .head_img {
          width: 18px;
          height: 20px;
        }
        /deep/ input {
          border: 0;
        }
        .login_input {
          margin-top: 3px;
          border: 0;
          &:focus {
            box-shadow: 0 0 0 0;
          }
        }
      }
    }
  }
}
.code_img {
  width: 100px;
  height: 45px;
}
.login_img {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .img_logo {
    height: 50px;
    width: 400px;
  }
}
</style>
