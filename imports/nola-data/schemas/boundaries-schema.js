export default BoundariesSchema = new SimpleSchema({
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  ordinal: {
    type: Number
  }
})
