let ipUrl = 'http://127.0.0.1:7001/admin/';

let servicePath = {
    checkLogin: `${ipUrl}checkLogin`,           //  检查用户名密码是否正确
    getTypeInfo: `${ipUrl}getTypeInfo`,         //  向中台获取文章类别信息
    addArticle: `${ipUrl}addArticle`,           //  向中台发送数据库添加文章接口
    updateArticle: `${ipUrl}updateArticle`,     //  向中台发送数据库修改文章接口
    getArticleList: `${ipUrl}getArticleList`,   //  向中台获取文章列表
    delArticle: `${ipUrl}delArticle/`,           //  向中台删除文章
    getArticleById: `${ipUrl}getArticleById/`,           //  向中台删除文章
}

export default servicePath;