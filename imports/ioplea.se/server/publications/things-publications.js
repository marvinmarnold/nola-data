import { Meteor } from 'meteor/meteor';
import { Things } from '../../common/collections/things.js';

Meteor.publish("things", argument => {
  return Things.find();
});
