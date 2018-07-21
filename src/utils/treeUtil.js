
//解析基础数据返回树结构数据
export function getTree(data,conf){
  //id_key,pid_key,rootPid
  let myconf=validateTreeConf(conf);
  if(myconf.length==0){
    return [];
  }
  let idKey=myconf["idKey"]
  let pidKey=myconf["pidKey"]
  let rootPid=myconf["rootPid"]
  let treeData = [];
  data.forEach((item,index) => {
    if(item[pidKey]==rootPid){
      let myNode=getMyNode(item)
      getSubNode(idKey,pidKey,myNode,data);
      treeData.push(myNode);
    }
  });
  return treeData;
}

//解析基础数据返回树结构数据
function getSubNode(idKey,pidKey,myNode,data) {
  data.forEach((item,index) => {
    if(item[pidKey]==myNode[idKey]){
      let mySubnode=getMyNode(item)
      myNode.children.push(mySubnode)
    }
  });
  if(myNode.children.length!=0){
    myNode.children.forEach((subitem,subindex) => {
      getSubNode(idKey,pidKey,subitem,data);
    });
  }
}

function validateTreeConf(conf) {
  try {
    if (!conf.hasOwnProperty("idKey")) {
      conf=[];
      console.log("conf mast be a json and has key idKey")
    }else if (!conf.hasOwnProperty("pidKey")) {
      conf=[];
      console.log("conf mast be a json and has key pidKey")
    }else if (!conf.hasOwnProperty("rootPid")) {
      conf=[];
      console.log("conf mast be a json and has key rootPid")
    }
    return conf;
  } catch(e) {
    return []
    console.log("conf mast be a json and has key idKey,pidKey,rootPid")
  }
}

function getMyNode(item) {
  item["children"]=[]
  return item;
}


