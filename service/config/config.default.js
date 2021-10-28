
'use strict';
exports.keys = 'fongahao';

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host host.docker.internal 
    host: 'react_blog_mysql',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    // 数据库名
    database: 'react_blog',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.security = {
  csrf: { enable: false },
  domainWhiteList: ['*'],
};

exports.cors = {
  // origin: '*',
  credentials: true,   // 允许Cookie可以跨域
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};


/* 
添加参考文章数据 
*/
/* eslint valid-jsdoc: "off" */

// 'use strict'
// const { mysql } = require('./secret-temp.js')

// /**
//  * @param {Egg.EggAppInfo} appInfo app info
//  */
// module.exports = (appInfo) => {
//   /**
//    * built-in config
//    * @type {Egg.EggAppConfig}
//    **/
//   const config = (exports = {})

//   // use for cookie sign key, should change to your own and keep security
//   config.keys = appInfo.name + '_1606043519902_395'

//   // add your middleware config here
//   config.middleware = []

//   config.cluster = {
//     listen: {
//       path: '',
//       port: 9002,
//       hostname: '127.0.0.1',
//     }
//   }

//   // 连接mysql
//   config.mysql = {
//     // database configuration
//     client: {
//       // host
//       host: mysql.host,
//       // port
//       port: mysql.port,
//       // username
//       user: mysql.user,
//       // password
//       password: mysql.password,
//       // database
//       database: mysql.database,
//     },
//     // load into app, default is open
//     app: true,
//     // load into agent, default is close
//     agent: false,
//   }

//   // 解决跨域
//   config.security = {
//     csrf: {
//       enable: false,
//     },
//     domainWhiteList: ['*'],
//   }
//   config.cors = {
//     origin: '*',
//     allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
//   }

//   // add your user config here
//   const userConfig = {
//     // myAppName: 'egg',
//   }

//   return {
//     ...config,
//     ...userConfig,
//   }
// }
