import { Meteor } from 'meteor/meteor';
import startupNolaDataServer from '../imports/nola-data/server/startup.js';

Meteor.startup(() => {
  startupNolaDataServer();
});
