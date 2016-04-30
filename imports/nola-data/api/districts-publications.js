import { Meteor } from 'meteor/meteor';
import { Districts } from '../collections/districts.js';

Meteor.publish('districts', () => {
  console.log('publish districts');
  return Districts.find();
});
