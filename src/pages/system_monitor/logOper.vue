<template>
  <div class="logOper">
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
        :data="initActionTable.data">
        <el-table-column
          fixed
          show-overflow-tooltip
          prop="LOGIN_NAME"
          label="账号"
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="USER_NAME"
          show-overflow-tooltip
          label="姓名"
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="IP_ADDRESS"
          label="IP地址"
          show-overflow-tooltip
          min-width="120"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="LOGO_FUNC"
          label="方法"
          min-width="370"
          width="auto">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="LOGO_REQ_PARAMS"
          label="请求参数"
          min-width="600"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="TIME_CREATE"
          show-overflow-tooltip
          label="时间"
          width="auto"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="DESCRIPT"
          show-overflow-tooltip
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
        :page-size="initActionTable.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="initActionTable.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {axiosBeg} from '../../utils/axiosBeg'

  export default {
    name: "actionLog",
    data: function () {
      return {
        loading: true,
        pageHeight: document.body.scrollHeight,
        searchName: "",
        initActionTable: [],
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
      this.initActionData();
    },
    methods: {
      refresh: function () {
        this.searchName = "";
        this.queryData.currentPage = 1;
        this.queryData.searchName = "";
        this.queryData.startDate = "2018-03-01";
        this.queryData.endDate = "2019-01-02";
        this.initActionData();
      },
      async initActionData() {
        this.loading = true;
        let result = await axiosBeg.get('/system_monitor/log/getPageListOper', this.queryData);
        if (result.code == 200) {
          this.initActionTable = result.data;
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
        this.initActionData();
      },
      handleClick(row) {
        console.log(row);
      },
      //分页
      pageSizeChange(val) {
        this.queryData.pageSize = val;
        this.initActionData();
      },
      pageCurrentChange(val) {
        this.queryData.currentPage = val;
        this.initActionData();
      },
    }
  }
</script>

<style>
  .logOper {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    color: #333;
  }

</style>
