import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from './App.jsx';
import Index from './pages/Index.jsx';
import NOPDResponseTime from '../nola-data/client/ui/pages/NOPDResponseTime.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="nopd-response-time-2016" component={NOPDResponseTime} />
    </Route>
  </Router>
);
