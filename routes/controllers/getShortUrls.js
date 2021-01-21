const { Url } = require('../../data')

module.exports = async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 }).limit(200)

    return res.render('../views/archive', {
      urls: urls
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
