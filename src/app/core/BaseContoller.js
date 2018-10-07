const httpStatus = require('http-status-codes');

class BaseController {
  constructor({ service }) {
    this.service = service;
  }

  async get(ctx) {
    ctx.body = await this.service.get();
    ctx.status = httpStatus.OK;
  }

  async getById(ctx) {
    try {
      ctx.body = await this.service.getById(ctx.params.id);
      ctx.status = httpStatus.OK;
    } catch(e) {
      ctx.status = httpStatus.NOT_FOUND;
    }
  }

  async create(ctx) {
    const id = await this.service.create(ctx.request.body);

    ctx.set('x-id', id);
    ctx.status = httpStatus.CREATED;
  }

  async update(ctx) {
    const id = await this.service.update(ctx.params.id, ctx.request.body);
    ctx.set('x-id', id);

    ctx.status = httpStatus.OK;
  }

  async delete(ctx) {
    try {
      await this.service.delete(ctx.params.id)
      ctx.status = httpStatus.OK;
    } catch(e) {
      ctx.body = e;
      ctx.status = httpStatus.CONFLICT;
    }
  }
}

module.exports = BaseController;

