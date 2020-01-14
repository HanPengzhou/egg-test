'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/users.test.js', () => {
  describe('GET /users', () => {
    it('should work', async () => {
      await app.factory.createMany('user', 3);
      const res = await app.httpRequest().get('/users?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].user_name);
      assert(res.body[0].user_age);
    });
  });
  describe('GET /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const res = await app.httpRequest().get(`/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.user_age === user.user_age);
    });
  });
  describe('POST /users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/users').send({
        user_name: 'hpz',
        user_age: 28,
        password: '123456',
      });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/users/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.user_name === 'hpz');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should word', async () => {
      app.mockCsrf();
      const user = await app.factory.create('user');
      const res = await app.httpRequest().delete(`/users/${user.id}`);
      assert(res.status === 204);
    });
  });
});
