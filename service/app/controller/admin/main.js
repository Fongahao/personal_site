'use strict'

const Controller = require('egg').Controller;

class MainController extends Controller {

    async index() {
        this.ctx.body = 'hi api';
    }

    // 判断用户密码是否正确
    async checkLogin() {
        // console.log('验证用户密码登录请求报文:', '\n', this.ctx.query, this.ctx)
        // console.log('验证用户密码登录请求报文request:', '\n', this.ctx.request)
        console.log('验证用户密码登录请求报文request.body:', '\n', this.ctx.request.body)
        const { userName, password } = this.ctx.request.body;
        // let userName = this.ctx.request.body;
        // let password = this.ctx.query.password;
        const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`;

        // console.log(sql, 'sql')

        const res = await this.app.mysql.query(sql);
        console.log('后台登录请求数据', res)
        if (res.length > 0) {
            // 登陆成功,进行session缓存
            let openId = new Date().getTime();
            this.ctx.session.openId = { 'openId': openId };
            this.ctx.body = { 'data': '登录成功', 'openId': openId };
        } else {
            this.ctx.body = { 'data': '登录失败' }
        }
        console.log('this.ctx.session', this.ctx.session)
    }

    // 向数据库获取后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type');
        this.ctx.body = { data: resType };
    }

    // 向数据库添加后台文章数据
    async addArticle() {
        // 请求报文体的数据
        const tmpArticle = this.ctx.request.body;
        console.log('插入文章请求报文体:', this.ctx.request.body);

        const result = await this.app.mysql.insert('article', tmpArticle);
        console.log('插入文章结果:', result)
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId,
        }

    }

    // 向数据库修改后台文章数据
    async updateArticle() {
        const tmpArticle = this.ctx.request.body;


        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;

        this.ctx.body = {
            isSuccess: updateSuccess
        }
        console.log('请求报文体:', this.ctx.request.body, "\n", '跟新数据库返回结果:', result, "\n", '更新数据库是否成功:', updateSuccess, '修改文章update')
    }

    // 获取文章列表
    async getArticleList() {

        const sql = `select article.id as id, 
        article.title as title,
        article.introduce as introduce, 
        article.view_count as view_count,
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime, 
        type.typeName as typeName
        from article left join type on article.type_id = type.id
        order by article.id desc`;

        const result = await this.app.mysql.query(sql);
        this.ctx.body = { list: result };
    }

    // 向数据库删除文章
    async delArticle() {

        const id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', { 'id': id });

        this.ctx.body = { data: res }
        console.log('删除文章delArticle:', res, '\n', '删除文章的ID', this.ctx.params)
    }

    // 根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id=' + id;

        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
}

module.exports = MainController;