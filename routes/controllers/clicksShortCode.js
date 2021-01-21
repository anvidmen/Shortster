const { Url } = require('../../data')

module.exports = async (req, res) => {
  try {
    let sum, numberOfUrl

    const aggregateSum = await Url.aggregate([
      { $group: { _id: null, amount: { $sum: '$clicks' } } }
    ])

    sum = aggregateSum[0].amount

    numberOfUrl = await Url.countDocuments({})

    res.send(`URLs shortened: ${numberOfUrl}, Total number of clicks : ${sum}`)
  } catch (error) {
    console.log(error)
  }
}
