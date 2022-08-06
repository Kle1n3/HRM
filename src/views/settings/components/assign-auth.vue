<template>
  <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%" @close="close">
    <el-tree
      v-if="dialogVisible"
      :data="list"
      show-checkbox
      node-key="id"
      ref="tree"
      :default-checked-keys="checkedList"
      :check-strictly="true"
      :props="{ label: 'name' }"
    >
    </el-tree>
    <span slot="footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitbtn">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermissionListApi } from "@/api/permission";
import {assignAuthApi} from '@/api/setting'
export default {
  name: "AssignAuth",

  data() {
    return {
      dialogVisible: false,
      userid: "",
      list: [],
      checkedList: [],
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      const res = await getPermissionListApi();
      const transToTreeData = (list, rootValue) => {
        const arr = list
          .filter((item) => item.pid === rootValue)
          .map((item) => {
            return { ...item, children: transToTreeData(list, item.id) };
          });
        return arr;
      };
      this.list = transToTreeData(res, "0");
    },
    async submitbtn() {
        const arr = this.$refs.tree.getCheckedKeys()
        await assignAuthApi({
            id:this.userid,
            permIds:arr
        })
        this.$message.success('添加成功')
        this.dialogVisible=false
    },
    close() {
        this.checkedList=[]
    },
  },
};
</script>

<style lang="scss" scoped></style>
