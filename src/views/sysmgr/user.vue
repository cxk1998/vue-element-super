<template>
  <div class="user">
    <div class="search-bar">
      <el-form :model="queryData" ref="searchForm" :inline="true">
        <el-form-item label="账号">
          <el-input v-model="queryData.user_name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="pageCurrentChange(1)">搜索</el-button>
      </el-form>
    </div>
    <el-card class="table-card">
      <div slot="header" class="header">
        <span>用户管理</span>
        <ul>
          <li @click="showAddUser">
            <i class="el-icon-plus"></i> 添加
          </li>
          <li @click="pageCurrentChange(1)">
            <i class="el-icon-refresh"></i> 刷新
          </li>
        </ul>
      </div>
      <div v-loading="loadingTable">
        <el-table
          tooltip-effect="dark"
          class="table-style"
          :height="this.pageHeight-230"
          border stripe
          :data="logLoginTableData.rows">
          <el-table-column
            show-overflow-tooltip
            prop="user_name"
            label="账号"
            min-width="120"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="user_name"
            label="账号"
            min-width="120"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="时间"
            prop="created"
            min-width="180"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="descript"
            label="描述"
            width="auto"
            min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button @click="showEditUser(scope.row)" type="primary" icon="el-icon-edit-outline" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :pager-count="5"
          :small="true"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :current-page="queryData.current_page"
          :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
          :page-size="logLoginTableData.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="logLoginTableData.count">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="460px">
      <el-form :model="formFields" ref="formFields" :formRules="formRules" label-width="60px">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="formFields.user_name" :disabled="isEdit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descript">
          <el-input v-model="formFields.descript" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSubmit('formFields')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import request from "@/utils/request"

  export default {
    name: "user",
    data: function () {
      return {
        loadingTable: true,
        dialogFormTitle: "",
        dialogFormUrl: "",
        isEdit:false,
        dialogFormVisible: false,
        pageHeight: document.body.scrollHeight,
        logLoginTableData: [],
        queryData: {
          current_page: 1,
          page_size: 10,
          user_name: "",
        },
        formRules: {
          user_name: [{required: true, message: '请输入用户名', trigger: 'blur'},]
        },
        formFieldsAdd: {
          id: 0,
          user_name: "",
          descript: "",
        },
        formFields:{},
      }
    },
    mounted: function () {
      this.getPageList();
    },
    methods: {
      async getPageList() {
        this.loadingTable = true;
        await request.get('/apis/sysmgr/user/getPageList', this.queryData).then(data => {
          this.logLoginTableData = data.data;
        }).catch(error => {
          this.logLoginTableData = [];
        }).finally(() => {
          this.loadingTable = false;
        });
      },
      //添加
      showAddUser: function () {
        this.formFields = Object.assign(this.formFieldsAdd,{});
        this.dialogFormTitle = "添加用户";
        this.dialogFormUrl = '/apis/sysmgr/user/add';
        this.dialogFormVisible = true
      },
      //编辑
      showEditUser: function (row) {
        this.formFields = row;
        if (this.formFields.id == null) {
          return this.$message.error("请选择要编辑的用户！")
        } else {
          this.dialogFormTitle = "编辑用户";
          this.dialogFormUrl = '/apis/sysmgr/user/update';
          this.dialogFormVisible = true;
          this.isEdit = true;
        }
      },
      //编辑提交
      addOrEditSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await request.post(this.dialogFormUrl, this.formFields).then(data => {
              this.pageCurrentChange(1);
              this.dialogFormVisible = false;
              this.$message.success("操作成功！")
            }).catch(error => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      delUser: function (row) {
        this.formFields = row;
        if (this.formFields == null) {
          return this.$message.error("请选择要删除的用户！")
        } else {
          this.$confirm('确认删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            console.info(this.formFields)
            await request.delete('/apis/sysmgr/user/delete', {id: this.formFields.id}).then(data => {
              this.pageCurrentChange(1);
              this.$message.success("操作成功！")
            }).catch(error => {

            });
          }).catch(() => {

          });
        }
      },
      //分页
      pageSizeChange(val) {
        this.queryData.page_size = val;
        this.getPageList();
      },
      pageCurrentChange(val) {
        this.queryData.current_page = val;
        this.getPageList();
      },
    },
  }
</script>

<style>
  .user {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    color: #333;
  }
</style>
