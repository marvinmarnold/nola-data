import ResultsSchema from './results-schema.js';

export default TractsSearchesSchema = new SimpleSchema({
  priorityFilter: {
    type: String,
    optional: true
  },
  typeFilter: {
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
