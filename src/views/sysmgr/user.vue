<template>
  <div class="user">
    <div class="search-bar">
      <el-form :model="queryData" ref="searchForm" :inline="true">
        <el-form-item label="账号">
          <el-input v-model="queryData.real_name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchData"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getPageList">搜索</el-button>
      </el-form>
    </div>
    <el-card class="table-card">
      <div slot="header" class="header">
        <span>登录日志</span>
        <ul>
          <li @click="getPageList">
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
  </div>
</template>
<script>
  import request from "@/utils/request"
  import common from "@/utils/common"
  export default {
    name: "user",
    data: function () {
      return {
        loadingTable: true,
        pageHeight: document.body.scrollHeight,
        logLoginTableData: [],
        searchData: [new Date().formatMinusDay("yyyy-MM-dd HH:mm:ss",-7), new Date().format("yyyy-MM-dd HH:mm:ss")],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const start = new Date().formatMinusDay("yyyy-MM-dd HH:mm:ss",-7);
              const end = new Date().format("yyyy-MM-dd HH:mm:ss");
              picker.$emit('pick', [start,end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date().formatMinusMonth("yyyy-MM-dd HH:mm:ss",-1);
              const end = new Date().format("yyyy-MM-dd HH:mm:ss");
              picker.$emit('pick', [start,end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date().formatMinusMonth("yyyy-MM-dd HH:mm:ss",-3);
              const end = new Date().format("yyyy-MM-dd HH:mm:ss");
              picker.$emit('pick', [start,end]);
            }
          }]
        },
        queryData: {
          current_page: 1,
          page_size: 20,
          user_name: "",
          start_date: "",
          end_date: "",
        }
      }
    },
    mounted: function () {
      this.getPageList();
    },
    methods: {
      async getPageList() {
        this.loadingTable = true;
        this.queryData.start_date = this.searchData[0];
        this.queryData.end_date = this.searchData[1];
        await request.get('/apis/sysmgr/user/getPageList', this.queryData).then(data => {
          this.logLoginTableData = data.data;
        }).catch(error => {
          this.logLoginTableData = [];
        });
        this.loadingTable = false;
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
