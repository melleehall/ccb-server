const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Contacts Endpoint', () => {
    let db

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
      })

      after('disconnect from db', () => db.destroy())

      before('clean the table', () => db('contacts').truncate())

      afterEach('cleanup', () => db('contacts').truncate())
      
      describe(`POST /api/contacts`, () => {
          it(`creates a new contact, responding with 201 and the new contact`, () => {
              const newContact = {
                firstname: 'First name',
                lastname: 'Last name', 
                email: 'testemail@gmail.com', 
                phone: '303-101-3030', 
                streetnum: '101', 
                streetname: 'Test Road', 
                city: 'Evergreen', 
                zip: '80204',
              }

              return supertest(app)
                .post('/api/contacts')
                .send(newContact)
                .expect(201)
                .expect(res => {
                    expect(res.body.firstname).to.eql(newContact.firstname)
                    expect(res.body.lastname).to.eql(newContact.lastname)
                    expect(res.body.email).to.eql(newContact.email)
                    expect(res.body.phone).to.eql(newContact.phone)
                    expect(res.body.streetnum).to.eql(newContact.streetnum)
                    expect(res.body.streetname).to.eql(newContact.streetname)
                    expect(res.body.city).to.eql(newContact.city)
                    expect(res.body.zip).to.eql(newContact.zip)
                    expect(res.headers.location).to.eql(`/api/contacts/${res.body.id}`)
                })
          })

          const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'streetnum', 'streetname', 'city', 'zip']

          requiredFields.forEach(field => {
            const newContact = {
                firstname: 'First name',
                lastname: 'Last name', 
                email: 'testemail@gmail.com', 
                phone: '303-101-3030', 
                streetnum: '101', 
                streetname: 'Test Road', 
                city: 'Evergreen', 
                zip: '80204',
              }

          it(`responds with 400 and an error message when the $field is missing`, () => {
              delete newContact[field]

              return supertest(app)
                .post('/api/contacts')
                .send(newContact)
                .expect(400,{
                    error: { message: `Missing required field ${field} in request body` }
                })
          })


        })

        it('removes XSS attack content from response', () => {
            const maliciousContact = {
                firstname: 'Naughty naughty very naughty <script>alert("xss");</script>',
                lastname: 'Last name',
                email: 'email@gmail.com',
                phone: '303-902-1029',
                streetnum: '10',
                streetname: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
                city: 'Idaho Springs',
                zip: '90201'
            }
            return supertest(app)
                .post(`/api/contacts`)
                .send(maliciousContact)
                .expect(201)
                .expect(res => {
                    expect(res.body.firstname).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
                    expect(res.body.streetname).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
                })
        })
      })
})