<template>
  <div>
    <div class="page_header" v-loading.fullscreen.lock="fullscreenLoading">
      <el-button
        type="primary"
        @click="save()"
        size="small"
        :loading="formLoading"
        icon="el-icon-check"
        >保存</el-button
      >
      <el-button size="small" icon="el-icon-arrow-left" @click="$router.go(-1)"
        >返回</el-button
      >
    </div>
    <el-card class="box-card" shadow="none">
      <el-form
        :model="formData"
        class="demo-form-inline"
        ref="ruleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称：" prop="roleName">
          <el-input
            v-model="formData.roleName"
            placeholder="请输入角色名称"
            :disabled="itemId == 3 ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="roleStatus">
          <el-radio-group v-model="formData.roleStatus">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="所属支行：" prop="roleSubbranchId">
          <el-select
            v-model="formData.roleSubbranchId"
            placeholder="请选择支行"
            @change="change"
          >
            <el-option
              :label="item.subbranchName"
              :value="item.subbranchId"
              v-for="item in SubbranchList"
              :key="item.subbranchId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" prop="roleDeptId">
          <el-select v-model="formData.roleDeptId" placeholder="请选择部门">
            <el-option
              v-for="item in departmentList"
              :label="item.subbranchName"
              :value="item.subbranchId"
              :key="item.subbranchId"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="所属架构：" prop="roleDeptId">
          <el-col :span="18">
            <el-cascader
              :options="subbranchlist"
              :show-all-levels="false"
              :props="props"
              v-model="formData.roleDeptId"
            ></el-cascader>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="tree">
        <div
          v-for="(item, index) in treeListFilter"
          :key="index"
          class="tree_style"
        >
          <div class="title">
            <!-- {{ item.name }} -->
          </div>
          <el-tree
            class="tree_style"
            @check="check()"
            :data="item.menuChildList"
            show-checkbox
            node-key="menuId"
            ref="tree"
            default-expand-all
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSubbranchListAll } from "@/api/subbranch";
import * as ajax from "@/api/role";
export default {
  name: "addRole",
  data() {
    return {
      defaultItems: {
        children: "childList",
        label: "subbranchName",
      },
      list: [],
      treeListFilter: [],
      subbranchlist: [],
      departmentList: [],
      treeList: [],
      formLoading: false,
      itemId: undefined,
      props: {
        children: "childList",
        label: "subbranchName",
        emitPath: false,
        value: "subbranchId",
        checkStrictly: true,
      },
      fullscreenLoading: false,
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        // roleSubbranchId: [
        //   {
        //     required: true,
        //     message: "请选择",
        //     trigger: "change",
        //   },
        // ],
        roleStatus: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        roleDeptId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      formData: {
        roleName: "",
        // roleSubbranchId: undefined,
        roleStatus: 1,
        roleDeptId: undefined,
        menuIdList: [],
      },
      defaultProps: {
        children: "menuChildList",
        label: "menuName",
      },
    };
  },
  created() {
    // this.getSubbranchListAll();
    this.getAllList();
    // this.getSubbranchNoTree();
    this.itemId = this.$route.query.id;
    if (this.itemId > -1) {
      this.$nextTick(() => {
        this.$store.commit("modifyPageT", "编辑角色");
        this.getEditAuthMenuList();
      });
    }
    if (this.itemId == -1) {
      this.getAuthMenuList();
    }
  },
  beforeDestroy() {},
  methods: {
    handleNodeClick(data) {
      this.formData.roleDeptId = data.subbranchId;
      console.log(data.subbranchId);
    },
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
        })
        .catch(() => {});
    },
    // 递归
    getAllList() {
      getSubbranchListAll({})
        .then((res) => {
          let subbranchlist = res.data.data;
          this.subbranchlist = this.traverse(subbranchlist)
        })
        .catch(() => {});
    },
    traverse(data) {
      data.forEach((item) => {
        if (item.childList.length <= 0) {
          item.childList = null;
        } else {
          this.traverse(item.childList);
        }
      });
      return data;
    },

    // 选择权限
    check() {
      let a = [];
      this.treeListFilter.map((item, index) => {
        a[index] = this.$refs.tree[index].getCheckedKeys();
      });
      this.formData.menuIdList = a.flat();
      console.log(this.formData.menuIdList);
    },
    getEditAuthMenuList() {
      this.fullscreenLoading = true;
      ajax
        .getAuthMenuList({})
        .then((res) => {
          this.treeList = res.data.data;
          let treeListFilter = [];
          this.treeList.forEach((item) => {
            treeListFilter.push({ name: 1, menuChildList: [item] });
          });
          this.treeListFilter = treeListFilter;

          this.getRoleInfo(this.itemId);
        })
        .catch((res) => {
          this.openNotification("error", res.data.errmsg);
        });
    },
    //权限菜单列表
    getAuthMenuList() {
      this.fullscreenLoading = true;
      ajax
        .getAuthMenuList({})
        .then((res) => {
          this.treeList = res.data.data;
          let treeListFilter = [];
          this.treeList.forEach((item) => {
            treeListFilter.push({ name: 1, menuChildList: [item] });
          });
          this.treeListFilter = treeListFilter;
          this.fullscreenLoading = false;
        })
        .catch((res) => {
          this.fullscreenLoading = false;
        });
    },
    // // 选择部门
    // change(id) {
    //   ajax
    //     .getSubbranchNoTree({ subbranchPid: id })
    //     .then((res) => {
    //       this.departmentList = res.data.data;
    //     })
    //     .catch((res) => {});
    // },
    // 详情
    getRoleInfo(id) {
      ajax
        .getRoleInfo({ roleId: id })
        .then((res) => {
          this.formData = {
            roleName: res.data.data.roleName,
            roleStatus: res.data.data.roleStatus,
            // roleSubbranchId: res.data.data.roleSubbranchId,
            roleId: res.data.data.roleId,
            roleDeptId: res.data.data.roleDeptId,
            menuIdList: res.data.data.menuIdList,
          };
          this.setCheckedKeys(res.data.data.menuIdList);
          this.fullscreenLoading = false;
        })
        .catch((res) => {
          this.fullscreenLoading = false;
          this.openNotification("error", res.data.errmsg);
        });
    },
    // 回填权限
    setCheckedKeys(menuIds) {
      var menuArr = [];
      for (let j = 0; j < menuIds.length; j++) {
        const menuid = menuIds[j];
        // console.log(this.treeList)
        let key = this.getNodekeys(menuid, this.treeList);
        if (key != "") {
          menuArr.push(key);
        }
      }
      // this.$refs.tree.setCheckedKeys(menuArr);
      // this.$refs.tree[j].setCheckedKeys(menuArr);
      this.treeListFilter.map((item, index) => {
        this.$nextTick(() => {
          console.log(index);
          this.$refs.tree[index].setCheckedKeys(menuArr);
        });
      });
    },
    //获取选中的孩子节点
    getNodekeys(menuId, childrens) {
      var key = "";
      for (let i = 0; i < childrens.length; i++) {
        const menu = childrens[i];
        let id = menu.menuId;
        let childs = menu.menuChildList;
        if (id == menuId) {
          //如果相等
          if (childs && childs.length > 0) {
            key = this.getNodekeys(menuId, childs);
          } else {
            //没有孩子节点
            return menuId;
          }
        } else if (childs && childs.length > 0) {
          key = this.getNodekeys(menuId, childs);
        }
        if (key != "") {
          return key;
        }
      }
      return key;
    },
    // // 支行
    // getSubbranchNoTree() {
    //   ajax
    //     .getSubbranchNoTree({ subbranchLevel: 1 })
    //     .then((res) => {
    //       this.SubbranchList = res.data.data;
    //     })
    //     .catch((res) => {});
    // },
    // 保存
    save() {
      let b = [];
      this.treeListFilter.map((item, index) => {
        b[index] = this.$refs.tree[index].getHalfCheckedKeys();
      });
      let allList = b.flat();
      this.formData.menuIdList = [...allList, ...this.formData.menuIdList];

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          let data = {
            ...this.formData,
          };
          console.log(data);
          let api = this.itemId == -1 ? ajax.addRole : ajax.editRole;
          api(data)
            .then((res) => {
              this.formLoading = false;
              this.openNotification("success", res.data.errmsg);
              this.$router.go(-1);
            })
            .catch((res) => {
              this.formLoading = false;
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
.page_header {
  padding-bottom: 20px;
}
.box-card {
  .el-input {
    width: 300px;
  }
}
.tree {
  display: flex;
  overflow-x: scroll;
}
.tree_style {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    padding-bottom: 10px;
  }
}
</style>