import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer';
import WelcomePage from '../../ui/pages/WelcomePage';
import FilesContainer from '../../ui/containers/FilesContainer';
import CategoriesContainer from '../../ui/containers/CategoriesContainer';
import LoginContainer from '../../ui/containers/LoginContainer';
import FieldsContainer from '../../ui/containers/FieldsContainer';
import Logout from '../../ui/components/logout/Logout';

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="welcome" />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route component={AppContainer}>
      <Route path="welcome" component={WelcomePage} title="Welcome" />
      <Route path="files" component={FilesContainer} title="Files" />
      <Route path="categories" component={CategoriesContainer} title="Categories" />
      <Route path="fields" component={FieldsContainer} title="Fields" />
    </Route>
  </Router>
);

export default renderRoutes;
