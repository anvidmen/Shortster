const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('./data')
const api = require('./routes')

const app = express()

require('dotenv').config()
const { env: { PORT, MONGODB_URL } } = process

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', api)

mongoose.connect(MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(error => console.log(error.message))
