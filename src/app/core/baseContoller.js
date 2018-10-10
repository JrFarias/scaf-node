const httpStatus = require('http-status-codes');

class BaseController {
  constructor({ service, errorHandler }) {
    this.service = service;
    this.errorHandler = errorHandler;
  }

  async get(ctx) {
    try {
      ctx.body = await this.service.get();
      ctx.status = httpStatus.OK;
    } catch(e) {
      return this.errorHandler(e);
    }
  }

  async getById(ctx) {
    try {
      ctx.body = await this.service.getById(ctx.params.id);
      ctx.status = httpStatus.OK;
    } catch(e) {
      ctx.status = httpStatus.NOT_FOUND;

      return this.errorHandler(e, ctx);
    }
  }

  async create(ctx) {
    try {
      const id = await this.service.create(ctx.request.body);

      ctx.set('x-id', id);
      ctx.status = httpStatus.CREATED;
    } catch(e) {
      return this.errorHandler(e, ctx)
    }
  }

  async update(ctx) {
    try {
      const id = await this.service.update(ctx.params.id, ctx.request.body);
      ctx.set('x-id', id);

      ctx.status = httpStatus.OK;
    } catch(e) {
      return this.errorHandler(e, ctx)
    }
  }

  async delete(ctx) {
    try {
      await this.service.delete(ctx.params.id)
      ctx.status = httpStatus.OK;
    } catch(e) {
      ctx.body = e;
      ctx.status = httpStatus.CONFLICT;

      return this.errorHandler(e, ctx);
    }
  }
}

module.exports = BaseController;

