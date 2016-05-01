import ResultsSchema from './results-schema.js';

export default TractsSearchesSchema = new SimpleSchema({
  priorityNum: {
    type: Number,
    optional: true
  },
  nopdType: {
    type: String,
    optional: true
  },
  results: {
    type: [ResultsSchema]
  },
  updatedAt: {
    type: Date
  }
});
