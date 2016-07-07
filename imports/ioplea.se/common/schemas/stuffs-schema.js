export default StuffsSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  company: {
    type: String
  },
  url: {
    type: String
  },
  iconUrl: {
    type: String
  },
  popularity: {
    type: Number,
    optional: true
  },
  version: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});
