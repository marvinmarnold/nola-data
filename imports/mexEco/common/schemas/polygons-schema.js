const lnglatsSchema = new SimpleSchema({
  lnglats: {
    type: [Number]
  },
});

const geometrySchema = new SimpleSchema({
  coordinates: {
    type: [lnglatsSchema]
  },
  type: {
    type: String
  }
});

const geoJSONSchema = new SimpleSchema({
  geometry: {
    type: geometrySchema
  },
  type: {
    type: String
  }
});

export default PolygonsSchema = new SimpleSchema({
  name: {
    type: String
  },
  geoJSON: {
    type: geoJSONSchema
  }
});
