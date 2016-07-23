import { Meteor } from 'meteor/meteor';
import startupNolaDataServer from '../imports/nola-data/server/startup.js';
import { startupIOPlease } from '../imports/ioplea.se/server/startup.js';
import { startupMexEco } from '../imports/mexEco/server/startup.js';

Meteor.startup(() => {
  // startupNolaDataServer();
  startupIOPlease();
});
