import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/ui/routes.jsx';

import startupNolaDataClient from '../imports/nola-data/client/startup.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));

  startupNolaDataClient();
});
