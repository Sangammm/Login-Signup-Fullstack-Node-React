import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    const {
      User: { loggedin, loggedinuserid, login, message }
    } = this.props;
    return loggedin ? (
      <Redirect to="/home" />
    ) : (
      <div className="App">
        <h2>Login</h2>
        {message ? <Alert variant="danger">{message}</Alert> : ""}
        <Form>
          <FormGroup controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              required
            />
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              required
            />
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
            onClick={e => {
              e.preventDefault();
              login(this.state);
            }}
          >
            Login
          </Button>
        </Form>
        <Alert variant="secondary">
          Not have an account?
          <Link to="/">SignUp</Link>
        </Alert>
        <Alert variant="secondary">
          Forgot Your Password
          <Link to="/resetpassword">Forgot Password</Link>
        </Alert>
      </div>
    );
  }
}
export default inject("User")(observer(Login));
