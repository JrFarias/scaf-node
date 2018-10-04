const httpStatus = require('http-status-codes');

module.exports = ({ service, router, domain }) =>
  router
    .get(`/${domain}`, async ctx => {
      ctx.body = await service.get();
      ctx.status = httpStatus.OK;
    })
    .get(`/${domain}/:id`, async ctx => {
      try {
        ctx.body = await service.getBydId(ctx.params.id);
        ctx.status = httpStatus.OK;
      } catch(e) {
        ctx.status = httpStatus.NOT_FOUND;
      }
    })
    .post(`/${domain}`, async ctx => {
      const id = await service.create(ctx.request.body);

      ctx.set('x-id', id);
      ctx.status = httpStatus.CREATED;
    })
    .put(`/${domain}/:id`, async ctx => {
      const id = await service.update(ctx.params.id, ctx.request.body);
      ctx.set('x-id', id);

      ctx.status = httpStatus.OK;
    })
    .del(`/${domain}/:id`, async ctx => {
      try {
        await service.delete(ctx.params.id)
        ctx.status = httpStatus.OK;
      } catch(e) {
        ctx.body = e;
        ctx.status = httpStatus.CONFLICT;
      }
    })
