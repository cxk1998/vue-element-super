<template>
  <el-container class="index">
    <el-header style="height: 50px;">Head22222er</el-header>
    <el-container class="el-container-center">
      <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden;background-color: #1f2d3d;height: 100%;">
        <el-aside style="width: 200px;">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-scrollbar>
      <el-main>
        <div style="height: 1000px;">
          1111111111
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import request from "../utils/request"
  export default {
    name: "index",
    data() {
      return {
        userMenu: null,
      }
    },
    mounted: function () {
      this.getUserMenu()
    },
    methods: {
      async getUserMenu () {
        await request.login('/apis/menu/getUserMenu').then(data => {
          this.userMenu = data;
          console.info(data)
        }).catch(error => {

        });
      },
    }
  }
</script>

<style>
  .index{
    height: 100%;
  }
  .index .el-header{
    background-color: #373d41;
    color: #333;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .index .el-container-center{
    height: calc(100% - 50px);
  }
  .index .el-container-center .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .index .el-container-center .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .index .el-container-center .el-aside .el-menu{
    border: none;
  }

  /* 菜单样式 */
  .index .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    min-height: 100%;
    width: 200px;
    float: left;
    overflow: auto !important;
    box-sizing: border-box;
    background-color: #1f2d3d !important;
  }
  .index .el-menu--collapse{
    height: 100%;
    background-color: #1f2d3d !important;
    float: left;
  }
  .index .el-submenu__title {
    background-color: rgb(48, 65, 86) !important;
  }

  .index .el-submenu__title:hover {
    background: rgb(38, 52, 69) !important;
  }

  .index .el-menu-item {
    background-color: rgb(48, 65, 86) !important;
    padding-left: 20px;
  }

  .index .el-menu-item:hover {
    background: rgb(38, 52, 69) !important;
  }

  .index .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
    padding-left: 20px;
  }

  .index .el-submenu .el-menu-item:hover {
    background-color: #001528 !important;
  }

  .index .el-container-center .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }

</style>
