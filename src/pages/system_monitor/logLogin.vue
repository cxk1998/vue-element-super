<template>
  <div class="logLogin">
    <div class="search-bar">
      <el-form ref="searchForm" :inline="true">
        <el-form-item label="账号">
          <el-input v-model="searchName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="actionSearch">搜索</el-button>
      </el-form>
    </div>
    <div class="table">
      <div class="table-toolbar">
        <ul>
          <li @click="refresh">
            <i class="el-icon-refresh"></i>刷新
          </li>
        </ul>
      </div>
      <el-table
        v-loading="loading"
        tooltip-effect="dark"
        class="table-style"
        :max-height="this.pageHeight-200"
        border
        :data="initLogTable.data">
        <el-table-column
          show-overflow-tooltip
          fixed
          prop="LOGIN_NAME"
          label="账号"
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="USER_NAME"
          label="姓名"
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="IP_ADDRESS"
          label="IP地址"
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="TIME_CREATE"
          label="时间"
          min-width="160"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="DESCRIPT"
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
        :current-page="queryData.currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
        :page-size="initLogTable.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="initLogTable.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {axiosBeg} from '../../utils/axiosBeg'

  export default {
    name: "loginLog",
    data: function () {
      return {
        loading: true,
        pageHeight: document.body.scrollHeight,
        searchName: "",
        initLogTable: [],
        searchDate: [],
        queryData: {
          currentPage: 1,
          pageSize: 20,
          searchName: "",
          startDate: "2018-03-01",
          endDate: "2019-01-02",
        }
      }
    },
    mounted: function () {
      this.initLoginData();
    },
    methods: {
      refresh: function () {
        this.searchName = "";
        this.queryData.currentPage = 1;
        this.queryData.searchName = "";
        this.queryData.startDate = "2018-03-01";
        this.queryData.endDate = "2019-01-02";
        this.initLoginData();
      },
      async initLoginData() {
        this.loading = true;
        let result = await axiosBeg.get('/system_monitor/log/getPageListLogin', this.queryData);
        if (result.code == 200) {
          this.initLogTable = result.data;
          this.loading = false;
        }
      },
      //搜索
      actionSearch: function () {
        if (this.searchDate && this.searchDate.length > 0) {
          let needSart = new Date(Date.parse(this.searchDate[0]));
          let needEnd = new Date(Date.parse(this.searchDate[1]))
          this.queryData.startDate = needSart.getFullYear() + "-" + (needSart.getMonth() + 1) + "-" + needSart.getDate();
          this.queryData.endDate = needEnd.getFullYear() + "-" + (needEnd.getMonth() + 1 + "-" + needEnd.getDate());
        }
        this.queryData.searchName = this.searchName;
        this.initLoginData();
      },
      //分页
      pageSizeChange(val) {
        this.queryData.pageSize = val;
        this.initLoginData();
      },
      pageCurrentChange(val) {
        this.queryData.currentPage = val;
        this.initLoginData();
      },
    },
  }
</script>

<style>
  .logLogin {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    color: #333;
  }
</style>
