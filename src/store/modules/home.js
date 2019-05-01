const state = {
  userMenuPermissions:[], //用户菜单权限
  currentMenu:{ //当前选中权限
    active:"/home",
    parent:"",
    icon:"",
    child:""
  },
};

const mutations = {
  userMenuPermissions(state, menuList) {
    state.userMenuPermissions = menuList
  },
  currentMenu(state,newMenu) {
    state.currentMenu.active = newMenu;
    let child_key=newMenu;
    let parent_key="/"+newMenu.split("/")[1];
    for (let pitem of state.userMenuPermissions) {
      if(pitem.url===parent_key){
        state.currentMenu.parent=pitem.name;
        if(pitem.children){
          for (let citem of pitem.children) {
            if(citem.url===child_key){
              state.currentMenu.icon="/";
              state.currentMenu.child=citem.name;
            }
          }
        }
      }
    }
  },
};

const getters = {
  currentMenu: state => {
    return state.currentMenu;
  },
  userMenuPermissions: state => {
    return state.userMenuPermissions;
  }
};

export default {
  state,
  getters,
  mutations
};

