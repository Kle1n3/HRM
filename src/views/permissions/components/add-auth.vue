<template>
    <div>
        <el-dialog :title="`${showText}权限点`" width="40%" :visible.sync="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form v-if="showDialog" ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="showDialog=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'AddAuth',

    data() {
        return {
            showDialog:false,
            formData:{
                enVisible:'1',
                type:'',
                pid:'',
            },
            rules:{
                name:[{required:true,message:'请输入',trigger:'blur'}],
                code:[{required:true,message:'请输入',trigger:'blur'}],
            }
        };
    },
    computed: {
        showText(){
            if(this.formData.id){
                return '编辑'
            }else{
                return '添加'
            }
        }
    },
    mounted() {
        
    },

    methods: {
        btnCancel(){
            this.formData={}
        }
    },
};
</script>

<style lang="scss" scoped>

</style>