const mockDb = require('mock-knex');
const knex = require('knex');

const BaseRepository = require('../../../src/app/core/BaseRepository');

jest.mock('../../../src/config/DB', (args) => args)

const db = knex({ client: 'sqlite3' });
const tracker = mockDb.getTracker();

describe('BaseService', () => {
  test('matches the snapshot', () => {
    const baseRepository = new BaseRepository({ model: jest.fn(), domain: 'test' })
    expect(baseRepository).toMatchSnapshot();
  })

  let baseRepository;
  beforeEach(() => {
    baseRepository = new BaseRepository({ model: jest.fn((args) => args), domain: 'test' })
    baseRepository.queryBuilder =  mockDb.mock(db);
  })

  afterEach(() => {
    mockDb.unmock(db);
    tracker.uninstall();
  });

  context('when method get is called', () => {
    test('return query to select all', () => {
      tracker.install();
      tracker.on('query', (query, step) => {
        expect(step).toEqual(1);
        expect(query.sql).toEqual('select * from `test`');
        query.response([{}]);
      });

      return baseRepository.get()
      .then(result => expect(result).toEqual([{}]))
    })
  })

  context('when method getById is called', () => {
    test('return query to select by id', () => {
      tracker.install();
      tracker.on('query', (query, step) => {
        expect(step).toEqual(1);
        expect(query.sql).toEqual('select * from `test` where `id` = ?');
        query.response([{}]);
      });
      const id = 123;

      return baseRepository.getById(id)
      .then(result => expect(result).toEqual({}))
    })

    context('and returns nothing', () => {
      test('return an error', () => {
        tracker.install();
        tracker.on('query', (query, step) => {
          expect(step).toEqual(1);
          expect(query.sql).toEqual('select * from `test` where `id` = ?');
          query.response([]);
        });
        const id = 123;

        return baseRepository.getById(id)
        .catch(error => expect(error).toEqual(new Error('not found')))
      })
    })
  })

  context('when method create is called', () => {
    test('create a new data', () => {
      const obj = { data: 'data' };

      tracker.install();
      tracker.on('query', (query, step) => {
        expect(step).toEqual(1);
        expect(query.sql).toEqual('insert into `test` (`data`) values (?)');
        query.response([obj]);
      });

      return baseRepository.create(obj)
      .then(result => expect(result).toEqual(obj))
    })
  })

  context('when method update is called', () => {
    test('update an exist data', () => {
      const obj = { data: 'data', created_at: 'test' };
      const id = 123;

      tracker.install();
      tracker.on('query', (query, step) => {
        expect(step).toEqual(1);
        expect(query.sql).toEqual('update `test` set `data` = ?, `updated_at` = ? where `id` = ?');
        query.response([obj]);
      });


      return baseRepository.update(id ,obj)
      .then(result => expect(result).toEqual([obj]))
    })
  })

  context('when method delete is called', () => {
    test('delete an exist data', () => {
      const id = 123;
      baseRepository.getById = jest.fn(() => Promise.resolve({ id }))

      tracker.install();
      tracker.on('query', (query, step) => {
        expect(step).toEqual(1);
        expect(query.sql).toEqual('delete from `test` where `id` = ?');
        query.response(id);
      });


      return baseRepository.delete(id)
      .then(result => expect(result).toEqual(id))
    })

    context('and returns nothing', () => {
      test('return an error', () => {
        const id = 123;
        baseRepository.getById = jest.fn(() => Promise.resolve({ }))

        tracker.install();
        tracker.on('query', (query, step) => {
          expect(step).toEqual(1);
          expect(query.sql).toEqual('delete from `test` where `id` = ?');
          query.response(id);
        });

        return baseRepository.delete(id)
        .catch(error => expect(error).toEqual(new Error('error deleting')))
      })
    })
  })
})
