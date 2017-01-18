import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { css } from 'aphrodite';

import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Loading from '../components/loading/Loading';
import UtilityStyles from '../styles/utility';

class AppLayout extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.usersReady && !newProps.user) {
      browserHistory.push('/login');
    }
  }

  render() {
    let content;
    if (!this.props.usersReady) {
      content = <Loading />;
    } else {
      content = (
        <div className="cframe-layout">
          <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
              <Header title={this.props.children.props.route.title} />
              <div className="content">
                <div
                  className={`container-fluid card ${css(UtilityStyles.paddingTopBottom15)}`}
                >
                  {this.props.children}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      );
    }
    return content;
  }
}

AppLayout.propTypes = {
  usersReady: React.PropTypes.bool,
  children: React.PropTypes.element.isRequired,
};

AppLayout.defaultProps = {
  usersReady: false,
  user: null,
};

export default AppLayout;
