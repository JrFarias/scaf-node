const baseController = require('./baseContoller');
const BaseService = require('./BaseService');
const BaseRepository = require('./BaseRepository');

function BaseFactory({
  repository = BaseRepository,
  service = BaseService,
  controller = baseController,
  domain,
  model,
  router,
} = {}) {
  const repositoryInstance = new repository({ domain, model });
  const serviceInstance = new service({ repository: repositoryInstance });

  return controllerInstance = controller({ service: serviceInstance, router, domain });
}

module.exports = BaseFactory;
