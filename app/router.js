'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.delete('/users/:id', controller.users.destory);
  router.resources('/users', controller.users);
};
