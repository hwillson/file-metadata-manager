import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

const Logout = () => {
  Meteor.logout(() => {
    browserHistory.push('/');
  });
  return (
    <div className="logout">
      Logging out ...
    </div>
  );
};

export default Logout;
