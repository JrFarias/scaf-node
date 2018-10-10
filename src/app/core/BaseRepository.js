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
    const model = await Promise.all(results.map(async (r) => await this.Model(r)));

    return Promise.resolve(model)
  }

  async getById(id) {
    try {
      const result = await this.queryBuilder().select('*').from(this.domain).where({ id });
      if (Array.isArray(result) && result.length === 0) {
        throw new Error('not found')
      }
      const model = await this.Model(Array.isArray(result) && result[0])

      return Promise.resolve(model)
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async create(obj) {
    const model = await this.Model(obj)
    const result =  await this.queryBuilder()
      .table(this.domain)
      .insert(model)

    return Promise.resolve(Array.isArray(result) && result[0]);
  }

  async update(id, obj) {
    const modelInstance = await this.Model(obj);
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
