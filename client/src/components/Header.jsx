import React, { Component } from 'react';

class Header extends Component {
  renderContext() {
    if (this.props.auth) {
      return (
        <a key="logout" className="ui" href="/api/logout">
          Logout
        </a>
      );
    }
    return (
      <a key="login" className="ui" href="/api/login">
        Login with Google
      </a>
    );
  }

  render() {
    return (
      <div className="ui menu">
        <div className="item">
          <img src="https://semantic-ui.com/images/logo.png" />
        </div>
        <div className="item active">Screener</div>
        <div className="item right">{this.renderContext()}</div>
      </div>
    );
  }
}

export default Header;
