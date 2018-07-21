<template>
  <div class="userMgr">
    <div class="dptTree">
      <div class="dptTree-title">部门科室树</div>
      <el-tree
        ref="dptTree"
        :data="dptTree"
        node-key="Fid"
        :props='defaultDptProps'
        @node-click="clickTree"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true">
      </el-tree>
    </div>
    <div class="container">
      <div class="search-bar">
        <el-form :model="queryData" ref="searchForm" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="queryData.searchName" placeholder="请输入搜索内容"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="initTbData">搜索</el-button>
        </el-form>
      </div>
      <div class="table">
        <div class="table-toolbar">
          <ul>
            <li id="/system_mgr/user/add" style="display: none;" @click="add">
              <i class="el-icon-plus"></i>增加
            </li>
            <li id="/system_mgr/user/update" style="display: none;" @click="edit">
              <i class="el-icon-edit-outline"></i>修改
            </li>
            <li id="/system_mgr/user/resetMyPwd" style="display: none;" @click="userMgResetPw">
              <i class="el-icon-setting"></i>重置密码
            </li>
            <li id="/system_mgr/user/delete" style="display: none;" @click="del">
              <i class="el-icon-minus"></i>删除
            </li>
            <li @click="initTbData">
              <i class="el-icon-refresh"></i>刷新
            </li>
          </ul>
        </div>
        <el-table
          v-loading="loading"
          tooltip-effect="dark"
          class="table-style"
          ref="singleTable"
          @row-click="sleTableRow"
          highlight-current-row
          :max-height="this.pageHeight-200"
          border
          :data="initTbDataData.data">
          <el-table-column
            show-overflow-tooltip
            prop="LOGIN_NAME"
            label="账号"
            min-width="80"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="USER_NAME"
            label="姓名"
            min-width="80"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="USER_SEX"
            label="性别"
            :formatter="sexFormatter"
            min-width="60"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="DPT_NAME"
            label="部门"
            min-width="80"
            width="auto">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="USER_POSITION"
            label="职位"
            width="auto"
            min-width="80">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="PHONE"
            label="联系电话"
            width="auto"
            min-width="100">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="TIME_MODIFY"
            label="时间"
            width="auto"
            min-width="130">
          </el-table-column>
        </el-table>
        <el-pagination
          ref="pagination"
          background
          :pager-count="5"
          :small="true"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :current-page="queryData.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
          :page-size="queryData.pageSize"
          layout="total ,sizes, prev, pager, next, jumper"
          :total="initTbDataData.total">
        </el-pagination>
      </div>
    </div>
    <div class="roleTree">
      <div class="roleTree-content">
        <div class="roleTree-title">角色树</div>
        <el-tree
          ref="roleTree"
          :data="roleTreeData"
          default-expand-all
          node-key="ROLE_KEY"
          :props='defaultRoleProps'
          :expand-on-click-node="false"
          show-checkbox>
        </el-tree>
        <div class="roleTree-submit">
          <el-button type="primary" size="size" icon="el-icon-success" @click="saveRoles">保存</el-button>
        </div>
      </div>
    </div>
    <div class="userGroupTree">
      <div class="userGroupTree-content">
        <div class="userGroupTree-title">用户组树</div>
        <el-tree
          ref="userGroupTree"
          :data="roleTreeData"
          default-expand-all
          node-key="ROLE_KEY"
          :props='defaultRoleProps'
          :expand-on-click-node="false"
          show-checkbox>
        </el-tree>
        <div class="userGroupTree-submit">
          <el-button type="primary" size="size" icon="el-icon-success" @click="saveRoles">保存</el-button>
        </div>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="formFields" ref="formFields" :rules="formRules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="USER_NAME">
          <el-input v-model="formFields.USER_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="LOGIN_NAME">
          <el-input v-model="formFields.LOGIN_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="USER_SEX">
          <el-radio-group v-model="formFields.USER_SEX">
            <el-radio :label=0>男</el-radio>
            <el-radio :label=1>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="DPT_NAME">
          <el-select v-model="formFields.DPT_KEY" placeholder="请选择" @change="monitorOption">
            <el-option
              v-for="item in userMgDp"
              :key="item.DPT_KEY"
              :label="item.DPT_NAME"
              :value="item.DPT_KEY">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="USER_POSITION">
          <el-input v-model="formFields.USER_POSITION" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="formFields.PHONE" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSubmit('formFields')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {axiosBeg} from '../../utils/axiosBeg'
  import {getTree} from "../../utils/treeUtil"
  export default {
    name: "userMgr",
    data: function () {
      return {
        dialogFormTitle:"",
        dialogFormUrl:"",
        dialogFormVisible:false,
        defaultDptProps: {
          children: 'children',
          label: 'DPT_NAME'
        },
        defaultRoleProps:  {
          children: 'children',
          label: 'ROLE_NAME'
        },
        userRoleIds: [],
        loading: true,
        queryData: {
          currentPage: 1,
          pageSize: 20,
          searchDptKey: "",
          searchName: "",
        },
        formRules: {
          USER_NAME: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          LOGIN_NAME: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          DPT_KEY: [
            {required: true, message: '请输入名称', trigger: 'change'},
          ],
          USER_POSITION: [
            {required: true, message: '请输入职位', trigger: 'blur'},
          ],
        },
        formFields: {
          USER_KEY: 0,
          USER_NAME: "",
          LOGIN_NAME: "",
          USER_POSITION: "",
          USER_SEX: 0,
          DPT_KEY: "",
          DPT_NAME: "",
          PHONE: "",
        },
        formFieldsAdd:{},
        userMgDp: [],
        dptTree: [],
        roleTreeData: [],
        pageHeight: document.body.scrollHeight,
        /* 表格 */
        initTbDataData: [],
        formLabelWidth: '80px'
      }
    },
    mounted: function () {
      this.initPage();
    },
    methods: {
      initPage:function(){
        this.formFieldsAdd=Object.assign({}, this.formFields);
        this.changeData();
        this.initTbData();
        this.getDptData();
        this.getRoleData();
      },
      //获取部门树数据
      async getDptData() {
        let result = await axiosBeg.get('/system_mgr/dpt/getList', {});
        if (result.code == 200) {
          if (result.data.length > 0) {
            this.userMgDp = result.data;
            this.dptTree = getTree(result.data, {idKey: "DPT_KEY", pidKey: "DPT_PKEY", rootPid: "0"});
          }
        }
      },
      async initTbData() {
        this.loading = true;
        let data = {
          currentPage: this.queryData.currentPage,
          pageSize: this.queryData.pageSize,
          searchDptKey: this.queryData.searchDptKey,
          searchName: this.queryData.searchName,
        }
        let reuslt = await axiosBeg.get('/system_mgr/user/getPageList', data);
        if (reuslt.code == 200) {
          this.initTbDataData = reuslt.data;
          this.loading = false;
          for (let item of this.initTbDataData.data) {
            if (item.Fsex == 0) {
              item.Fsex = "男";
            } else {
              item.Fsex = "女";
            }
          }
        }
      },
      //保存或修改角色
      async saveRoles() {
        if (this.formFields.USER_KEY === null) {
          return this.$message.error("请选择用户！")
        } else {
          //获取勾选的节点
          let selTree = this.$refs.roleTree.getCheckedNodes();
          let selNodeIds = [];
          for (let item of selTree) {
            selNodeIds.push(item.ROLE_KEY)
          }
          let data = {
            USER_KEY: this.formFields.USER_KEY,
            ROLE_KEYS: selNodeIds
          }
          let result = await axiosBeg.get('/system_mgr/user/updUserRole', data);
          if (result.code == 200) {
            this.formFields.USER_KEY = null;
            this.$message.success("操作成功！");
          }
        }
      },
      //获取用户角色
      async getUserRoles() {
        if (this.formFields.USER_KEY === null) {
          return this.$message.error("请选择用户！")
        } else {
          let data = {USER_KEY: this.formFields.USER_KEY}
          let result = await axiosBeg.get('/system_mgr/user/getRoleListByUserKey', data);
          if (result.code == 200) {
            let list_data=result.data;
            let roleKeys=[];
            //设置用户拥有的角色并勾选对应的节点
            list_data.forEach((Ritem,Rindex) => {
              roleKeys.push(Ritem.ROLE_KEY);
            });
            this.$refs.roleTree.setCheckedKeys(roleKeys)
          }
        }
      },
      //初始化部门树数据  角色
      async getRoleData() {
        let result = await axiosBeg.get('/system_mgr/role/getList', {});
        if (result.code == 200) {
          this.roleTreeData = result.data;
        }
      },
      //选中表格行
      sleTableRow: function (row) {
        this.formFields = row;
        this.getUserRoles();
      },
      //监听select
      monitorOption: function (val) {
        this.formFieldsAdd.FdptId = val;
      },
      //点击部门
      clickTree(node) {
        this.queryData.searchDptKey = node.DPT_KEY;
        this.initTbData();
      },
      //获取table的选中行
      getSelectTableRow:function(){
        return this.$refs.singleTable.store.states.currentRow;
      },
      //添加
      add: function(){
        this.formFields=Object.assign({}, this.formFieldsAdd);
        this.dialogFormTitle="添加用户";
        this.dialogFormVisible = true
        this.dialogFormUrl='/system_mgr/user/add';
      },
      //修改
      edit: function(){
        this.formFields = Object.assign({}, this.getSelectTableRow());
        if(this.formFields.USER_KEY == null){
          return this.$message.error("请选择要编辑的用户！")
        }else {
          this.dialogFormTitle="修改用户";
          this.dialogFormVisible = true;
          this.dialogFormUrl='/system_mgr/user/update';
        }
      },
      //修改提交
      addOrEditSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await axiosBeg.post(this.dialogFormUrl, this.formFields);
            if (result.code == 200) {
              this.initTbData();
              this.dialogFormVisible = false;
              this.$message.success("提交成功！")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //管理员删除用户
      del() {
        if (this.formFields.USER_KEY === null) {
          return this.$message.error("请选择要删除的用户！")
        } else {
          this.$confirm('确认删除该用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = {USER_KEY: this.formFields.USER_KEY}
            let result = await axiosBeg.delete('/system_mgr/user/delete', data);
            if (result.code == 200) {
              this.initTbData();
              this.$message.success("操作成功！");
            }
          }).catch(() => {

          });
        }
      },
      //管理员重置用户密码
      userMgResetPw() {
        if (this.formFields.USER_KEY === null) {
          return this.$message.error("请选择用户！")
        } else {
          this.$confirm('是否要重置该用户密码为“123456”?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = {USER_KEY: this.formFields.USER_KEY}
            let result = await axiosBeg.get('/system_mgr/user/resetPwdByUserKey', data);
            if (result.code == 200) {
              this.initTbData();
              this.$message.success("操作成功！");
            }
          }).catch(() => {

          });
        }
      },
      //分页
      pageSizeChange(val) {
        this.queryData.pageSize = val;
        this.initTbData();
      },
      pageCurrentChange(val) {
        this.queryData.currentPage = val;
        this.initTbData();
      },
    }
  }
</script>

<style>
  .userMgr {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: hidden;
  }

  /* 部门树 */
  .userMgr .dptTree {
    flex: 2;
    height: 100%;
    min-width: 160px;
    max-width: 160px;
    border-right: 1px solid rgb(230, 230, 230);
  }

  .userMgr .dptTree .dptTree-title {
    width: 100%;
    padding: 10px;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

  .userMgr .container {
    flex: 8;
    width: auto;
    margin-left: 10px;
  }

  /* roleTree */
  .userMgr .roleTree {
    flex: 2;
    width: 150px;
    height: calc(100% - 70px);
    margin-top: 60px;
    margin-left: 10px;
  }

  .userMgr .roleTree-content {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid rgb(230, 230, 230);
  }

  .userMgr .roleTree-title {
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

  .userMgr .roleTree-submit {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  /* userGroupTree */
  .userMgr .userGroupTree {
    flex: 2;
    width: 150px;
    height: calc(100% - 70px);
    margin-top: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .userMgr .userGroupTree-content {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid rgb(230, 230, 230);
  }

  .userMgr .userGroupTree-title {
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

  .userMgr .userGroupTree-submit {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
