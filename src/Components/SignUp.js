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
      verified: 0
    };
  }
  validate = () => {
    const cp = document.getElementById("confirm").value;
    if (this.state.password.length > 6 && this.state.password === cp) {
      this.setState({ verified: 2 });
    } else {
      this.setState({ verified: 1 });
    }
  };

  render() {
    const {
      User: { loggedin, signup, message }
    } = this.props;

    return !loggedin ? (
      <div className="App">
        <h2>SignUp</h2>
        {this.state.password.length < 6 && this.state.password.length > 1 ? (
          <Alert variant="danger">Password Length must be more than 6</Alert>
        ) : (
          ""
        )}
        {message ? (
          <Alert variant="danger">Email id already Exists</Alert>
        ) : this.state.verified === 0 ? (
          ""
        ) : this.state.verified === 1 ? (
          <Alert variant="danger">Confirm password not matching</Alert>
        ) : (
          ""
        )}
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
              onChange={e => this.setState({ email: e.target.value })}
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
              onChange={e => this.setState({ password: e.target.value })}
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
            disabled={this.state.verified === 2 ? false : true}
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
