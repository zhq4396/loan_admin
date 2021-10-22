<template>
    <!--  删除弹窗 -->
    <el-dialog
      width=620px
      title="确认提示"
      :visible.sync="removes"
      destroy-on-close
      @close="handleClose"
      destroy-on-close:true
    >
     <div class="center">
        <i class="el-icon-question" style="font-size: 30px; color: #FE9400;margin-right:20px;"></i><span style="font-size:20px">是否确定删除该楼盘</span>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="removes = false">取 消</el-button>
        <el-button type="primary" @click="removes = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return{
            formData: {},
            removes:false,
        }
    },
    methods: {
        getModel(){
            this.removes=true;
        }
    }
}
</script>

<style lang="less" scoped>
.center {
display:flex;
}
</style>

