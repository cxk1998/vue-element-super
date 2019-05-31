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
            prop="user_name"
            label="账号"
            min-width="120"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="real_name"
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
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="formFields.user_name" auto-complete="off"></el-input>
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
  import {getPageUser} from "../../apis/user"

  export default {
    name: "user",
    data: function () {
      return {
        loadingTable: true,
        dialogFormTitle: "",
        dialogFormVisible: false,
        pageHeight: document.body.scrollHeight,
        logLoginTableData: [],
        queryData: {
          current_page: 1,
          page_size: 20,
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
      this.getPageUser();
    },
    methods: {
      async getPageUser() {
        this.loadingTable = true;
        this.logLoginTableData = await getPageUser(this.queryData);
        this.loadingTable = false;
      },
      //分页
      pageSizeChange(val) {
        this.queryData.page_size = val;
        this.getPageUser();
      },
      pageCurrentChange(val) {
        this.queryData.current_page = val;
        this.getPageUser();
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
