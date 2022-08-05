<template>
    <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="30%"
        @close="close">
        <el-checkbox-group v-if="dialogVisible" v-model="checkedRoles">
            <el-checkbox v-for="item in allRoles" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submitbtn">OK</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import {getRolesListApi} from '@/api/setting'
import { assignRolesApi } from "@/api/employees";
export default {
    name: 'AssignRole',

    data() {
        return {
            dialogVisible:false,
            allRoles:[],
            checkedRoles:[],
            userId:'',
        };
    },

    created() {
        this.initData()
    },

    methods: {
        async initData(){
            const {rows} = await getRolesListApi({
                page:1,
                pagesize:1000,
            })
            this.allRoles =rows
        },
        async submitbtn(){
            if(this.checkedRoles.length===0) return this.$message.warning('请勾选角色')
            await assignRolesApi({
                id:this.userId,
                roleIds:this.checkedRoles,
            })
            this.$message.success('添加成功')
            this.dialogVisible=false
        },
        close(){
            this.checkedRoles=[]
        },
    },
};
</script>

<style lang="scss" scoped>

</style>