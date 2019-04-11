import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert
} from "react-bootstrap";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      warning: null
    };
  }

  validate = () => {
    const cp = document.getElementById("confirm").value;
    if (this.state.password.length < 6 && this.state.password.length > 0) {
      this.setState({ warning: "Password must be more than 7 letters" });
    } else if (this.state.password !== cp && cp.length > 0) {
      this.setState({ warning: "Password and confirm password must be same" });
    } else {
      this.setState({ warning: "OK" });
    }
  };

  render() {
    const {
      ResetStore: { message, isemailverified, changepass, sucess }
    } = this.props;

    return (
      <div className="App">
        {sucess ? (
          <Redirect to="login" />
        ) : isemailverified === 1 ? (
          <React.Fragment>
            <h2>Enter New Pasword</h2>
            {this.state.warning !== "OK" && this.state.warning ? (
              <Alert variant="danger">{this.state.warning}</Alert>
            ) : (
              ""
            )}
            {message ? <Alert variant="danger">{message}</Alert> : ""}
            <Form
              onSubmit={async e => {
                e.preventDefault();
                if (this.state.warning === "OK") {
                  changepass({ password: this.state.password });
                }
              }}
            >
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Password"
                  id="password"
                  autoComplete="true"
                  onChange={e => {
                    this.setState({ password: e.target.value }, () =>
                      this.validate()
                    );
                  }}
                  value={this.state.password}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="true"
                  id="confirm"
                  onChange={this.validate}
                  required
                />
              </FormGroup>

              <Button
                type="submit"
                disabled={this.state.warning === "OK" ? false : true}
              >
                Set new password
              </Button>
            </Form>
          </React.Fragment>
        ) : (
          <Redirect to="/resetpassword" />
        )}
      </div>
    );
  }
}
export default inject("ResetStore")(observer(ResetPass));
