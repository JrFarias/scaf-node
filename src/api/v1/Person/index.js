const BaseFactory = require('../../../app/core/BaseFactory');

const domain = 'person'
class Person {
  constructor({ id, name, birthday, created_at, updated_at }) {
    this.id = id;
    this.name = name;
    this.birthday = !!birthday ? new Date(birthday): birthday;
    this.created_at = !created_at ? new Date(created_at): created_at;
    this.updated_at = !!updated_at ? new Date(updated_at): updated_at;
  }
}

module.exports = {
  domain,
  factory: (router) => BaseFactory({ router, domain, model: Person }),
  model: Person
};
