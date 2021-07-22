'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {

  // 首页 - 获取文章列表
  async getArticleList() {

    let sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
    article.view_count as view_count,
    type.typeName as typeName 
    FROM article LEFT JOIN type ON article.type_id = type.id`;

    const results = await this.app.mysql.query(sql);
    console.log(results, '获取文章列表');
    this.ctx.body = { data: results };

  };

  // 文章详情页 - 通过id获取文章详情
  async getArticleById() {

    //先配置路由的动态传值，然后再接收值
    console.log(this.ctx.query, '1111111111');
    let id = this.ctx.query.id;

    let sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count ,
      type.typeName as typeName ,
      type.id as typeId 
      FROM article LEFT JOIN type ON article.type_id = type.id 
      WHERE article.id = ${id}`

    const result = await this.app.mysql.query(sql);
    console.log(result, '通过id获取文章详情');
    this.ctx.body = { data: result };

  };

  // 获取类别名称和编号
  async getTypeInfo() {

    const results = await this.app.mysql.select('type');
    console.log(results, '获取类别名称和编号');
    this.ctx.body = { data: results };

  };
  // 不同类型的文章对应的文章列表
  async getListById() {
    const id = this.ctx.query.id;
    const sql = `SELECT article.id as id,
    'article.title as title,
    'article.introduce as introduce,
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
    'article.view_count as view_count,
    'type.typeName as typeName
    'FROM article LEFT JOIN type ON article.type_id = type.id 
    'WHERE type_id=${id}`;

    const result = await this.app.mysql.query(sql);
    console.log(result, '不同类型的文章对应的文章列表');
    this.ctx.body = { data: result }
  };

}

module.exports = HomeController;
