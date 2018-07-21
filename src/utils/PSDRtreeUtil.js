//解析基础数据返回树结构数据
export function getPSDRTree(data,isTopNode){
  let list_platform=data["list_platform"];
  let list_satellite=data["list_satellite"];
  let list_device=data["list_device"];
  let list_role=data["list_role"];
  let treeData=[];
  list_platform.forEach((Pitem,Pindex) => {
    Pitem["id"]=Pitem.PLA_KEY+"";
    Pitem["label"]=Pitem.PLA_NAME;
    Pitem["type"]=0;
    let myPNode=getMyNode(Pitem);
    list_satellite.forEach((Sitem,Sindex) => {
      if(Pitem.PLA_KEY===Sitem.PLA_KEY){
        Sitem["id"]=Pitem.PLA_KEY+"-"+Sitem.SAT_KEY;
        Sitem["label"]=Sitem.SAT_NAME;
        Sitem["type"]=1;
        let mySNode=getMyNode(Sitem);
        list_device.forEach((Ditem,Dindex) => {
          if(Sitem.SAT_KEY===Ditem.SAT_KEY){
            Ditem["id"]=Pitem.PLA_KEY+"-"+Sitem.SAT_KEY+"-"+Ditem.DEV_KEY;
            Ditem["label"]=Ditem.DEV_NAME;
            Ditem["type"]=2;
            let myDNode=getMyNode(Ditem);
            list_role.forEach((Ritem,Rindex) => {
              if(Ditem["id"]===Ritem.ROLE_PKEY){
                Ritem["id"]=Pitem.PLA_KEY+"-"+Sitem.SAT_KEY+"-"+Ditem.DEV_KEY+"-"+Ritem.ROLE_KEY;
                Ritem["label"]=Ritem.ROLE_NAME;
                Ritem["type"]=3;
                let myRNode=getMyNode(Ritem);
                myDNode["children"].push(myRNode);
              }
            });
            mySNode["children"].push(myDNode);
          }
        });
        myPNode["children"].push(mySNode);
      }
    });
    treeData.push(myPNode);
  });
  list_role.forEach((Ritem,Rindex) => {
    if(Ritem.ROLE_PKEY==="0"){
      Ritem["id"]="0"+"-"+Ritem.ROLE_KEY;
      Ritem["label"]=Ritem.ROLE_NAME;
      Ritem["type"]=3;
      let myRNode=getMyNode(Ritem);
      treeData.push(myRNode);
    }
  });
  if(isTopNode){
    let topNode={"id":"0","label":"顶级树","type":-1,"children":[]};
    topNode["children"]=treeData;
    treeData=[]
    treeData.push(topNode)
  }
  return treeData;
}

function getMyNode(item) {
  item["children"]=[]
  return item;
}
