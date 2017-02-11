import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor-user-roles';

import AppContainer from '../../ui/containers/AppContainer';
import WelcomePage from '../../ui/pages/WelcomePage';
import FilesContainer from '../../ui/containers/FilesContainer';
import CategoriesPage from '../../ui/pages/CategoriesPage';
import LoginContainer from '../../ui/containers/LoginContainer';
import FieldsPage from '../../ui/pages/FieldsPage';
import Logout from '../../ui/components/logout/Logout';
import VideosContainer from '../../ui/containers/VideosContainer';

const verifyAdmin = (nextState, replace) => {
  if (!Users.isAdmin(Meteor.userId())) {
    replace({
      pathname: '/welcome',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="welcome" />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route component={AppContainer}>
      <Route path="welcome" component={WelcomePage} title="Welcome" />
      <Route path="files" component={FilesContainer} title="Files" />
      <Route path="videos" component={VideosContainer} title="Videos" />
      <Route
        path="fields"
        component={FieldsPage}
        title="Fields"
        onEnter={verifyAdmin}
      />
      <Route
        path="categories"
        component={CategoriesPage}
        title="Categories"
        onEnter={verifyAdmin}
      />
    </Route>
  </Router>
);

export default renderRoutes;
