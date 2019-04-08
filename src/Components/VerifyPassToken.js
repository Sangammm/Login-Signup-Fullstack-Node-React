import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { inject, observer } from "mobx-react";

class VerifyPassToken extends Component {
  render() {
    const {
      ResetStore: { message, isemailverified, checktoken }
    } = this.props;
    checktoken({ Ptoken: this.props.match.params.id });
    return (
      <div className="App">
        {isemailverified === 0 ? (
          <React.Fragment>
            <Alert variant="sccess">
              <Spinner animation="border" />
              You will be redirected to the password reset page shortly....
            </Alert>
          </React.Fragment>
        ) : isemailverified === 1 ? (
          <Redirect to="/forgetpass" />
        ) : message ? (
          <Alert variant="danger">
            {message}
            <br />
            <Link to="/resetpassword">Try Again</Link>
          </Alert>
        ) : (
          <h1>xyz</h1>
        )}
      </div>
    );
  }
}

export default inject("ResetStore")(observer(VerifyPassToken));
