import { Component } from "react";
import { decorate, observable, action } from "mobx";
const url = "http://localhost:3001";

export const request = async (api, method, body) => {
  const res = await fetch(`${url}${api}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export default class User extends Component {
  constructor(props) {
    super(props);
    this.loggedinuserid = null;
    this.loggedin = false;
    this.message = null;
  }

  signup = prop => {
    request("/signup", "POST", prop).then(data => {
      if (data.sucess) {
        this.loggedin = true;
        this.loggedinuserid = data;
        this.message = null;
      } else {
        this.message = data.data;
      }
    });
  };

  login = prop => {
    request("/login", "POST", prop).then(data => {
      if (data.sucess) {
        this.loggedin = true;
        this.loggedinuserid = data;
        this.message = null;
      } else {
        this.message = data.data;
        this.loggedinuserid = null;
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
