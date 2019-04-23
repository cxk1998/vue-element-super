
//解析基础数据返回树结构数据
export function getTree(data,conf){
  //id_key,pid_key,rootPid
  let myconf=validateTreeConf(conf);
  if(myconf.length===0){
    return [];
  }
  let id=myconf["id"];
  let pid=myconf["pid"];
  let rootPid=myconf["rootPid"];
  let treeData = [];
  data.forEach((item,index) => {
    if(item[pid] === rootPid){
      let myNode=getMyNode(item);
      getSubNode(id,pid,myNode,data);
      treeData.push(myNode);
    }
  });
  return treeData;
}

//解析基础数据返回树结构数据
function getSubNode(id,pid,myNode,data) {
  data.forEach((item,index) => {
    if(item[pid]===myNode[id]){
      let mySubnode=getMyNode(item);
      myNode.children.push(mySubnode)
    }
  });
  if(myNode.children.length!==0){
    myNode.children.forEach((subitem,subindex) => {
      getSubNode(id,pid,subitem,data);
    });
  }
}

function validateTreeConf(conf) {
  try {
    if (!conf.hasOwnProperty("id")) {
      conf=[];
      console.log("conf mast be a json and has key id")
    }else if (!conf.hasOwnProperty("pid")) {
      conf=[];
      console.log("conf mast be a json and has key pid")
    }else if (!conf.hasOwnProperty("rootPid")) {
      conf=[];
      console.log("conf mast be a json and has key rootPid")
    }
    return conf;
  } catch(e) {
  	console.log("conf mast be a json and has key id,pid,rootPid")
    return []

  }
}

function getMyNode(item) {
  item["children"]=[];
  return item;
}


