<template>
  <el-dialog @close="clearForm" :title="this.formData.id? '修改部门':'添加部门'" :visible.sync="dialogVisible">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="120px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input style="width: 80%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width: 80%" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门管理者" prop="manager">
        <el-select @focus="getManagerList" v-model="formData.manager" placeholder="请选择部门管理者">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          rows="4"
          style="width: 80%"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartmentsListApi,addDepartmentApi,editDepartmentInfoApi } from "@/api/departments";
import {getEmployeeSimpleListApi} from '@/api/employees'
export default {
  name: "AddDepart",

  data() {
    const checkRepeatName = async (rule, value, cb) => {
      const { depts } = await getDepartmentsListApi();
      console.log(depts);
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name === value);
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.formData.pid)
          .some((item) => item.name === value);
      }
      isRepeat ? cb(new Error(`同级部门下已经有${value}的部门了`)) : cb();
    };
    const checkRepeatCode = async (rule, value, cb) => {
      const { depts } = await getDepartmentsListApi();
      console.log(depts);
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.code === value);
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.formData.pid)
          .some((item) => item.code === value);
      }
      isRepeat ? cb(new Error(`组织架构中已经有部门使用${value}编码`)) : cb();
    };
    return {
      dialogVisible: false,
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { validator: checkRepeatName, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { validator: checkRepeatCode, trigger: "blur" },
        ],
        manager: [
          { required: true, message: "请输入部门管理者", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
        ],
      },
      managerList:[],
    };
  },

  mounted() {},

  methods: {
    async getManagerList(){
      this.managerList = await getEmployeeSimpleListApi()
    },
    async submit(){
      try {
        await this.$refs.form.validate()
      } catch (error) {
        return console.log(error);
      }
      if(!this.formData.id){
        await addDepartmentApi(this.formData)
        this.$message.success('添加成功')
      }
      else{
        await editDepartmentInfoApi(this.formData)
        this.$message.success('修改成功')
      }
      this.dialogVisible=false
      this.$emit('updateList')
    },
    clearForm(){
      this.formData={
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: "",
      }
    },
  },
};
</script>

<style>
.el-dialog__header {
  background-color: #66b1ff;
}
.el-dialog__title {
  color: #fff;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
