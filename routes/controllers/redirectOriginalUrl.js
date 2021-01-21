const validUrl = require('valid-url')
const { Url } = require('../../data')

module.exports = async (req, res) => {
  try {
    const url = await Url.findOne({ code: req.params.code })

    if (url) {
      if (!validUrl.isUri(url.shorturl)) {
        return res.send('Invalid short url')
      }
      var newvalues = { $set: { clicks: url.clicks + 1 } }

      Url.findOneAndUpdate(
        { code: req.params.code },
        newvalues,
        async (err, data) => {
          if (err) return res.send('Error')
        }
      )

      res.redirect(url.longurl)
    } else {
      return res.render('../views/errorpage')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
