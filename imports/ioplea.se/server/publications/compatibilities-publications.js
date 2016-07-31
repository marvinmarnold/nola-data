import { Meteor } from 'meteor/meteor';
import { Compatibilities } from '../../common/collections/compatibilities.js';

Meteor.publish("compatibilities", () => {
  return Compatibilities.find();
});
