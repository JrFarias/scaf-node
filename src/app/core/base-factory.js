const baseRouter = require('./base-router');
const BaseController = require('./BaseContoller');
const BaseService = require('./BaseService');
const BaseRepository = require('./BaseRepository');
const ErrorHandler = require('../common/error-handler');

function BaseFactory({
  repository = BaseRepository,
  service = BaseService,
  controller = BaseController,
  matchRouters = baseRouter,
  domain,
  model,
  router,
  errorHandler = ErrorHandler
} = {}) {
  const repositoryInstance = new repository({ domain, model });
  const serviceInstance = new service({ repository: repositoryInstance });
  const controllerInstance = new controller({ service: serviceInstance, errorHandler });
  const routers = matchRouters({ router, domain, controller: controllerInstance })

  return {
    repositoryInstance,
    serviceInstance,
    controllerInstance,
    routers,
  }
}

module.exports = BaseFactory;
