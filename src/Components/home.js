import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class home extends Component {
  render() {
    return (
      <div>
        <Link to="/signup">SignUp</Link>
      </div>
    );
  }
}
