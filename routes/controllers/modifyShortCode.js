const validUrl = require('valid-url')
const { Url } = require('../../data')

require('dotenv').config()
const { env: { BASEURL } } = process

module.exports = async (req, res) => {
  try {
    if (!validUrl.isUri(req.body.longurl)) {
      return res.json({
        message: 'Invalid long url'
      })
    }

    const newValues = {
      longurl: req.body.longurl,
      code: req.body.code,
      shorturl: BASEURL + req.body.code
    }

    const oldcustom = await Url.findOne({
      code: req.body.code,
      _id: { $nin: [req.params.id] }
    })
    if (oldcustom < 4) {
      return res.status(400).json({
        message:
                    'oops! this code is in use or exceeds 4 characters. enter a new one.'
      })
    }

    const url = await Url.findByIdAndUpdate(req.params.id, newValues, {
      new: true
    })

    return res.render('../views/updateOneUrl', {
      url: url
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
