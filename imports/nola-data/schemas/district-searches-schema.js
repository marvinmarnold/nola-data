import ResultsSchema from './results-schema.js';

export default DistrictSearchesSchema = new SimpleSchema({
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
