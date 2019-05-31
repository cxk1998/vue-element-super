<template>
  <div class="role">
    <el-card class="tree-card" style="width: 100%;float: left;height: 100%;" :body-style="{ height: '86%','overflow-y': 'auto'}">
      <div slot="header" class="header">
        <span style="margin-right: 20px;">角色管理</span>
        <ul>
          <li>
            <el-button type="primary" icon="el-icon-plus" size="size" @click="showAddRole">添加</el-button>
          </li>
          <li>
            <el-button type="success" size="size" icon="el-icon-edit" @click="showEditRole">编辑</el-button>
          </li>
          <li>
            <el-button type="danger" size="size" icon="el-icon-close" @click="showDelRole">删除</el-button>
          </li>
          <li>
            <el-button size="size" icon="el-icon-refresh" @click="getRoleList">刷新</el-button>
          </li>
        </ul>
      </div>
      <div style="width: 100%;height: 100%" v-loading="loadingTree">
        <el-tree
          ref="roleTree"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :data="roleTreeData"
          node-key="id"
          :props='defaultProps'>
        </el-tree>
      </div>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="460px">
      <el-form :model="formFields" ref="formFields" :formRules="formRules" label-width="60px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formFields.name" auto-complete="off"></el-input>
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
  import {request} from "@/utils/request"
  import {copy,deerCopy} from "@/utils/common"
  export default {
    name: "role",
    data: function () {
      return {
        loadingTree:true,
        dialogFormTitle: "",
        dialogFormUrl: "",
        dialogFormVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formRules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'},]
        },
        formFieldsAdd: {
          id: 0,
          name: "",
          descript: "",
        },
        formFields:{},
        checkAllBig: [],
        checkAll: [],
        checkOne: [],
        roleTreeData: [],
        menuList: [],
      }
    },
    mounted: function () {
      this.getRoleList();
    },
    methods: {
      async getRoleList() {
        this.loadingTree=true;
        this.formFields.id = null;
        await request.get('/apis/sysmgr/role/getList', {}).then(data => {
          this.roleTreeData = data.roles;
        }).catch(error => {

        });
        this.loadingTree=false;
      },
      //添加
      showAddRole: function () {
        this.formFields =  Object.assign({}, this.formFieldsAdd);
        this.dialogFormTitle = "添加角色";
        this.dialogFormUrl = '/apis/sysmgr/role/add';
        this.dialogFormVisible = true
      },
      //编辑
      showEditRole: function () {
        let selNode = this.$refs.roleTree.getCurrentNode();
        if (selNode == null) {
          return this.$message.error("请选择要编辑的角色！")
        } else {
          this.formFields = Object.assign({},selNode);
          this.dialogFormTitle = "编辑角色";
          this.dialogFormUrl = '/apis/sysmgr/role/update';
          this.dialogFormVisible = true
        }
      },
      //编辑提交
      addOrEditSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await request.post(this.dialogFormUrl, this.formFields).then( data => {
              this.resetForm(formName);
              this.getRoleList();
              this.dialogFormVisible = false;
              this.$message.success("提交成功！")
            }).catch(error => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      showDelRole: function () {
        let selNode = this.$refs.roleTree.getCurrentNode();
        if (selNode == null) {
          return this.$message.error("请选择要删除的节点！")
        } else {
          this.$confirm('确认删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await request.delete('/apis/sysmgr/role/delete', {id: selNode.id}).then(data => {
              this.getRoleList();
              this.$message.success("删除成功！");
            }).catch(error => {

            })
          }).catch(() => {

          });
        }
      },
      //清空表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style>

  .role{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    color: #333;
  }
  .role .box-card{
    width: 100%;
    float: left;
    height: 100%;
  }
  .role .box-card .el-card__body{
    padding: 0;
    height: 90%;
    overflow: auto !important;
  }

</style>
