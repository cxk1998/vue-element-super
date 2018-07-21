<template>
  <div class="dptMge">
    <div class="log-main">
      <div class="table-content clearfix">
        <div class="dptTree set-left">
          <div class="dptTree-content">
            <div class="dptTree-title">
              <el-button type="primary" icon="el-icon-plus" size="size" @click="add">添加</el-button>
              <el-button size="size" icon="el-icon-edit" @click="edit">编辑</el-button>
              <el-button size="size" icon="el-icon-close" @click="del">删除</el-button>
              <el-button size="size" icon="el-icon-refresh" @click="getDptList">刷新</el-button>
            </div>
            <el-tree
              ref="dptTree"
              v-loading="loading"
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :data="dptTreeData"
              node-key="DPT_KEY"
              :props='defaultProps'>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="formFields" ref="formFields" :fromRules="fromRules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="DPT_NAME">
          <el-input v-model="formFields.DPT_NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="DPT_SOFT">
          <el-input-number v-model="formFields.DPT_SOFT" auto-complete="off"></el-input-number>
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
  import { getTree} from "../../utils/treeUtil"
  export default {
    name: "dptMgr",
    data: function () {
      return{
        formLabelWidth: "80px",
        dialogFormTitle:"",
        dialogFormUrl:"",
        dialogFormVisible:false,
        defaultProps:  {
          children: 'children',
          label: 'DPT_NAME'
        },
        formFields: {
          DPT_KEY: "",
          DPT_PKEY: "",
          DPT_SOFT: 0,
        },
        formFieldsAdd:{},
        fromRules:{
          Fname:[
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
        loading: true,
        dptTreeData: [],
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
        this.getDptList();
      },
      //获取页面基础数据
      async getDptList(){
        this.loading = true;
        let result = await axiosBeg.get('/system_mgr/dpt/getList', {});
        if(result.code == 200){
          let treedata=result.data;
          this.dptTreeData = getTree(treedata, {idKey:"DPT_KEY",pidKey:"DPT_PKEY",rootPid: "0"});
          this.loading = false;
        }
      },
      //添加
      add: function(){
        this.formFields=Object.assign({}, this.formFieldsAdd);
        let selNode = this.$refs.dptTree.getCurrentNode();
        if(selNode==null){
          this.formFields.DPT_PKEY = "0";
        }else{
          this.formFields.DPT_PKEY = selNode.DPT_KEY;
        }
        this.dialogFormTitle="添加部门";
        this.dialogFormUrl='/system_mgr/dpt/add';
        this.dialogFormVisible = true
      },
      //编辑
      edit:function() {
        let selNode = this.$refs.dptTree.getCurrentNode();
        if(selNode == null){
          return this.$message.error("请选择要编辑的部门！")
        }else {
          this.formFields = selNode;
          this.dialogFormTitle="编辑部门";
          this.dialogFormUrl='/system_mgr/dpt/update';
          this.dialogFormVisible = true
        }
      },
      //添加提交按钮
      addOrEditSubmit(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let result = await axiosBeg.post(this.dialogFormUrl, this.formFields);;
            if(result.code == 200){
              this.getDptList();
              this.dialogFormVisible = false;
              this.$message.success("添加成功！");
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      del(){
        let selNode = this.$refs.dptTree.getCurrentNode();
        if(selNode == null){
          return this.$message.error("请选择要删除的节点！")
        }else {
          this.$confirm('确认删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            let result =await axiosBeg.delete('/system_mgr/dpt/delete', {DPT_KEY: selNode.DPT_KEY});
            if(result.code == 200){
              this.getDptList();
              this.$message.success("删除成功！");
            }
          }).catch(() => {

          });
        }
      },
    },
  }
</script>

<style>
  .dptMge{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    color: #333;
  }
  .dptMge .log-main{
    height: calc(100% - 70px);
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .dptMge .table-content{
    width: 100%;
    height: 100%;
    border-top: 1px solid white;
    display: flex;
  }

  /* dptTree */
  .dptMge .dptTree{
    flex: 2;
    width: 100%;
    height: 100%;
    margin-right: 15px;
  }
  .dptMge .dptTree-content{
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid rgb(230, 230, 230);
  }
  .dptMge .dptTree-title{
    width: 100%;
    padding: 10px 0 10px 15px;
    box-sizing: border-box;
    text-align: left;
    background: #f2f2f2;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }
</style>
