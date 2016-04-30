import BoundariesSchema from './boundaries-schema.js';

export default DistrictsSchema = new SimpleSchema({
  name: {
    type: String
  },
  area: {
    type: Number,
    decimal: true
  },
  perimeter: {
    type: Number,
    decimal: true
  },
  boundaries: {
    type: [BoundariesSchema],
    minCount: 3
  }
});
