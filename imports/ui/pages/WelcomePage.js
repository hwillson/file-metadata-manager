import React from 'react';
import { Meteor } from 'meteor/meteor';

const WelcomePage = () => (
  <div className="welcome-page">
    <p>Welcome to the <strong>{Meteor.settings.public.title}</strong>!</p>
  </div>
);

export default WelcomePage;
