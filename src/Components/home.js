import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
class Home extends Component {
  render() {
    const {
      User: { loggedin }
    } = this.props;
    return loggedin ? (
      <div>
        <h1>Welcome</h1>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}
export default inject("User")(observer(Home));
