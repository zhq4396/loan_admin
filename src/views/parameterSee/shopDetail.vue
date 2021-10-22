<template>
<div>
  <ExportFile
  downUrl="/admin/book/exportConsumerDetail"
  btnTxt='导出表格'
  />
   <div style="margin:20px;margin-left:0">金额单位(万元)</div>
<el-table
    :data="tableData"
    style="width: 100%;margin-top:20px"
    :cell-style="cellClass"
    :header-cell-style="headClass"
    
  >

  <el-table-column    
      label="住房消费贷款旺季储备表-3.3"
      width="100%"
      >

    <el-table-column
      prop="subbranchName"
      label="支行"
      width="150">
    </el-table-column>
    <el-table-column label="储备总量">
        <el-table-column label="笔数" prop='saveCount'></el-table-column>
        <el-table-column label="金额" prop='saveMoney'></el-table-column>
    </el-table-column>
   <el-table-column label="储备贷种构成">
        <el-table-column label="住房消费-一手房">
            <el-table-column label="笔数" prop='firstHouseCount' ></el-table-column>
            <el-table-column label="金额" prop='firstHouseMoney' ></el-table-column>
        </el-table-column>
        <el-table-column label="住房消费-二手房">
            <el-table-column label="笔数" prop='secondHouseCount'></el-table-column>
            <el-table-column label="金额" prop='secondHouseMoney'></el-table-column>
        </el-table-column>
        <el-table-column label="商用房">
            <el-table-column label="笔数" prop='businessCount'></el-table-column>
            <el-table-column label="金额" prop='businessMoney'></el-table-column>
        </el-table-column>
    </el-table-column>
    <el-table-column label="预计放款时间(近三月，含当月)">
        <el-table-column :label="firstMonth" prop='firstMonthCount'></el-table-column>
        <el-table-column :label="secondMonth" prop='secondMonthCount'></el-table-column>
        <el-table-column :label="threadMonth" prop='threadMonthCount'></el-table-column>
    </el-table-column>
    <el-table-column label="业务流程分布">
        <el-table-column label="住房消费贷款" >
            <el-table-column label="在途" prop='allLoanOnWayMoney'></el-table-column>
            <el-table-column label="待放款" prop='allLoanWaitingLoanMoney'></el-table-column>
        </el-table-column>
        <el-table-column label="其中—二手房">
            <el-table-column label="在途" prop='secondHouseOnWayMoney'></el-table-column>
            <el-table-column label="待放款" prop='secondHouseWaitingLoanMoney'></el-table-column>
        </el-table-column>
    </el-table-column>
    <el-table-column
      prop="avgLoadingDay"
      label="在途业务平均时长（不含待放款状态）"
      width="150">
    </el-table-column>

    </el-table-column>


   
  </el-table>
</div>

  
</template>

<script>
import ExportFile from "@/component/exportFile/exportFile";
import * as ajax from '../../api/parameterSee'
  export default {
    components:{ExportFile},
    data() {
      return {
        tableData: [
          
        ],
      firstMonth:'',
      secondMonth:'',
      threadMonth:'',
      }
    },
    methods: {

      getDetail(){
      
      let data ={};
      ajax
      .getConsumerDetail(data)
      .then((res)=>{
        let dataSource =res.data
        
        this.data = res.data.data
        const dataList = this.data.recordList
        const month=this.data
        this.firstMonth=month.firstMonth+'月'
        this.secondMonth=month.secondMonth+'月'
        this.threadMonth=month.threadMonth+'月'
          for (let v = 0; v < dataList.length; v++){
            this.tableData.push({
								subbranchName:dataList[v].subbranchName,
                saveCount:dataList[v].saveCount,
                saveMoney:dataList[v]. saveMoney,
                firstHouseCount:dataList[v]. firstHouseCount,
                firstHouseMoney:dataList[v]. firstHouseMoney,
                secondHouseCount:dataList[v]. secondHouseCount,
                secondHouseMoney:dataList[v]. secondHouseMoney,
                businessCount:dataList[v].businessCount,
                businessMoney:dataList[v].businessMoney,
                firstMonthCount:dataList[v]. firstMonthCount,
                secondMonthCount:dataList[v]. secondMonthCount,
                threadMonthCount:dataList[v]. threadMonthCount,
                allLoanOnWayMoney:dataList[v].allLoanOnWayMoney,
                allLoanWaitingLoanMoney:dataList[v].allLoanWaitingLoanMoney,
                secondHouseOnWayMoney:dataList[v]. secondHouseOnWayMoney,
                secondHouseWaitingLoanMoney:dataList[v]. secondHouseWaitingLoanMoney,
                avgLoadingDay:dataList[v].avgLoadingDay,
							})

          }
          
        
      })
      .catch((res)=>{
        
      })
    }, 


      headClass (row, column, rowIndex, columnIndex) {
        if (row.column.label === "所有贷种"){
          return 'text-align: center;'
        }else{
           return 'text-align: center;;'
        }
        
      },
      cellClass(){
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
 /*    .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
        border-color: black;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: black;
    } */
    
</style>

