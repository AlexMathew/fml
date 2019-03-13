import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <div>FML</div>
          <Link to="/">Home</Link>
          <div>|</div>
          <Link to="/login">Login/Sign up</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
