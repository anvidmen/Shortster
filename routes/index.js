const { Router } = require('express')
const {
  clicksShortCode, createCustom, createShortCode, deleteShortCode, getDeleteShortCodes,
  getShortCode, getShortUrls, modifyShortCode, redirectOriginalUrl, updateShortCode, updateShortCodes
} = require('./controllers')

const api = new Router()

api.get('/', getShortCode)
api.get('/clicks', clicksShortCode)
api.post('/shorten', createShortCode)
api.post('/custom/:code', createCustom)
api.get('/stats', getShortUrls)
api.get('/update/url', updateShortCodes)
api.get('/update/url/:id', updateShortCode)
api.post('/edit/:id', modifyShortCode)
api.get('/delete/url', getDeleteShortCodes)
api.get('/delete/url/:id', deleteShortCode)
api.get('/:code', redirectOriginalUrl)

module.exports = api
