import React from 'react';
import { Meteor } from 'meteor/meteor';

const logout = () => {
  let content;
  if (Meteor.user()) {
    content = (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/logout">Log out</a>
          </li>
        </ul>
      </div>
    );
  }
  return content;
};

const Header = ({ title }) => (
  <nav className="navbar navbar-default navbar-fixed">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#navigation-example-2"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="/">{title}</a>
      </div>
      {logout()}
    </div>
  </nav>
);

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Header;
