const QueryBuilder = require('../../../src/app/common/QueryBuilder');

jest.mock('../../../src/config/DB', (args) => args)

describe('QueryBuilder', () => {
  test('matches the snapshot', () => {
    const qb = jest.fn()
    const table = jest.fn()
    const queryBuilder = new QueryBuilder({ qb, table })

    expect(queryBuilder).toMatchSnapshot()
  })
})
