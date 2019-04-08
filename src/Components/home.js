import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
class Home extends Component {
  render() {
    const {
      User: { loggedin, loggedinuserid }
    } = this.props;
    return loggedinuserid && loggedin ? (
      <div>
        <h1>Welcome</h1>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}
export default inject("User")(observer(Home));
