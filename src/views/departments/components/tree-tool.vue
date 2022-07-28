<template>
  <el-row type="flex" justify="space-between" style="width: 100%">
    <el-col :span="5">{{ treeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col :span="12">
          {{ treeNode.manager }}
        </el-col>
        <el-col :span="12">
          <el-dropdown @command="clickHandler">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="addDepart"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item command="delDepart" v-if="!isRoot"
                >删除部门</el-dropdown-item
              >
              <el-dropdown-item command="editDepart" v-if="!isRoot"
                >修改部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script> 
import {delDepartmentApi} from '@/api/departments'
export default {
  name: "TreeTool",
  props: {
    isRoot: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    async clickHandler(val) {
      if (val === "addDepart") {
        this.$emit("addDepart", this.treeNode);
      } else if (val === "delDepart") {
        await this.$confirm('确定要删除该部门吗？')
        await delDepartmentApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit("updateList");
      } else {
        this.$emit("editDepart" ,this.treeNode.id);
      }
    },
  },
};
</script>

<style scoped></style>
