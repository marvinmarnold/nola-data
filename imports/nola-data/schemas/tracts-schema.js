import BoundariesSchema from './boundaries-schema.js';

export default TractsSchema = new SimpleSchema({
  boundaries: {
    type: [BoundariesSchema],
    minCount: 3
  },
  name: {
    type: String
  },
  landArea: {
    type: Number,
  },
  waterArea: {
    type: Number
  },
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  totalPop: {
    type: Number
  },
  white: {
    type: Number
  },
  black: {
    type: Number
  },
  amerIndian: {
    type: Number
  },
  asian: {
    type: Number
  },
  pacIslander: {
    type: Number
  },
  other: {
    type: Number
  },
  multi: {
    type: Number
  },
  hispanic: {
    type: Number
  },
  nonHispanic: {
    type: Number
  },
  totalHomes: {
    type: Number
  },
  occupiedHomes: {
    type: Number
  },
  unoccoupiedHomes: {
    type: Number
  },
})
