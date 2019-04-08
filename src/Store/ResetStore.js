import { Component } from "react";
import { decorate, observable, action } from "mobx";
import { request } from "./User";

//const url = "http://localhost:3001";
export default class ResetStore extends Component {
  constructor(props) {
    super(props);
    this.isemailverified = 0;
    this.isemailsent = false;
    this.message = null;
    this.sucess = false;
    this.verifiedid = null;
  }

  sendpass = prop => {
    console.log(prop);

    request("/sendresetpass", "POST", prop).then(data => {
      if (data.sucess) {
        this.isemailsent = true;
        this.message = data.message;
      } else {
        this.isemailsent = false;
        this.message = data.message;
      }
    });
  };

  checktoken = prop => {
    console.log(prop);

    request("/verify", "POST", prop).then(data => {
      if (data.sucess) {
        this.isemailverified = 1;
        this.message = null;
        this.verifiedid = data.message;
      } else {
        this.isemailverified = 2;
        this.message = data.message;
      }
    });
  };

  changepass = prop => {
    console.log("inchangepass");
    request("/changepass", "POST", {
      userid: this.verifiedid,
      password: prop.password
    }).then(data => {
      if (data.sucess) {
        this.sucess = true;
      } else {
        this.sucess = false;
        this.message = "Error in password change try again";
      }
    });
  };
}
decorate(ResetStore, {
  isemailverified: observable,
  isemailsent: observable,
  message: observable,
  sucess: observable,
  sendpass: action,
  checktoken: action
});
