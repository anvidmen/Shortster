const validUrl = require('valid-url')
const { nanoid } = require('nanoid')
const { Url } = require('../../data')

require('dotenv').config()
const { env: { BASEURL } } = process

module.exports = async (req, res) => {
  try {
    const { longurl } = req.body

    const baseurl = BASEURL

    if (!validUrl.isUri(baseurl)) {
      return res.send('Invalid base url')
    }

    if (!validUrl.isUri(longurl)) {
      return res.send('Invalid long url')
    }

    const oldurl = await Url.findOne({ longurl: longurl })

    if (oldurl) {
      return res.render('../views/url', {
        url: oldurl,
        message: ''
      })
    } else {
      const code = nanoid(6)

      const shorturl = baseurl + code

      const newUrl = new Url({
        longurl: longurl,
        code: code,
        shorturl: shorturl,
        date: new Date()
      })

      const newurl2 = await newUrl.save()

      return res.render('../views/url', {
        url: newurl2,
        message: ''
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
