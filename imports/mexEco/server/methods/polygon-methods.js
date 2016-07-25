import { Polygons } from '../../common/collections/polygons.js'

Meteor.methods({
  'polygons.insert': (polygon) => {
    console.log('count');
    console.log(polygon);
    console.log(polygon.geoJSON.geometry.coordinates);
    console.log(Polygons.find().count());
    return Polygons.insert(polygon)
  }
});
