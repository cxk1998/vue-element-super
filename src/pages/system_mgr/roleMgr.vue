<template>
  <div class="roleSysMge">
    <div class="log-main">
      <div class="table-content clearfix">
        <div class="roleTree set-left">
          <div class="roleTree-content">
            <div class="roleTree-title">
              <span style="margin-right: 20px;">角色管理</span>
              <el-button icon="el-icon-plus" size="size" @click="add">添加</el-button>
            </div>
            <el-tree
              ref="roleTree"
              v-loading="loadingRole"
              default-expand-all
              @node-contextmenu="showMenu"
              @node-click="selRoleTree"
              :expand-on-click-node="false"
              :data="roleTreeData"
              node-key="ROLE_KEY"
              :props='defaultRoleProps'>
            </el-tree>
            <vue-context-menu :contextMenuData="contextMenuData"
                              @savedata="edit"
                              @newdata="del">
            </vue-context-menu>
          </div>
        </div>
        <div class="menuTree set-right">
          <div class="roleTree-content">
            <div class="roleTree-title"><span style="height: 32px;line-height: 32px;">菜单预览</span></div>
            <el-tree
              show-checkbox
              ref="menuTree"
              v-loading="loadingMenu"
              default-expand-all
              :check-strictly="true"
              :expand-on-click-node="false"
              :data="menuTreeData"
              :render-content="renderMenuContent"
              node-key="MENU_KEY"
              :props='defaultMenuProps'>
            </el-tree>
            <div class="roleSysMge-submit">
              <el-button type="primary" size="size" icon="el-icon-success" @click="saveMenuConfig">保存</el-button>
            </div>
          </div>
        </div>
        <div class="operTree set-right">
          <div class="roleTree-content">
            <div class="roleTree-title"><span style="height: 32px;line-height: 32px;">操作预览</span></div>
            <el-tree
              show-checkbox
              ref="operTree"
              v-loading="loadingOper"
              default-expand-all
              :check-strictly="true"
              :expand-on-click-node="false"
              :data="operTreeData"
              :render-content="renderContentOper"
              node-key="OPER_KEY"
              :props='defaultOperProps'>
            </el-tree>
            <div class="roleSysMge-submit">
              <el-button type="primary" size="size" icon="el-icon-success" @click="saveOperConfig">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="formFields" ref="formFields" :formRules="formRules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="ROLE_NAME">
          <el-input v-model="formFields.ROLE_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="DESCRIPT">
          <el-input v-model="formFields.DESCRIPT" auto-complete="off"></el-input>
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
  import {axiosBeg} from '../../utils/axiosBeg'
  import {getTree} from "../../utils/treeUtil"
  export default {
    name: "roleSysMge",
    data: function () {
      return{
        dialogFormTitle:"",
        dialogFormUrl:"",
        dialogFormVisible:false,
        contextMenuData: {
          menuName: 'demo',
          axios: {
            x: null,
            y: null
          },
          menulists: [
            {
              fnHandler: 'savedata',
              icoName: 'el-icon-edit-outline',
              btnName: '修改'
            },
            {
              fnHandler: 'newdata',
              icoName: 'el-icon-minus',
              btnName: '删除'
            }
          ]
        },
        defaultRoleProps:  {
          children: 'children',
          label: 'ROLE_NAME'
        },
        defaultMenuProps:  {
          children: 'children',
          label: 'MENU_NAME'
        },
        defaultOperProps:{
          children: 'children',
          label: 'OPER_NAME'
        },
        formRules:{
          ROLE_NAME:[{ required: true, message: '请输入名称', trigger: 'blur' },]
        },
        formFields: {
          ROLE_KEY: null,
          ROLE_NAME:"",
          DESCRIPT:"",
        },
        formFieldsAdd:{},
        menuTreeData: [],
        operTreeData: [],
        formLabelWidth: "80px",
        loadingRole: true,
        loadingMenu: true,
        loadingOper: true,
        roleTreeData: [],
        showCk: false,
        showBj: false,
        th785: 785
      }
    },
    mounted: function () {
      this.initPage();
    },
    methods: {
      initPage:function(){
        this.formFieldsAdd=Object.assign({}, this.formFields);
        this.getRoleList();
        this.initMenuData();
        this.initOperData();
      },
      showMenu(event,data,node,myself) {
        console.info(data);
        this.formFields = Object.assign({},data);
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
      },
      async getRoleList(){
        this.formFields.ROLE_KEY = null;
        let result = await axiosBeg.get('/system_mgr/role/getList', {});
        if(result.code == 200){
          this.roleTreeData = result.data;
        }
        this.loadingRole = false;
      },
      //初始化菜单
      async initMenuData(){
        let result = await axiosBeg.get('/system_mgr/menu/getList',{});
        if(result.code == 200){
          this.menuTreeData = getTree(result.data, {idKey:"MENU_KEY",pidKey:"MENU_PKEY",rootPid: "0"});
        }
        this.loadingMenu = false;
      },
      //初始化菜单
      async initOperData(){
        let result = await axiosBeg.get('/system_mgr/oper/getList',{});
        if(result.code == 200){
          this.operTreeData = getTree(result.data, {idKey:"OPER_KEY",pidKey:"OPER_PKEY",rootPid: "0"});
        }
        this.loadingOper = false;
      },
      //保存角色菜单配置
      async saveMenuConfig() {
        let selNode = this.$refs.roleTree.getCurrentNode();
        if(selNode == null){
          return this.$message.error("请选择角色！")
        }else {
          //获取选中的节点数组
          let selMenuTree = this.$refs.menuTree.getCheckedNodes();
          let selNodeKey = [];
          for(let item of selMenuTree){
            selNodeKey.push(item.MENU_KEY)
          }
          let data = {
            ROLE_KEY: selNode.ROLE_KEY,
            RESOURCE_KEYS: JSON.stringify(selNodeKey),
            RESOURCE_TYPE:0
          }
          console.info(data)
          let result = await axiosBeg.get('/system_mgr/role/updRolePermission', data);
          if(result.code == 200){
            this.$message.success("操作成功！");
          }
        }
      },
      //保存角色菜单配置
      async saveOperConfig() {
        let selNode = this.$refs.roleTree.getCurrentNode();
        if(selNode == null){
          return this.$message.error("请选择角色！")
        }else {
          //获取选中的节点数组
          let selOperTree = this.$refs.operTree.getCheckedNodes();
          let selNodeKey = [];
          for(let item of selOperTree){
            selNodeKey.push(item.OPER_KEY)
          }
          let data = {
            ROLE_KEY: selNode.ROLE_KEY,
            RESOURCE_KEYS: JSON.stringify(selNodeKey),
            RESOURCE_TYPE:1
          }
          let result = await axiosBeg.get('/system_mgr/role/updRolePermission', data);
          if(result.code == 200){
            this.$message.success("操作成功！");
          }
        }
      },
      //点击角色菜单
      selRoleTree: function () {
        this.$refs.menuTree.setCheckedKeys([]);
        this.$refs.operTree.setCheckedKeys([]);
        let selNode = this.$refs.roleTree.getCurrentNode();
        this.getRoleMenuList(selNode.ROLE_KEY);
      },
      //获取角色菜单列表
      async getRoleMenuList(id){
        let data = {ROLE_KEY: id}
        let result = await axiosBeg.get('/system_mgr/role/getRoleMenuAndOperList',data);
        let list_data=result.data
        if(result.code == 200){
          let menuKeys=[];
          let operKeys=[];
          list_data.forEach((Ritem,Rindex) => {
            if(Ritem.RESOURCE_TYPE===0){
              menuKeys.push(Ritem.RESOURCE_KEY)
            }else{
              operKeys.push(Ritem.RESOURCE_KEY)
            }
          });
          //设置用户拥有的角色并勾选对应的节点
          this.$refs.menuTree.setCheckedKeys(menuKeys)
          this.$refs.operTree.setCheckedKeys(operKeys)
        }
      },
      //自定义menuTree节点icon
      renderMenuContent: function(h, { node, data, store }){
        var createElement = arguments[0];
        if (data.Fid == "0") {
          return createElement('span', [
            createElement('span', "    "+data.MENU_NAME),
          ]);
        } else{
          return createElement('span', [
            createElement('i', {attrs: {class: data.MENU_ICON}}),
            createElement('span', "    "+data.MENU_NAME),
          ]);
        }
      },
      //自定义tree节点icon
      renderContentRole: function (h, { node, data, store }) {
        let createElement = arguments[0];
        let type = data.type;
        if (type === -1) {
          return createElement('span', [
            createElement('span', "     "+data.label)
          ]);
        } else if (type === 0) {
          return createElement('span', [createElement('i', {attrs: {class: 'fa  fa-tag'}}),
            createElement('span', "     "+data.label)
          ]);
        }else if (type === 1) {
          return createElement('span', [
            createElement('i', {attrs: {class: 'fa fa-rocket'}}),
            createElement('span', "     "+data.label)
          ]);
        } else if(type === 2){
          return createElement('span', [
            createElement('i', {attrs: {class: 'fa fa-bell'}}),
            createElement('span', "     "+data.label)
          ]);
        }else if(type === 3){
          return createElement('span', [
            createElement('i', {attrs: {class: 'fa fa-user-o'}}),
            createElement('span', "     "+data.label)
          ]);
        }
      },
      renderContentOper: function (h, { node, data, store }){
        let createElement = arguments[0];
        if (data.OPER_KEY == "0") {
          return createElement('span', [
            createElement('span', data.OPER_NAME),
          ]);
        } else if(data.OPER_TYPE==0) {
          return createElement('span', [
            createElement('i', {attrs: {class: 'fa fa-hand-o-up'}}),
            createElement('span', "     "),
            createElement('span', data.OPER_NAME),
          ]);
        }else{
          return createElement('span', [
            createElement('span', data.OPER_NAME),
          ]);
        }
      },
      //添加
      add:function() {
        this.formFields=Object.assign({}, this.formFieldsAdd);
        this.dialogFormTitle="添加角色";
        this.dialogFormUrl='/system_mgr/role/add';
        this.dialogFormVisible = true
      },
      //编辑
      edit:function() {
        if(this.formFields.ROLE_KEY == null){
          return this.$message.error("请选择要编辑的角色！")
        }else {
          this.dialogFormTitle="编辑角色";
          this.dialogFormUrl='/system_mgr/role/update';
          this.dialogFormVisible = true
        }
      },
      //编辑提交
      addOrEditSubmit(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let result = await axiosBeg.post(this.dialogFormUrl, this.formFields);
            if(result.code == 200){
              this.resetForm(formName);
              this.getRoleList();
              this.dialogFormVisible = false;
              this.$message.success("提交成功！")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      del:function () {
        let selNode = this.$refs.roleTree.getCurrentNode();
        if(selNode == null){
          return this.$message.error("请选择要删除的节点！")
        }else {
          this.$confirm('确认删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            let result = await axiosBeg.delete('/system_mgr/role/delete', {ROLE_KEY: selNode.ROLE_KEY});
            if(result.code == 200){
              this.getRoleList();
              this.$message.success("删除成功！");
            }
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
  .roleSysMge{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    color: #333;
  }

  .roleSysMge .log-main{
    height: calc(100% - 70px);
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .roleSysMge .table-content{
    width: 100%;
    height: 100%;
    border-top: 1px solid white;
    display: flex;
  }

  /* roleTree */
  .roleSysMge .roleTree{
    width: 30%;
  }
  .roleSysMge .menuTree{
    flex: 2;
    width: 25%;
    height: 100%;
    margin-left: 15px;
  }
  .roleSysMge .operTree{
    flex: 2;
    width: 35%;
    height: 100%;
    margin-left: 15px;
  }
  .roleSysMge .roleTree-content{
    height: 100%;
    position: relative;
    border: 1px solid rgb(230, 230, 230);
  }
  .roleSysMge .roleTree-title{
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

  .roleSysMge .roleSysMge-submit{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

</style>
