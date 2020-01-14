'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    this.ctx.body = await this.ctx.model.User.findByPk(toInt(this.ctx.params.id));
  }
  async create() {
    const { user_name, user_age, password } = this.ctx.request.body;
    const user = await this.ctx.model.User.create({ user_name, user_age, password });
    this.ctx.status = 201;
    this.ctx.body = user;
  }
  async update() {
    const id = toInt(this.ctx.params.id);
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.status = 404;
      return;
    }
    const { user_name, user_age, password } = this.ctx.request.body;
    await user.update({ user_name, user_age, password });
    this.ctx.body = user;
  }

  async destory() {
    const id = toInt(this.ctx.params.id);
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.status = 405;
      return;
    }
    await user.destory();
    this.ctx.status = 204;
  }
}

module.exports = UserController;
