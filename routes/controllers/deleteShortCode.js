const { Url } = require('../../data')

module.exports = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id)

    const urls = await Url.find().sort({ date: -1 })

    return res.render('../views/deleteUrl', {
      urls: urls
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
