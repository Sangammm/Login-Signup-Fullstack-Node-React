import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      warning: ""
    };
  }
  validate = () => {
    debugger;
    const cp = document.getElementById("confirm").value;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.state.email && !re.test(String(this.state.email).toLowerCase())) {
      this.setState({ warning: "Email Id is wrong" });
    } else if (
      this.state.password.length < 7 &&
      this.state.password.length > 0
    ) {
      this.setState({ warning: "Password must be more than 7 letters" });
    } else if (this.state.password !== cp && cp.length > 0) {
      this.setState({ warning: "Password and confirm password must be same" });
    } else {
      this.setState({ warning: "OK" });
    }
  };

  render() {
    const {
      User: { loggedin, signup, message }
    } = this.props;

    return !loggedin ? (
      <div className="App">
        <h2>SignUp</h2>
        {this.state.warning !== "OK" && this.state.warning ? (
          <Alert variant="danger">{this.state.warning}</Alert>
        ) : (
          ""
        )}
        {message ? <Alert variant="danger">{message}</Alert> : ""}
        <Form
          onSubmit={e => {
            e.preventDefault();
            signup({
              email: this.state.email,
              password: this.state.password
            });
          }}
        >
          <FormGroup>
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={e =>
                this.setState({ email: e.target.value }, () => this.validate())
              }
              value={this.state.email}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              autoComplete="true"
              onChange={e =>
                this.setState({ password: e.target.value }, () =>
                  this.validate()
                )
              }
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
            SignUp
          </Button>
        </Form>

        <Alert variant="secondary">
          Already have an account?
          <Link to="/login">Login</Link>
        </Alert>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}
export default inject("User")(observer(Signup));
