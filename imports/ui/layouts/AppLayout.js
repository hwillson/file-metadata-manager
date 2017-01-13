import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

class AppLayout extends Component {
  componentWillMount() {
    if (!this.props.user) {
      browserHistory.push('/login');
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.user) {
      browserHistory.push('/login');
    }
  }

  render() {
    return (
      <div className="cframe-layout">
        <div className="wrapper">
          <Sidebar />
          <div className="main-panel">
            <Header title={this.props.children.props.route.title} />
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  {this.props.children}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
};

AppLayout.defaultProps = {
  user: null,
};

export default AppLayout;
