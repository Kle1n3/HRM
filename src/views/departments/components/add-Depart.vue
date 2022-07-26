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
export default {
    name: 'AddDepart',

    data() {
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
                name:[{required:true,message:'请输入部门名称',trigger:'blur'}],
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