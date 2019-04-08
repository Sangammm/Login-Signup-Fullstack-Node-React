import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SendPassword from "./Components/SendPass";
import ResetPass from "./Components/ResetPass";
import VerifyPassToken from "./Components/VerifyPassToken";
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
        <Route exact path="/resetpassword" component={SendPassword} />
        <Route path="/ResetPass/:id" component={VerifyPassToken} />
        <Route path="/ResetPass/sucess" component={ResetPass} />
      </Switch>
    );
  }
}
export default App;
