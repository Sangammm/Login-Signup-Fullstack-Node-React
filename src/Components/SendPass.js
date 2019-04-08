import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Alert
} from "react-bootstrap";
class SendPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  render() {
    const {
      ResetStore: { sendpass, isemailsent, message }
    } = this.props;
    return (
      <div className="App">
        <h2>Enter your email</h2>
        {isemailsent ? (
          <Alert variant="success">{message}</Alert>
        ) : message ? (
          <Alert variant="danger">{message}</Alert>
        ) : (
          ""
        )}
        <Form
          onSubmit={e => {
            e.preventDefault();
            sendpass({
              email: this.state.email
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
          <Button variant="primary" type="submit">
            Send Reset Link
          </Button>
        </Form>
      </div>
    );
  }
}
export default inject("ResetStore")(observer(SendPassword));
