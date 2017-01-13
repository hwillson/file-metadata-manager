import React from 'react';
import { Meteor } from 'meteor/meteor';

import TimeHelper from '../../../api/utilities/time_helper';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <nav className="pull-left">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <p className="copyright pull-right">
        &copy; {TimeHelper.currentYear()}&nbsp;
        <a href={Meteor.settings.public.company.url}>
          {Meteor.settings.public.company.name}
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
