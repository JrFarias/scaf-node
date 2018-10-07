const BaseContoller = require('../../../src/app/core/BaseContoller');

describe('BaseContoller', () => {
  test('matches the snapshot', () => {
    const baseContoller = new BaseContoller({ service: jest.fn() })
    expect(baseContoller).toMatchSnapshot();
  })

  let service;
  let baseContoller;
  let ctxMock;
  beforeEach(() => {
    const mockFunction = jest.fn(() => Promise.resolve());
    service = {
      get: mockFunction,
      getById: mockFunction,
      create: mockFunction,
      update: mockFunction,
      delete: mockFunction,
    }
    ctxMock = {
      request: {
        body: {},
      },
      params: {
        id: 123
      },
      set: jest.fn()
    };
    baseContoller = new BaseContoller({ service })
  })

  context('when method get is called', () => {
    test('call service.get function', () =>
      baseContoller.get(ctxMock)
      .then(() => {
      expect(service.get).toHaveBeenCalled()
      expect(service.get).toBeCalledTimes(1);
    }))
  })

  context('when method getById is called', () => {
    test('call service.getById function', () =>
      baseContoller.getById(ctxMock)
      .then(() => {
      expect(service.getById).toHaveBeenCalled()
      expect(service.getById).toBeCalledTimes(1);
      expect(service.getById).toBeCalledWith(ctxMock.params.id);
    }))

    context('and obj is not found', () => {
      test('call service.getById function', () => {
        service.getById = jest.fn(() => Promise.reject());
        const baseContoller = new BaseContoller({ service })

        return baseContoller.getById(ctxMock)
           .catch(() => {
           expect(service.getById).toHaveBeenCalled()
           expect(service.getById).toBeCalledTimes(1);
           expect(service.getById).toBeCalledWith(ctxMock.params.id);
         })
      })
    })
  })

  context('when method create is called', () => {
    test('call service.create function', () =>
      baseContoller.create(ctxMock)
      .then(() => {
      expect(service.create).toHaveBeenCalled()
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(ctxMock.request.body);
    }))
  })

  context('when method update is called', () => {
    test('call service.update function', () =>
      baseContoller.update(ctxMock)
      .then(() => {
      expect(service.update).toHaveBeenCalled()
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(ctxMock.params.id, ctxMock.request.body);
    }))
  })

  context('when method delete is called', () => {
    test('call service.delete function', () =>
      baseContoller.delete(ctxMock)
      .then(() => {
        expect(service.delete).toHaveBeenCalled()
        expect(service.delete).toBeCalledTimes(1);
        expect(service.delete).toBeCalledWith(ctxMock.params.id);
      }))

    context('and obj is not found', () => {
      test('call service.delete function', () => {
        service.delete = jest.fn(() => Promise.reject());
        const baseContoller = new BaseContoller({ service })

        return baseContoller.delete(ctxMock)
            .catch(() => {
            expect(service.delete).toHaveBeenCalled()
            expect(service.delete).toBeCalledTimes(1);
            expect(service.delete).toBeCalledWith(ctxMock.params.id);
          })
      })
    })
  })
})
