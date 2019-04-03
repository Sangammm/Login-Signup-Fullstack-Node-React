import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert
} from "react-bootstrap";

export default class Login extends Component {
  render() {
    return (
      <div className="App">
        <h2>Login</h2>
        <Form>
          <FormGroup controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" placeholder="Enter email" />
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="Password" />
          </FormGroup>
          <Button variant="primary" type="submit" onClick={this.signup}>
            Login
          </Button>
        </Form>
        <Alert variant="secondary">
          Not have an account?
          <Button
            variant="primary"
            onClick={() => this.setState({ inlogin: false })}
          >
            SignUp
          </Button>
        </Alert>
      </div>
    );
  }
}
