import { Meteor } from 'meteor/meteor';
import { Districts } from '../collections/districts.js';

Meteor.publish('districts', () => {
  return Districts.find();
});
