import { Polygons } from '../../common/collections/polygons.js'
import { Answers } from '../../common/collections/answers.js'

Meteor.methods({
  'polygons.insert': (polygon) => {
    console.log('count');
    console.log(polygon);
    console.log(polygon.geoJSON.geometry.coordinates);
    console.log(Polygons.find().count());
    return Polygons.insert(polygon)
  },
  'polygon.answerQuestion': (polygonId, questionId, value) => {
    return Answers.insert({
      polygonId, questionId, userId: "placeholder", value
    })
  }
});
