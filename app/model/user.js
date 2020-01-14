'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: STRING(30),
    user_age: INTEGER,
    password: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
