'use strict';
exports.keys = 'fongahao';

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
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
