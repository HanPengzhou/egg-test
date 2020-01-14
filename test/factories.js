// test/factories.js
'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    user_name: factory.sequence('Users.user_name', n => `name_${n}`),
    user_age: 18,
    password: 123456,
  });
};
