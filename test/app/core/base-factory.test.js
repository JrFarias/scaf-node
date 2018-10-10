const baseFactory = require('../../../src/app/core/base-factory');

jest.mock('../../../src/config/DB', (args) => args)

describe('baseFactory', () => {
  let factory;
  let mock;
  beforeEach(() => {
    const mockFunction = jest.fn();
    mock = {
      repository: mockFunction,
      service: mockFunction,
      controller: mockFunction,
      matchRouters: mockFunction,
      domain: 'test',
      model: mockFunction,
      router: mockFunction,
      errorHandler: mockFunction,
    }

    factory = baseFactory(mock)
  })

  context('when call base factory', () => {
    test('retun matchRouters', () => {
      expect(mock.repository).toHaveBeenCalled()
      expect(mock.repository).toBeCalledWith({ domain: mock.domain, model: mock.model })

      expect(mock.service).toHaveBeenCalled()
      expect(mock.service).toBeCalledWith({ repository: factory.repositoryInstance })

      expect(mock.controller).toHaveBeenCalled()
      expect(mock.controller).toBeCalledWith({ service: factory.serviceInstance, errorHandler: mock.errorHandler })

      expect(mock.matchRouters).toHaveBeenCalled()
      expect(mock.matchRouters).toBeCalledWith({
        router: mock.router,
        domain: mock.domain,
        controller: factory.controllerInstance
      })
    })
  })
})
