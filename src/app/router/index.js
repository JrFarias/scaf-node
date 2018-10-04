const person = require('../../api/v1/Person');

module.exports = (router) => person.factory(router);
