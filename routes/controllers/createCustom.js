
const { Url } = require('../../data')

require('dotenv').config()
const { env: { BASEURL } } = process

module.exports = async (req, res) => {
  try {
    const { custom } = req.body

    const oldcustom = await Url.findOne({ code: custom })
    if (oldcustom && oldcustom > 4) {
      return res.render('../views/url', {
        url: oldcustom,
        message: 'oops! this code is in use or exceeds 4 characters. enter a new one.'
      })
    } else {
      const url = await Url.findOne({ code: req.params.code })

      const baseurl = BASEURL
      const urln = baseurl + custom

      var newvalues = { $set: { code: custom, shorturl: urln } }

      if (url) {
        Url.findOneAndUpdate(
          { code: req.params.code },
          newvalues,
          async (err, data) => {
            if (err) return res.send('Error')
            else {
              const url2 = await Url.findOne({ code: custom })
              return res.render('../views/url', {
                url: url2,
                message: ''
              })
            }
          }
        )
      } else {
        return res.send('Invalid url code')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
