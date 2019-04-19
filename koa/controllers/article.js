const query = require('../db/');
const {PAGECOUNT} = require('../config/');

const article = {
  // 创建文章 管理员
  createArticle:function ({classType,title,content,contentToMark,createTime,brief}){
    return query(`INSERT INTO article(classType,title,content,contentToMark,createTime,brief) 
                    VALUES('${classType}','${title}','${content}','${contentToMark}','${createTime}','${brief}')`);
  },
  //获取文章列表 管理员
  getArticlesList: function(page){
    if(page){
      let skip  = (page-1)*PAGECOUNT;  //skip(skip):从skip处开始查询; limit(limit):查询limit条; sort({_id:-1}):降序
      return Promise.all([ //Promise.all 都成功执行返回resolved 一个失败返回rejected
        query(`SELECT articleId,classType,title,createTime,brief FROM article ORDER BY articleId DESC LIMIT ${skip},${PAGECOUNT}`),
        query(`SELECT count(articleId) FROM article`)
      ]);
    }else{
      return query(`SELECT * FROM article ORDER BY articleId DESC`);
    }
  },
  // 根据classify获取所有文章 用户
  getArticlesByClassify:function (classType){
    return query(`SELECT articleId,classType,title,createTime,brief FROM article WHERE classType = '${classType}' ORDER BY articleId DESC`);
  },
  //获取一篇文章 管理员
  getOneArticle(articleId){
    return query(`SELECT articleId,classType,title,content,createTime,brief FROM article WHERE articleId = ${articleId}`);
  },
  //查看一篇文章
  lookOneArticle(articleId){
    return query(`SELECT articleId,classType,title,contentToMark,createTime FROM article WHERE articleId = ${articleId}`);
  },
  // 删除一篇文章 管理员
  removeOneArticle:function (articleId){
    return query(`DELETE FROM article WHERE articleId = '${articleId}'`);
  },
  // 编辑一篇文章 管理员
  updateArticle:function ({articleId,classType,title,content,contentToMark,brief}){
    return query(`UPDATE article SET 
        classType = '${classType}',
        title = '${title}',
        content= '${content}',
        contentToMark = '${contentToMark}',
        brief = '${brief}'
        WHERE articleId = ${articleId}`);
  }
};
module.exports=article;
