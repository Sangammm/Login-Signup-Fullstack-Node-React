import { Component } from "react";
import { decorate, observable, action } from "mobx";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.loggedinuserid = null;
    this.loggedin = false;
    this.message = null;
  }

  signup = prop => {
    console.log("into signup store");
    const { email, password } = prop;
    console.log("email=", email);
    console.log("password=", password);
    debugger;
    fetch("/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        debugger;
        if (res.ok) {
          return res.json();
        } else {
          console.log("error", res);
        }
      })
      .then(data => {
        console.log(data);

        debugger;
        if (data.sucess === true) {
          this.loggedin = true;
          this.loggedinuserid = data._id;
          this.message = "signup sucesfull";
        } else {
          console.log("signupfailed");
          this.message = "Signup failed";
        }
      });
  };
}
decorate(User, {
  loggedinuserid: observable,
  loggedin: observable,
  message: observable,
  sinup: action
});
