import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
class Home extends Component {
  render() {
    const {
      User: { loggedin, loggedinuserid }
    } = this.props;
    return (
      <div>
        <h1>Welcome</h1>
      </div>
    );
  }
}
export default inject("User")(observer(Home));
