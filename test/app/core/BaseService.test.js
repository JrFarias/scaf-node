const BaseService = require('../../../src/app/core/BaseService');

describe('BaseService', () => {
  test('matches the snapshot', () => {
    const baseService = new BaseService({ repository: jest.fn() })
    expect(baseService).toMatchSnapshot();
  })

  let repository;
  let baseService;
  const id = 123;
  const obj = {}
  beforeEach(() => {
    const mockFunction = jest.fn(() => Promise.resolve());
    repository = {
      get: mockFunction,
      getById: mockFunction,
      create: mockFunction,
      update: mockFunction,
      delete: mockFunction,
    }
    baseService = new BaseService({ repository })
  })

  context('when method get is called', () => {
    test('call repository.get function', () =>
      baseService.get()
      .then(() => {
        expect(repository.get).toHaveBeenCalled()
        expect(repository.get).toBeCalledTimes(1);
      }))
  })

  context('when method getById is called', () => {
    test('call repository.getById function', () =>
      baseService.getById(id)
      .then(() => {
        expect(repository.getById).toHaveBeenCalled()
        expect(repository.getById).toBeCalledTimes(1);
        expect(repository.getById).toBeCalledWith(id);
      }))
  })

  context('when method create is called', () => {
    test('call repository.create function', () =>
      baseService.create(id)
      .then(() => {
        expect(repository.create).toHaveBeenCalled()
        expect(repository.create).toBeCalledTimes(1);
        expect(repository.create).toBeCalledWith(id);
      }))
  })

  context('when method update is called', () => {
    test('call repository.update function', () =>
      baseService.update(id, obj)
      .then(() => {
        expect(repository.update).toHaveBeenCalled()
        expect(repository.update).toBeCalledTimes(1);
        expect(repository.update).toBeCalledWith(id, obj);
      }))
  })

  context('when method delete is called', () => {
    test('call repository.delete function', () =>
      baseService.delete(id)
      .then(() => {
        expect(repository.delete).toHaveBeenCalled()
        expect(repository.delete).toBeCalledTimes(1);
        expect(repository.delete).toBeCalledWith(id);
      }))
  })
})
