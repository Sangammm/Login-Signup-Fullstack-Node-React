import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpass: ""
    };
  }

  render() {
    const {
      User: { loggedin, signup }
    } = this.props;
    return !loggedin ? (
      <div>
        <h2>SignUp</h2>
        <Form>
          <FormGroup>
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
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
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              autoComplete="true"
              onChange={event =>
                this.setState({ confirmpass: event.target.value })
              }
              value={this.state.confirmpass}
            />
          </FormGroup>

          <button
            variant="primary"
            type="submit"
            onClick={() =>
              this.props.User.signup({
                email: this.state.email,
                password: this.state.password
              })
            }
            value={this.state.cpassword}
          >
            SignUp
          </button>
        </Form>

        <Alert variant="secondary">
          Already have an account?
          <Link to="/login">Login</Link>
        </Alert>
      </div>
    ) : (
      <Redirect to="/home" />
    );
  }
}
export default inject("User")(observer(Signup));
