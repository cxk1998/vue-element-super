<template>
  <div class="user">
    <div class="search-bar">
      <el-form :model="queryData" ref="searchForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="queryData.user_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="pageCurrentChange(1)">搜索</el-button>
      </el-form>
    </div>
    <el-card class="table-card">
      <div slot="header" class="header">
        <span>测试数据管理 - 逻辑已写好，有需要请自行实现</span>
        <ul>
          <li @click="showAddTest">
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
          :data="logLoginTableData.data">
          <el-table-column
            show-overflow-tooltip
            prop="id"
            label="ID"
            min-width="120"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="test_name"
            label="名称"
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
              <el-button @click="showEditTest(scope.row)" type="primary" icon="el-icon-edit-outline" size="small">编辑</el-button>
              <el-button @click="showDelTest(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
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
          :total="logLoginTableData.total_row">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="460px">
      <el-form :model="formFields" ref="formFields" :formRules="formRules" label-width="60px">
        <el-form-item label="名称" prop="test_name">
          <el-input v-model="formFields.test_name" :disabled="isEdit" auto-complete="off"></el-input>
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
  import {getPageTest,addTest,editTest,delTest} from "../../apis/test"

  export default {
    name: "test",
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
          page_size: 20,
          test_name: "",
        },
        formRules: {
          test_name: [{required: true, message: '请输入名称', trigger: 'blur'},]
        },
        formFieldsAdd: {
          id: 0,
          test_name: "",
          descript: "",
        },
        formFields:{},
      }
    },
    mounted: function () {
      this.getPageTest();
    },
    methods: {
      async getPageTest() {
        this.loadingTable = true;
        this.logLoginTableData = await getPageTest(this.queryData);
        this.loadingTable = false;
      },
      //添加
      showAddTest: function () {
        this.formFields = Object.assign(this.formFieldsAdd,{});
        this.dialogFormTitle = "添加数据";
        this.isEdit = false;
        this.dialogFormUrl = 'add';
        this.dialogFormVisible = true;
      },
      //编辑
      showEditTest: function (row) {
        this.formFields = row;
        if (this.formFields.id == null) {
          return this.$message.error("请选择要编辑的数据！")
        } else {
          this.dialogFormTitle = "编辑数据";
          this.dialogFormUrl = 'edit';
          this.dialogFormVisible = true;
          this.isEdit = true;
        }
      },
      //编辑提交
      addOrEditSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if(this.dialogFormUrl === "add"){
              await addTest();
            }else{
              await editTest();
            }
            this.pageCurrentChange(1);
            this.dialogFormVisible = false;
            this.$message.success("操作成功！")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      showDelTest: function (row) {
        this.formFields = row;
        if (this.formFields == null) {
          return this.$message.error("请选择要删除的数据！")
        } else {
          this.$confirm('确认删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await this.delTest();
          }).catch(() => {

          });
        }
      },
      async delTest(){
        await request.delete('/apis/sysmgr/user/delete', {id: this.formFields.id});
        this.pageCurrentChange(1);
        this.$message.success("操作成功！")
      },
      //分页
      pageSizeChange(val) {
        this.queryData.page_size = val;
        this.getPageTest();
      },
      pageCurrentChange(val) {
        this.queryData.current_page = val;
        this.getPageTest();
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
