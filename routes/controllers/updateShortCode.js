const { Url } = require('../../data')

module.exports = async (req, res) => {
  try {
    await Url.findById(req.params.id, (err, url) => {
      if (err) console.log(err)

      return res.render('../views/updateOneUrl', {
        url: url
      })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
