const KnexInstance = require('../../config/DB');

class QueryBuilder {
  constructor({ qb = KnexInstance, table }) {
    this.qb = qb,
    this.table = table;
  }
}

module.exports = QueryBuilder;
