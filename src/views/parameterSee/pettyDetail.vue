<template>
<div>
 
   <ExportFile
   downUrl="/admin/book/exportSmallAmountDetail"
   btnTxt='导出表格'
   
   />
   <div style="margin:20px;margin-left:0">金额单位(万元)</div>
<el-table
    :data="tableData"
    style="width: 100% ;margin-top:20px"
    :cell-style="cellClass"
    :header-cell-style="headClass">

  

 <el-table-column
      prop="subbranchName"
      label="支行"
      width="150">
      <el-table-column label="" prop='subbranchName'></el-table-column>
    </el-table-column>
    <el-table-column label="申请受理" >
        <el-table-column label="笔数" prop='acceptanceCount'></el-table-column>
        <el-table-column label="金额" prop='acceptanceMoney'></el-table-column>
    </el-table-column>
    <el-table-column label="授信调查">
        <el-table-column label="笔数" prop='investigateCount'></el-table-column>
        <el-table-column label="金额" prop='investigateMoney'></el-table-column>
    </el-table-column>
    <el-table-column label="审查审批">
        <el-table-column label="笔数" prop='checkCount'></el-table-column>
        <el-table-column label="金额" prop='checkMoney'></el-table-column>
    </el-table-column>

    <el-table-column label="合同签署" >
        <el-table-column label="笔数" prop='signCount'></el-table-column>
        <el-table-column label="金额" prop='signMoney'></el-table-column>
    </el-table-column>
    <el-table-column label="抵质押">
        <el-table-column label="笔数" prop='mortgageCount'></el-table-column>
        <el-table-column label="金额" prop='mortgageMoney'></el-table-column>
    </el-table-column>
    <el-table-column label="待放款">
        <el-table-column label="笔数" prop='waitingLoanCount'></el-table-column>
        <el-table-column label="金额" prop='waitingLoanMoney'></el-table-column>
    </el-table-column>
        <el-table-column label="拒贷">
        <el-table-column label="笔数" prop='refusedLoanCount'></el-table-column>
        <el-table-column label="金额" prop='refusedLoanMoney'></el-table-column>
    </el-table-column>
    <el-table-column label="已放款">
        <el-table-column label="笔数" prop='loanedCount'></el-table-column>
        <el-table-column label="金额" prop='loanedMoney'></el-table-column>
    </el-table-column>
   <el-table-column label="在途时长">
        <el-table-column label="" prop='avgLoadingDay'></el-table-column>
    </el-table-column>
    
   
 </el-table>
</div>

  
</template>

<script>

import ExportFile from "@/component/exportFile/exportFile";
import * as ajax from '../../api/parameterSee'
  export default {
    components: {ExportFile},
    data() {
      return {
        tableData: [

        ]
      }
    },
    methods: {

      getDetail(){
      this.tableLoading = true;
      let data ={};
      ajax
      .getSmallAmountDetail(data)
      .then((res)=>{
        let dataSource =res.data.data
        
          for (let v = 0; v < dataSource.length; v++){
            this.tableData.push({
              acceptanceCount:dataSource[v].acceptanceCount,
              acceptanceMoney:dataSource[v].acceptanceMoney,

             investigateCount:dataSource[v].investigateCount,
              investigateMoney:dataSource[v].investigateMoney,

              checkCount:dataSource[v].checkCount,
              checkMoney:dataSource[v].checkMoney,

              refusedLoanCount:dataSource[v].refusedLoanCount,
              refusedLoanMoney:dataSource[v].refusedLoanMoney,

              signCount:dataSource[v].signCount,
              signMoney:dataSource[v].signMoney,

              mortgageCount:dataSource[v].mortgageCount,
              mortgageMoney:dataSource[v].mortgageMoney,

              waitingLoanCount:dataSource[v].waitingLoanCount,
              waitingLoanMoney:dataSource[v].waitingLoanMoney,

              loanedCount:dataSource[v].loanedCount,
              loanedMoney:dataSource[v].loanedMoney,
              avgLoadingDay:dataSource[v].avgLoadingDay,
             subbranchName:dataSource[v].subbranchName,
            })
          }
      })
      .catch((res)=>{
        this.tableLoading = false
      })
    }, 


      headClass ({ row, column, rowIndex, columnIndex }) {
           if (columnIndex === 0) {
        // 指定列号
        return 'text-align: center'
      } else {
        return 'text-align: center'
      }
        
      },
      cellClass(){
        return 'text-align: center'
      },
      changeCellStyle(){
        return 'text-align: center'
      },
      derived(){
     this.$message({
            type: "success",
            message: "操作成功已成功导出表格",
            showClose:true,
          });
   }
      },
     
    mounted() {
      this.getDetail()
    }
  }
</script>

<style scoped>
   /*  .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
        border-color: black;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: black;
    } */
    
</style>
