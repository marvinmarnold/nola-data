import { Questions } from '../../common/collections/questions.js'

Meteor.publish("questions.all", function() {
  return Questions.find({})
});
