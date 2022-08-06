<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style="margin-bottom:10px">
          <el-row type="flex" justify="end"><el-button type="primary" size="small" @click="addbtn('0',1)" >添加权限</el-button></el-row>
      </el-card>
      <!-- 表格 -->
      <el-table row-key="id" :data="list" border>
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="addbtn(row.id,2)" >添加</el-button>
            <el-button type="text" @click="edit(row.id)" >编辑</el-button>
            <el-button type="text" @click="del(row.id)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-auth ref="addAuth" @updateList = initData />
    </div>
  </div>
</template>

<script>
import {getPermissionListApi, getPermissionInfoApi,delDepartmentApi} from '@/api/permission'
import addAuth from './components/add-auth.vue';
export default {
  components: { addAuth },
  name:'Permission',
  data() {
    return {
      list: [],
    };
  },
  created () {
    this.initData()
  },
  methods: {
    async initData(){
      const data = await getPermissionListApi()
      const transToTreeData = (list,rootValur)=>{
        const arr = list.filter(item=>item.pid===rootValur).map(item=>{
          return {...item,children:transToTreeData(list,item.id)}
        })
        return arr
      }
      this.list = transToTreeData(data,'0')
    },
    addbtn(pid,type){
      console.log(pid);
      this.$refs.addAuth.formData.pid = pid
      this.$refs.addAuth.formData.type = type
      this.$refs.addAuth.showDialog=true
    },
    async edit(id){
      this.$refs.addAuth.formData = await getPermissionInfoApi(id)
      this.$refs.addAuth.showDialog = true
    },
    async del(id){
      await this.$confirm('确定删除吗？')
      await delDepartmentApi(id)
      this.$message.success('删除成功')
      this.initData()
    }
  }
}
</script>

<style>

</style>