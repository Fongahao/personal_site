/**
 * secret.js 模板
 */

module.exports = {
  // mysql 连接配置
  mysql: {
    host: process.env.MYSQL_HOST || 'react_blog_mysql',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 123456,
    database: process.env.MYSQL_DATABASE || 'react_blog',
  },
  // jwt
  tokenConfig: {
    privateKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  },
}
