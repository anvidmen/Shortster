const mongoose = require('mongoose')
const { connect, disconnect } = mongoose

module.exports = {
  connect (url) {
    return connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  },
  disconnect
}
