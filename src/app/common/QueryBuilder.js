const KnexInstance = require('../../config/DB');

class QueryBuilder {
  constructor({ qb, table }) {
    this.qb = qb || KnexInstance;
    this.table = table;
  }
}

module.exports = QueryBuilder;
