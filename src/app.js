require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const {CLIENT_ORIGIN} = require('./config');
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const contactsRouter = require('./contacts/contacts-router')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
// app.use(cors())
// app.use(
//   cors({
//       origin: CLIENT_ORIGIN
//   })
// );
app.use(helmet())
// app.use(validateBearerToken)

app.use('/api/contacts', contactsRouter)

// used to test connection for hosted server
app.get('/hello', (req, res) => {
  res.send('Hello, world!')
})

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use(errorHandler)

module.exports = app
