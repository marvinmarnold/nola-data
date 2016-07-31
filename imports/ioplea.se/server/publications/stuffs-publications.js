import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../common/collections/stuffs.js';

Meteor.publish("stuffs.list", (stuffIds) => {
  return Stuffs.find({_id: {$in: stuffIds}});
});
