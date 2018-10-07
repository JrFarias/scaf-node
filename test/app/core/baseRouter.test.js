const baseRouter = require('../../../src/app/core/baseRouter');

describe('baseRouter', () => {
  let mock;
  beforeEach(() => {
    const router = {
      get: jest.fn((a, b) => b()),
      post: jest.fn((a, b) => b()),
      put: jest.fn((a, b) => b()),
      del: jest.fn((a, b) => b()),
    };

    mock = {
      controller: {
        get: jest.fn(() => router),
        getById: jest.fn(() => router),
        create: jest.fn(() => router),
        update: jest.fn(() => router),
        delete: jest.fn(() => router),
      },
      domain: 'test',
      router,
    }

    baseRouter(mock)
  })

  context('when call base router', () => {
    test('and call all controller functions', () => {
      expect(mock.controller.get).toHaveBeenCalled()
      expect(mock.controller.getById).toHaveBeenCalled()
      expect(mock.controller.create).toHaveBeenCalled()
      expect(mock.controller.update).toHaveBeenCalled()
      expect(mock.controller.delete).toHaveBeenCalled()
    })
  })
})
