import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

const Sidebar = () => (
  <div className="sidebar" data-color="black">
    <div className="sidebar-wrapper">
      <div className="logo">
        <Link to="/" className="simple-text">
          {Meteor.settings.public.title}
        </Link>
      </div>
      <ul className="nav">
        <li>
          <Link to="/welcome" activeClassName="active">
            <i className="pe-7s-home" />
            <p>Welcome</p>
          </Link>
        </li>
        <li>
          <Link to="/files" activeClassName="active">
            <i className="pe-7s-folder" />
            <p>Files</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;