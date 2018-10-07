const QueryBuilder = require('../common/QueryBuilder');

class BaseRepository {
  constructor({ domain, model }) {
    this.Model = model;
    this.domain = domain;
  }

  queryBuilder() {
    const queryBuilderInstance = new QueryBuilder({
      table: this.domain,
    })

    return queryBuilderInstance.qb;
  }

  async get() {
    const results = await this.queryBuilder().select('*').from(this.domain)

    return Promise.resolve(results.map(r => new this.Model(r)))
  }

  async getById(id) {
    try {
      const result = await this.queryBuilder().select('*').from(this.domain).where({ id });
      if (Array.isArray(result) && result.length === 0) {
        throw new Error('not found')
      }

      return Promise.resolve(new this.Model(Array.isArray(result) && result[0]))
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async create(obj) {
    const result =  await this.queryBuilder().table(this.domain)
      .insert(new this.Model(obj))

    return Promise.resolve(Array.isArray(result) && result[0]);
  }

  async update(id, obj) {
    const modelInstance = new this.Model(obj);
    modelInstance.updated_at = new Date();
    delete modelInstance.created_at

    return await this.queryBuilder()
      .table(this.domain)
      .where({ id })
      .update(modelInstance)
  }

  async delete(id) {
    const result = await this.getById(id);
    if (!result.id) {
      throw new Error('error deleting');
    }

    return await this.queryBuilder().table(this.domain).where({ id }).del();
  }
}

module.exports = BaseRepository;
