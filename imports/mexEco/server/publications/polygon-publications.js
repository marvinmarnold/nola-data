import { Polygons } from '../../common/collections/polygons.js'

Meteor.publish("polygons.all", function() {
  return Polygons.find({})
});
