import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inlogin: false,
      password: null,
      cpassword: null,
      email: null
    };
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    );
  }
}
export default App;
