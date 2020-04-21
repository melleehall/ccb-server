const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const ContactsService = require('./contacts-service')

const contactsRouter = express.Router()
const bodyParser = express.json()

const serializeContact = contact => ({
  id: contact.id,
  firstname: xss(contact.firstname),
  lastname: xss(contact.lastname),
  email: xss(contact.email),
  phone: xss(contact.phone),
  streetnum: xss(contact.streetnum),
  streetname: xss(contact.streetname),
  city: xss(contact.city),
  zip: xss(contact.zip)
})

contactsRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    for (const field of ['firstname', 'lastname', 'email', 'phone', 'streetnum', 'streetname', 'city', 'zip']) {

      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send(`'${field}' is required`)
      }
    }

    const {firstname, lastname, email, phone, streetnum, streetname, city, zip, request_service, request_news } = req.body

    const newContact = { firstname, lastname, email, phone, streetnum, streetname, city, zip, request_service, request_news }

    ContactsService.insertContact(
      req.app.get('db'),
      newContact
    )
      .then(contact => {
        logger.info(`Contact with id ${contact.id} created.`)
        res
          .status(201)
          .location(`/contacts/${contact.id}`)
          .json(serializeContact(contact))
      })
      .catch(next)
    })
    .get((req, res, next) => {
      ContactsService.getAllContacts(req.app.get('db'))
        .then(contacts => {
          res.json(contacts.map(serializeContact))
        })
        .catch(next)
    })

// contactsRouter
//   .route('/contacts/:contact_id')
//   .all((req, res, next) => {
//     const { contact_id } = req.params
//     ContactsService.getById(req.app.get('db'), contact_id)
//       .then(contact => {
//         if (!contact) {
//           logger.error(`Contact with id ${contact_id} not found.`)
//           return res.status(404).json({
//             error: { message: `Contact Not Found` }
//           })
//         }
//         res.contact = contact
//         next()
//       })
//       .catch(next)

//   })
//   .get((req, res) => {
//     res.json(serializeContact(res.contact))
//   })
//   .delete((req, res, next) => {
//     // TODO: update to use db
//     const { contact_id } = req.params
//     ContactsService.deleteContact(
//       req.app.get('db'),
//       contact_id
//     )
//       .then(numRowsAffected => {
//         logger.info(`Contact with id ${contact_id} deleted.`)
//         res.status(204).end()
//       })
//       .catch(next)
//   })

module.exports = contactsRouter
