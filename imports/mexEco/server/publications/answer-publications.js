import { Answers } from '../../common/collections/answers.js'

Meteor.publish("answers.all", () => {
  console.log('answers.all');
  return Answers.find({})
});
