class BaseService {
  constructor({ repository } = {}) {
    this.repository = repository;
  }

  get() {
    return this.repository.get();
  }

  getBydId(id) {
    return this.repository.getBydId(id);
  }

  create(obj) {
    return this.repository.create(obj);
  }

  update(id, obj) {
    return this.repository.update(id, obj);
  }

  delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = BaseService;
