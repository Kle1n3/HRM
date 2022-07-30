<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTool @addDepart='addDepart' :isRoot="true" :treeNode="company"/>
        <br/>
        <el-tree :data="depts" :props="{label:'name'}" >
          <TreeTool @updateList='initData' @addDepart='addDepart' @editDepart='editDepart' slot-scope="{data}" :treeNode="data" />
        </el-tree>
      </el-card>

      <AddDepart @updateList='initData'  ref="addDepart"/>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import AddDepart from './components/add-Depart.vue'
import {getDepartmentsListApi,getDepartmentsInfoApi} from '@/api/departments'
import {transListToTreeData} from '@/utils'
export default {
  name:'Departments',
  components:{
    TreeTool,
    AddDepart,
  },
  data() {
    return {
      company: {
        name:'传智教育',
        manager:'负责人',
        id:''
      },
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      depts:[],
    };
  },
  created () {
    this.initData()
  },
  methods: {
    async initData(){
      const {companyName,depts} = await getDepartmentsListApi()
      this.depts = transListToTreeData(depts,'')
    },
    addDepart(val){
      this.$refs.addDepart.dialogVisible=true
      this.$refs.addDepart.formData.pid = val.id
    },
    async editDepart(id){
      const res= await getDepartmentsInfoApi(id)
      this.$refs.addDepart.formData = res
      this.$refs.addDepart.dialogVisible=true
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>