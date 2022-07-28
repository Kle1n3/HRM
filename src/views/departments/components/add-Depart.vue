<template>
    <el-dialog title="添加部门" :visible.sync="dialogVisible">
        <el-form :model="formData" :rules="formRules" ref="form" label-width="120px">
          <el-form-item label="部门名称" prop="name">
            <el-input style="width:80%"  v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input style="width:80%" v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item label="部门管理者" prop="manager">
            <el-input style="width:80%" v-model="formData.manager"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍" prop="introduce">
            <el-input type="textarea" rows="4" style="width:80%" v-model="formData.introduce"></el-input>
          </el-form-item>
          <el-row type="flex" justify="center" >
            <el-button >取消</el-button>
            <el-button type="primary">确定</el-button>
          </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import {getDepartmentsListApi} from '@/api/departments'
export default {
    name: 'AddDepart',

    data() {
      const checkRepeatName = async (value,rule,cb)=>{
        const {depts} = await getDepartmentsListApi()
        let isRepeat = false
        if(this.formData.id){
          isRepeat = depts.filter(item=>item.pid===this.formData.pid && item.id!==this.formData.id).some(item.name===value)
        } 
        else{
          isRepeat = depts.filter(item=>item.pid===this.formData.pid).some(item.name===value)      
        }
        return isRepeat? cb(new Error(`同级部门下已经有${value}的部门了`)):cb()
      }
        return {
            dialogVisible:false,
            formData:{
                name:'',
                code:'',
                manager:'',
                introduce:'',
                pid:'',
            },
            formRules:{
                name:[{required:true,message:'请输入部门名称',trigger:'blur'},
                {validator:checkRepeatName,trigger:'blur',}
                ],
                code:[{required:true,message:'请输入部门编码',trigger:'blur'}],
                manager:[{required:true,message:'请输入部门管理者',trigger:'blur'}],
                introduce:[{required:true,message:'请输入部门介绍',trigger:'blur'}],
            }
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style >
 .el-dialog__header{
    background-color: #66b1ff;
    
}
.el-dialog__title{
color: #fff;
}
.el-dialog__headerbtn .el-dialog__close{
    color: #fff;
}
</style>