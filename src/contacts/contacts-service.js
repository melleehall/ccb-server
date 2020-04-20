const ContactsService = {
  getAllContacts(knex) {
    return knex.select('*').from('contacts')
  },
  getById(knex, id) {
    return knex.from('contacts').select('*').where('id', id).first()
  },
  insertContact(knex, newContact) {
    return knex
      .insert(newContact)
      .into('contacts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteContact(knex, id) {
    return knex('contacts')
      .where({ id })
      .delete()
  },
  updateContact(knex, id, newContactFields) {
    return knex('contacts')
      .where({ id })
      .update(newContactFields)
  },
}

module.exports = ContactsService
