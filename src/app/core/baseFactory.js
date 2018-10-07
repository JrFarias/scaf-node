const baseRouter = require('./baseRouter');
const BaseController = require('./BaseContoller');
const BaseService = require('./BaseService');
const BaseRepository = require('./BaseRepository');

function BaseFactory({
  repository = BaseRepository,
  service = BaseService,
  controller = BaseController,
  matchRouters = baseRouter,
  domain,
  model,
  router,
} = {}) {
  const repositoryInstance = new repository({ domain, model });
  const serviceInstance = new service({ repository: repositoryInstance });
  const controllerInstance = new controller({ service: serviceInstance });
  const routers = matchRouters({ router, domain, controller: controllerInstance })

  return {
    repositoryInstance,
    serviceInstance,
    controllerInstance,
    routers,
  }
}

module.exports = BaseFactory;
