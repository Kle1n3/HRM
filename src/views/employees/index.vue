<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore='true'>
        <template #before>
          <span>共166条记录</span>
        </template>
        <template #after>
          <el-button size="small" type="success">Excel导出</el-button>
          <el-button size="small" type="warning">复杂表头Excel导出</el-button>
          <el-button size="small" type="info">Excel导入</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table :data="list" border>
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop='username' label="姓名" sortable="" />
          <el-table-column prop='workNumber' label="工号" sortable="" />
          <el-table-column prop='formOfEmployment' :formatter='formatFn' label="聘用形式" sortable="" >
          </el-table-column>
          <el-table-column prop='departmentName' label="部门" sortable="" />
          <el-table-column prop='timeOfEntry' label="入职时间" sortable="" >
            <template slot-scope="{row}">
              {{row.timeOfEntry | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop='' label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="params.page"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getEmployListApi} from '@/api/employees'
import    EmployeeEnum from '@/api/constant/employees'
export default {
  name: "Employees",
  data () {
    return {
      list:[],
      params:{
        page:1,
        size:10,
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData(){
      const {rows} = await getEmployListApi(this.params)
      this.list = rows
    },
    handleCurrentChange(val){
      this.params.page = val
      this.initData()
    },
    formatFn(row, column, cellValue, index){
      const obj =EmployeeEnum.hireType.find(item=>item.id ===cellValue*1)
      return obj? obj.value:'未知'
    }
  }
};
</script>

<style></style>
