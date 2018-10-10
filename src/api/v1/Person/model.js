const yup = require('yup');

const Person = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).required(),
  birthdate: yup.date().transform((cur, originalValue) => new Date(originalValue)).required(),
  created_at: yup.date().transform((cur, originalValue) => new Date(originalValue)).nullable(),
  updated_at: yup.date().transform((cur, originalValue) => originalValue ? new Date(originalValue): cur).nullable(),
})

const model = (data) => Person.validate(data)
  .then(v => v)
  .catch((err) => {
    throw err;
  })

module.exports = {
  model,
  domain: 'person'
}
