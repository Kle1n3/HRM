<template>
  <el-dialog title="新增员工" :visible.sync="dialogVisible" width="35%">
    <el-form
      v-if="dialogVisible"
      label-width="120px"
      :model="formData"
      :rules="formRules"
      ref="form"
    >
      <el-form-item prop="username" label="姓名">
        <el-input
          v-model="formData.username"
          style="width: 70%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input
          v-model="formData.mobile"
          style="width: 70%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="formData.timeOfEntry"
          style="width: 70%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select
          style="width: 70%"
          v-model="formData.formOfEmployment"
          placeholder="请选择"
        >
          <el-option
            v-for="item in formOfEmployment"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input
          v-model="formData.workNumber"
          style="width: 70%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-cascader
        style="width: 70%"
          @focus="getDepartmentList"
          v-model="formData.departmentName"
          :options="departmentName"
          :props="{ expandTrigger: 'hover', value: 'name', label: 'name' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="formData.correctionTime"
          style="width: 70%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addbtn">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import EmployeeEnum from "@/api/constant/employees";
import { getDepartmentsListApi } from "@/api/departments";
import {addEmployee} from '@/api/employees'
export default { 
  name: "AddEmployee",
  data() {
    return {
      dialogVisible: false,
      formData: {},
      formRules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "用户姓名为1-8位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
        correctionTime: [
          { required: true, message: "转正时间", trigger: "blur" },
        ],
      },
      formOfEmployment: EmployeeEnum.hireType,
      departmentName: [],
    };
  },

  mounted() {},

  methods: {
    async getDepartmentList() {
      const { depts } = await getDepartmentsListApi();
      this.departmentName = depts;
      const transListToTreeData = (list, pid) => {
        const arr = [];
        list.forEach((item) => {
          if (item.pid === pid) {
            let children = [];
            children = transListToTreeData(list, item.id);
            if (children.length > 0) {
              item.children = children;
            }
            arr.push(item);
          }
        });
        return arr;
      };
      this.departmentName = transListToTreeData(this.departmentName, "");
    },
    async addbtn(){
        try {
            this.$refs.form.validate()
        } catch (error) {
            return console.log(error);
        }
        const cloneFormData = this.formData
        const length = cloneFormData.departmentName.length-1
        cloneFormData.departmentName = cloneFormData.departmentName[length]
        await addEmployee(cloneFormData)
        this.$message.success('添加成功')
        this.$emit('updateList');
        this.dialogVisible=false
    }
  },
};
</script>

<style lang="scss" scoped></style>
