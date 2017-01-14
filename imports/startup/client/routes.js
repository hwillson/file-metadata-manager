import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer';
import WelcomePage from '../../ui/pages/WelcomePage';
import FilesPage from '../../ui/pages/FilesPage';
import LoginContainer from '../../ui/containers/LoginContainer';
import Logout from '../../ui/components/logout/Logout';

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="welcome" />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route component={AppContainer}>
      <Route path="welcome" component={WelcomePage} title="Welcome" />
      <Route path="files" component={FilesPage} title="Files" />
    </Route>
  </Router>
);

export default renderRoutes;
