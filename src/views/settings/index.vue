<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row class="addbtn">
              <el-button
                @click="dialogVisible = true"
                type="primary"
                size="small"
                >新增角色</el-button
              >
            </el-row>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="角色名称"> </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button
                    @click="editbtn(scope.row.id)"
                    type="primary"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="delbtn(scope.row.id)"
                    type="danger"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.page"
                :page-sizes="[10, 15, 20, 30]"
                :page-size="query.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyInfo.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyInfo.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog
        :title="formData.id ? '修改角色' : '添加角色'"
        :visible.sync="dialogVisible"
        @close="close"
        width="30%"
      >
        <el-form
          v-if="dialogVisible"
          :model="formData"
          :rules="formRules"
          ref="form"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input
              v-model="formData.description"
              placeholder="请输入角色描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addbtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRolesListApi,
  getRolesInfoApi,
  addRoleApi,
  editRoleInfoApi,
  delRoleApi,
  getCompanyInfoApi,
} from "@/api/setting";
export default {
  name: "Setting",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
      },
      count: 1,
      formData: {
        name: "",
        description: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      companyInfo: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { total, rows } = await getRolesListApi(this.query);
      const res = await getCompanyInfoApi(this.$store.getters.companyId);
      this.tableData = rows;
      this.count = total;
      this.companyInfo = res;
    },
    async addbtn() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      if (this.formData.id) {
        await editRoleInfoApi(this.formData);
        this.$message.success("修改成功");
      } else {
        await addRoleApi(this.formData);
        this.$message.success("添加成功");
      }
      this.dialogVisible = false;
      this.initData();
    },
    async editbtn(id) {
      this.dialogVisible = true;
      const data = await getRolesInfoApi(id);
      this.formData = data;
    },
    async delbtn(id) {
      await this.$confirm("确认删除吗？");
      await delRoleApi(id);
      this.$message.success("删除成功");
      this.initData();
    },
    handleSizeChange(val) {
      this.query.pagesize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.initData();
    },
    close() {
      this.formData = {};
    },
  },
};
</script>

<style>
.addbtn {
  margin-bottom: 10px;
}
.pagination {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
}
</style>
