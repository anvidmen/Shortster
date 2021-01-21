require('dotenv').config()
const { env: { BASEURL } } = process

module.exports = async (req, res) => {
  try {
    return res.render('../views/home', { baseUrl: BASEURL })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
