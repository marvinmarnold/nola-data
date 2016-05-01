export default ResultsSchema = new SimpleSchema({
  objectId: {
    type: String
  },
  rank: {
    type: Number
  },
  waitTime: {
    type: Number,
    decimal: true
  },
  message: {
    type: String,
  }
})
