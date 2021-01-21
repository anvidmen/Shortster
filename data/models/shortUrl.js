const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
  longurl: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  shorturl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }

})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
