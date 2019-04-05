import { Component } from "react";

import { request } from "./User";

const url = "http://localhost:3001";
export default class ResetStore extends Component {
  constructor(props) {
    super(props);
    this.isemailverified = false;
    this.isemailsent = false;
    this.message = null;
    this.sucess = false;
  }

  sendpass = prop => {
    request("/sendresetpass", "POST", { prop }).then(data => {
      if (data.sucess) {
        this.isemailsent = false;
        this.message = "Click the link given in email to reset password";
      } else {
        this.isemailsent = true;
        this.message = "This email address is not registered.";
      }
    });
  };
}
