import { Meteor } from 'meteor/meteor';
import { Tracts } from '../collections/tracts.js';

Meteor.publish('tracts', () => {
  return Tracts.find();
});
