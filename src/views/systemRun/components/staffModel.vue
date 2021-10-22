<template>
  <div>
    <el-dialog
      :title="itemId == -1 ? '新增人员' : '编辑人员'"
      :visible.sync="dialogVisible"
      destroy-on-close
      width="620px"
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="formData"
        label-width="200px"
      >
        <el-form-item label="工号：" prop="personNumber">
          <el-col :span="18">
            <el-input
              v-model="formData.personNumber"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="员工信息：" prop="personName">
          <el-col :span="18">
            <el-input
              v-model="formData.personName"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式：" prop="personPhone">
          <el-col :span="18">
            <el-input
              v-model="formData.personPhone"
              placeholder="请输入"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="角色：" prop="personRoleId">
          <el-col :span="18">
            <el-select
              v-model="formData.personRoleId"
              placeholder="请选择"
              class="role_class"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in roleList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="部门：" prop="personSubbranchId">
          <el-col :span="18">
            <el-cascader
              :options="subbranchlist"
              :show-all-levels="false"
              :props="props"
              v-model="formData.personDeptId"
              style="width: 100%"
            ></el-cascader>
            <!-- <el-select
              class="role_class"
              v-model="formData.personSubbranchId"
              placeholder="请选择"
              @change="change"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in subList"
                :key="item.value"
              ></el-option>
            </el-select> -->
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="部门：" prop="personDeptId">
          <el-col :span="18">
            <el-select
              v-model="formData.personDeptId"
              placeholder="请选择"
              class="role_class"
            >
              <el-option
                :label="item.subbranchName"
                :value="item.subbranchId"
                v-for="item in departmentList"
                :key="item.subbranchId"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item> -->
        <el-form-item label="状态：" prop="personStatus">
          <el-col :span="18">
            <el-radio-group v-model="formData.personStatus">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="是否为小企业客户经理：" prop="personCustomer">
          <el-col :span="18">
            <el-radio-group v-model="formData.personCustomer">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" v-if="!disabled"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as ajax from "@/api/subbranch";
export default {
  props: {
    subList: {
      type: Array,
    },
    roleList: {
      type: Array,
    },
    subbranchlist: {
      type: Array,
    },
  },
  data() {
    return {
      props: {
        children: "childList",
        label: "subbranchName",
        emitPath: false,
        value: "subbranchId",
        checkStrictly: true,
      },
      disabled: false,
      itemId: undefined,
      formData: {},
      dialogVisible: false,
      departmentList: [],
      rules: {
        personNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        personName: [{ required: true, message: "请输入", trigger: "blur" }],
        personPhone: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        personRoleId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        // personSubbranchId: [
        //   {
        //     required: true,
        //     message: "请选择",
        //     trigger: "change",
        //   },
        // ],
        personDeptId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        personStatus: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        personCustomer: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    getModel(id) {
      this.dialogVisible = false;
      this.disabled = false;
      this.itemId = id;
      if (id == -1) {
        this.dialogVisible = true;
        this.formData = {
          personNumber: "",
          personName: "",
          personPhone: "",
          personRoleId: "",
          personDeptId: "",
          personStatus: 1,
          personCustomer: 0,
        };
      } else {
        this.getPersonInfo(id);
      }
    },
    getPersonInfo(id) {
      ajax
        .getPersonInfo({ personId: id })
        .then((res) => {
          if (id == 1) {
            this.disabled = true;
          }
          this.formData = {
            personNumber: res.data.data.personNumber,
            personName: res.data.data.personName,
            personPhone: res.data.data.personPhone,
            personRoleId: res.data.data.personRoleId,
            personDeptId: res.data.data.personDeptId,
            personStatus: res.data.data.personStatus,
            personCustomer: res.data.data.personCustomer,
            personId: res.data.data.personId,
          };
          this.dialogVisible = true;
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
        });
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          let apiAll = this.itemId == -1 ? ajax.addPerson : ajax.editPerson;
          let data = { ...this.formData };
          apiAll(data)
            .then((res) => {
              this.formLoading = false;
              this.dialogVisible = false;
              if (this.itemId == -1) {
                this.openNotification(
                  "success",
                  "新增人员成功，初始密码为1qaz@WSX"
                );
              } else {
                this.openNotification("success", res.data.errmsg);
              }
              this.$emit("refreshList");
            })
            .catch((res) => {
              this.openNotification("error", res.data.errmsg);
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
.role_class {
  width: 100%;
}
</style>