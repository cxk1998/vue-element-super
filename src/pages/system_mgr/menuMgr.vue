<template>
  <div class="menuManage">
    <div class="menuTree">
        <div class="menuTree-title">
          <el-button icon="el-icon-plus" size="size" @click="addMenu">增加</el-button>
          <el-button icon="el-icon-edit-outline" size="size" @click="editMenu">修改</el-button>
          <el-button icon="el-icon-minus" size="size" @click="delMenu">删除</el-button>
          <el-button icon="el-icon-refresh" size="size" @click="initMenuTree">刷新</el-button>
        </div>
        <el-tree
          style="box-sizing: border-box;"
          ref="menuTree"
          v-loading="loadingMenu"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :data="menuTreeData"
          :render-content="renderContentMenu"
          node-key="MENU_KEY"
          :props="defaultMenuProps">
        </el-tree>
    </div>
    <div class="operTree">
        <div class="operTree-title">
          <el-button icon="el-icon-plus" size="size" @click="addOper">增加</el-button>
          <el-button icon="el-icon-edit-outline" size="size" @click="editOper">修改</el-button>
          <el-button icon="el-icon-minus" size="size" @click="delOper">删除</el-button>
          <el-button icon="el-icon-refresh" size="size" @click="initOperTree">刷新</el-button>
        </div>
        <el-tree
          style="box-sizing: border-box;"
          ref="operTree"
          v-loading="loadingOper"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :data="operTreeData"
          :render-content="renderContentOper"
          node-key="OPER_KEY"
          :props="defaultOperProps">
        </el-tree>
    </div>
    <!-- 增加菜单弹窗 -->
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisibleMenu">
      <el-form :model="formFieldsMenu" ref="formFieldsMenu" :rules="formRulesMenu">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="MENU_NAME">
          <el-input v-model="formFieldsMenu.MENU_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="MENU_URL">
          <el-input v-model="formFieldsMenu.MENU_URL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="MENU_SOFT">
          <el-input-number v-model="formFieldsMenu.MENU_SOFT" auto-complete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="MENU_ICON">
          <el-input v-model="formFieldsMenu.MENU_ICON" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleMenu = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSubmitMenu('formFieldsMenu')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 增加操作信息弹窗 -->
    <el-dialog title="添加操作信息" :visible.sync="dialogFormVisibleOper">
      <el-form :model="formFieldsOper" ref="formFieldsOper" :rules="formRulesOper">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="formFieldsOper.OPER_TYPE">
            <el-radio :label=0>功能</el-radio>
            <el-radio :label=1>目录</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="OPER_NAME">
          <el-input v-model="formFieldsOper.OPER_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="OPER_URL">
          <el-input v-model="formFieldsOper.OPER_URL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="OPER_SOFT">
          <el-input-number v-model="formFieldsOper.OPER_SOFT" auto-complete="off"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleOper = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSubmitOper('formFieldsOper')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {axiosBeg} from "../../utils/axiosBeg"
  import {getTree} from "../../utils/treeUtil"

  export default {
    name: "menuMgr",
    data: function () {
      return {
        defaultMenuProps: {
          children: 'children',
          label: 'MENU_NAME'
        },
        defaultOperProps: {
          children: 'children',
          label: 'OPER_NAME'
        },
        formFieldsOper: {
          OPER_NAME: "",
          OPER_URL:"",
          OPER_TYPE:0,
          OPER_PKEY: "",
          OPER_SOFT: 1
        },
        formFieldsOperAdd: {},
        formRulesOper: {
          Fname: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        },
        formFieldsMenu: {
          MENU_NAME: "",
          MENU_PKEY: null,
          MENU_PKEY_NAME: "",
          MENU_URL: "",
          MENU_ICON: "",
          MENU_SOFT: "",
        },
        formFieldsMenuAdd: {},
        formRulesMenu: {
          MENU_NAME: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          MENU_SOFT: [
            {required: true, message: '请输入排序', trigger: 'blur'},
          ],
        },
        formLabelWidth: "80px",
        loadingOper: true,
        loadingMenu:true,
        dialogFormTitleMenu:"",
        dialogFormUrlMenu:"",
        dialogFormVisibleMenu: false,
        dialogFormTitleOper:"",
        dialogFormUrlOper:"",
        dialogFormVisibleOper: false,
        menuTreeData: [],
        operTreeData:[],
      }
    },
    mounted: function () {
      this.initPage();
    },
    methods: {
      initPage:function(){
        this.formFieldsMenuAdd=Object.assign({}, this.formFieldsMenu);
        this.formFieldsOperAdd=Object.assign({}, this.formFieldsOper);
        this.initMenuTree();
        this.initOperTree();
      },
      //自定义tree节点icon
      renderContentMenu: function (h, { node, data, store }){
        let createElement = arguments[0];
        if (data.MENU_KEY == "0") {
          return createElement('span', [
            createElement('span', data.MENU_NAME),
          ]);
        } else {
          return createElement('span', [
            createElement('i', {attrs: {class: data.MENU_ICON}}),
            createElement('span', "     "+data.MENU_NAME),
            createElement('span', "---" + data.MENU_URL),
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
            createElement('span', "---" + data.OPER_URL),
          ]);
        }else{
          return createElement('span', [
            createElement('span', data.OPER_NAME),
            createElement('span', "---" + data.OPER_URL),
          ]);
        }
      },
      //初始化菜单树
      async initMenuTree() {
        this.loadingMenu = true;
        let result = await axiosBeg.get('/system_mgr/menu/getList', {});
        if (result.code == 200) {
          result.data.push({
            MENU_KEY: "0",
            MENU_NAME: "菜单列表",
            MENU_PKEY: "-1",
          });
          this.menuTreeData = getTree(result.data, {
            idKey: "MENU_KEY",
            labelKey: "MENU_NAME",
            pidKey: "MENU_PKEY",
            rootPid: "-1"
          });
          this.loadingMenu = false;
        }
      },
      //初始化菜单树
      async initOperTree() {
        this.loadingOper = true;
        let result = await axiosBeg.get('/system_mgr/oper/getList', {});
        if (result.code == 200) {
          result.data.push({
            OPER_KEY: "0",
            OPER_NAME: "操作列表",
            OPER_PKEY: "-1",
          })
          this.operTreeData = getTree(result.data, {
            idKey: "OPER_KEY",
            labelKey: "OPER_NAME",
            pidKey: "OPER_PKEY",
            rootPid: "-1"
          });
          this.loadingOper = false;
        }
      },
      //增加菜单
      addMenu: function () {
        this.formFieldsMenu=Object.assign({}, this.formFieldsMenuAdd);
        let selNode = this.$refs.menuTree.getCurrentNode();
        if (selNode != null) {
          this.formFieldsMenu.MENU_PKEY = selNode.MENU_KEY;
          this.dialogFormTitleMenu="添加菜单";
          this.dialogFormUrlMenu='/system_mgr/menu/add';
          this.dialogFormVisibleMenu = true
        } else {
          return this.$message.error("请先选择一个父集！")
        }
      },
      //修改菜单
      editMenu: function () {
        let selNode = this.$refs.menuTree.getCurrentNode();
        if (selNode != null) {
          this.formFieldsMenu = selNode;
          this.dialogFormTitleMenu="编辑菜单";
          this.dialogFormUrlMenu='/system_mgr/menu/update';
          this.dialogFormVisibleMenu = true
        } else {
          return this.$message.error("请选择要修改的数据！")
        }
      },
      //添加菜单提交
      addOrEditSubmitMenu(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await axiosBeg.post(this.dialogFormUrlMenu, this.formFieldsMenu);
            if (result.code == 200) {
              this.initMenuTree();
              this.dialogFormVisibleMenu = false;
              this.$message.success("添加成功!")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除菜单
      delMenu: function () {
        let selNode = this.$refs.menuTree.getCurrentNode();
        if (selNode == null) {
          return this.$message.error("请选择要删除的菜单！")
        } else {
          this.$confirm('确认删除菜单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = {MENU_KEY: selNode.MENU_KEY}
            let result = await axiosBeg.delete('/system_mgr/menu/delete', data);
            if (result.code == 200) {
              this.$message.success("删除成功！");
              this.initMenuTree();
            }
          }).catch(() => {

          });
        }
      },
      //增加按钮
      addOper: function () {
        this.formFieldsOper=Object.assign({}, this.formFieldsOperAdd);
        let selNode = this.$refs.operTree.getCurrentNode();
        if (selNode != null) {
          this.formFieldsOper.OPER_PKEY = selNode.OPER_KEY;
          this.dialogFormTitleOper="添加按钮";
          this.dialogFormUrlOper='/system_mgr/oper/add';
          this.dialogFormVisibleOper = true
        } else {
          return this.$message.error("请先选择一个父集！")
        }
      },
      //修改按钮
      editOper: function () {
        let selNode = this.$refs.operTree.getCurrentNode();
        if (selNode != null) {
          this.formFieldsOper = selNode;
          this.dialogFormTitleOper="编辑按钮";
          this.dialogFormUrlOper='/system_mgr/oper/update';
          this.dialogFormVisibleOper = true
        } else {
          return this.$message.error("请选择要修改的数据！")
        }
      },
      //增加按钮提交
      addOrEditSubmitOper: function (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await axiosBeg.post(this.dialogFormUrlOper, this.formFieldsOper);
            if (result.code == 200) {
              this.$message.success("添加成功!");
              this.dialogFormVisibleOper = false;
              this.initOperTree();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除按钮
      delOper: function () {
        let selNode = this.$refs.operTree.getCurrentNode();
        if (selNode == null) {
          return this.$message.error("请选择要删除的按钮！")
        } else {
          this.$confirm('确认删除按钮?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let data = {OPER_KEY: selNode.OPER_KEY}
            let result = await axiosBeg.delete('/system_mgr/oper/delete', data);
            if (result.code == 200) {
              this.$message.success("删除成功！");
              this.initOperTree();
            }
          }).catch(() => {

          });
        }
      },
    }
  }
</script>

<style>
  .menuManage {
    width: 100%;
    height: 97%;
    padding: 10px;
    box-sizing: border-box;
    color: #333;
  }

  /* menuTree */
  .menuManage .menuTree {
    flex: 2;
    width: 50%;
    height: 100%;
    margin-right: 15px;
    float: left;
    border: 1px solid rgb(230, 230, 230);
  }

  .menuManage .menuTree-title {
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

  /* operTree */
  .menuManage .operTree {
    flex: 2;
    width: 46%;
    height: 100%;
    margin-right: 15px;
    float: left;
    border: 1px solid rgb(230, 230, 230);
  }

  .menuManage .operTree-title {
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }

</style>
