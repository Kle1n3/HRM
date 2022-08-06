<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <template #before>
          <span>共{{ total }}条记录</span>
        </template>
        <template #after>
          <el-button v-if="checkPermission('employees-export')" size="small" type="success" @click="exportToExcelHandler"
            >Excel导出</el-button
          >
          <el-button
          v-if="checkPermission('employees-export')"
            size="small"
            type="warning"
            @click="exportComplicateHeaderExcel"
            >复杂表头Excel导出</el-button
          >
          <el-button
          v-if="checkPermission('employees-import')"
            size="small"
            type="info"
            @click="$router.push('/import?type=user')"
            >Excel导入</el-button
          >
          <el-button
          v-if="checkPermission('employees-add')"
            size="small"
            type="primary"
            @click="$refs.addemployee.dialogVisible = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <el-card>
        <el-table @selection-change="selectList = $event" :data="list" border>
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" sortable="" width="55" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column label="头像">
            <template slot-scope="{ row }">
              <img
              @click="showQrcode(row.staffPhoto)"
                v-imgError="defaultImg"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                :src="row.staffPhoto"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column
            prop="formOfEmployment"
            :formatter="formatFn"
            label="聘用形式"
            sortable=""
          >
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button
              v-if="checkPermission('employees-edit')"
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="role(row.id)" >角色</el-button>
              <el-button v-if="checkPermission('employees-del')" type="text" size="small" @click="delbtn(row.id)"
                >删除</el-button
              >
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
            :total="total"
          />
        </el-row>
        <add-employee @updateList="initData" ref="addemployee" />
      </el-card>
      <el-dialog
        title="Qrcode"
        :visible.sync="codeDialogShow"
        width="30%"
        @close="imgUrl = ''"
      >
        <el-row type="flex" justify="center"
          ><canvas ref="myCanvas"></canvas
        ></el-row>
      </el-dialog>
      <assign-role ref="AssignRole"/>
    </div>
  </div>
</template>

<script>
import { getEmployListApi, delEmployee,getEmployeeBasicInfo } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
import addEmployee from "./components/add-Employee.vue";
import { formatDate } from "@/filters";
import defaultImg from "@/assets/common/defaultImg.gif";
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue';
export default {
  components: { addEmployee, AssignRole },
  name: "Employees",
  data() {
    return {
      codeDialogShow: false,
      imgUrl: "",
      defaultImg: defaultImg,
      list: [],
      params: {
        page: 1,
        size: 10,
      },
      total: 0,
      selectList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { rows, total } = await getEmployListApi(this.params);
      this.list = rows;
      this.total = total;
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.initData();
    },
    formatFn(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(
        (item) => item.id === cellValue * 1
      );
      return obj ? obj.value : "未知";
    },
    async delbtn(id) {
      await this.$confirm("确认删除吗？");
      await delEmployee(id);
      this.$message.success("删除成功");
      if (this.page !== 1 && this.list.length === 1) {
        this.page--;
      }
      this.initData();
    },
    exportToExcelHandler() {
      import("@/vendor/Export2Excel").then(async (excel) => {
        const { rows } = await getEmployListApi({ pag: 1, size: 1000000 });
        const { tableData, tableHeader } = this.dealTableData(rows);
        excel.export_json_to_excel({
          header: tableHeader,
          data: tableData,
          filename: "员工信息",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },
    exportComplicateHeaderExcel() {
      import("@/vendor/Export2Excel").then(async (excel) => {
        const { tableData, tableHeader } = this.dealTableData(this.selectList);
        excel.export_json_to_excel({
          header: tableHeader,
          data: tableData,
          multiHeader: [["姓名", "主要信息", "", "", "", "", "部门"]],
          merges: ["A1:A2", "B1:F1", "G1:G2"],
          filename: "员工信息",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },
    dealTableData(rows) {
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      const arr = [];
      rows.forEach((item) => {
        Object.keys(headers).forEach((value) => {
          const obj = [];
          if (headers[value] === "formOfEmployment") {
            const temp = EmployeeEnum.hireType.find(
              (e) => e.id === item[headers[value]]
            );
            obj.push(temp ? temp.value : "未知");
          } else if (
            headers[value] === "timeOfEntry" ||
            headers[value] === "correctionTime"
          ) {
            obj.push(formatDate(item[headers[value]]));
          } else {
            obj.push(item[headers[value]]);
          }
        });
      });
      return { tableData: arr, tableHeader: Object.keys(headers) };
    },
    showQrcode(url){
      if(url){
        this.codeDialogShow=true
        this.$nextTick(()=>{
          QrCode.toCanvas(this.$refs.myCanvas,url)
        })
      }
      else{
        this.$message.warning('该用户还未上传头像')
      }
    },
    async role(id){
      const {roleIds} = await getEmployeeBasicInfo(id)
      this.$refs.AssignRole.checkedRoles = roleIds
      this.$refs.AssignRole.dialogVisible=true
      this.$refs.AssignRole.userId= id
    }
  },
};
</script>

<style></style>
