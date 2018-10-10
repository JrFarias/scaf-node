const baseFactory = require('../../../app/core/base-factory');
const { model, domain } = require('./model');

module.exports = {
  domain,
  factory: (router) => baseFactory({ router, domain, model }).routers,
  model
};
