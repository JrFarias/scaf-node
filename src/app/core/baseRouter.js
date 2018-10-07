module.exports = ({ router, domain, controller }) => {
  return router
    .get(`/${domain}`, (...args) => controller.get(...args))
    .get(`/${domain}/:id`, (...args) => controller.getById(...args))
    .post(`/${domain}`, (...args) => controller.create(...args))
    .put(`/${domain}/:id`, (...args) => controller.update(...args))
    .del(`/${domain}/:id`, (...args) => controller.delete(...args))
  }


