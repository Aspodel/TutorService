import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    name: "",
    noti: "",
  };

  componentDidMount() {
    document.title = "Gia Sư | Login";
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    var apiUrl = "https://localhost:44316/api/LoginRegister/";

    try {
      await axios
        .post(apiUrl + "Login", {
          Email: document.getElementById("email").value,
          Pass: document.getElementById("password").value,
        })
        .then((response) => {
          // console.log("api out" + this.state.noti);
          console.log(response.statusText);
          console.log(response.status);
          console.log(response.data);
          if (response.status === 200) {
            this.props.history.push({
              pathname: "/ui",
              // search: "?query=abc",
              state: { token: response.data.token },
            });
          }
        });
    } catch (err) {
      console.log(err);
      console.log("hey yo");
      this.setState({ noti: "Incorrect username or password" });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="box">
          <div className="logo">Logo</div>
          <div className="giasu">Gia Sư</div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="field">
              <input
                id="email"
                type="email"
                placeholder="Email"
                spellCheck="false"
                autoComplete="off"
                name="Email"
                required
              />
              <label onClick={() => document.getElementById("email").focus()}>
                Email
              </label>
            </div>

            <div className="field">
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="Pass"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
              <label
                onClick={() => document.getElementById("password").focus()}
              >
                Password
              </label>
            </div>

            <div className="noti">
              <span>{this.state.noti}</span>
            </div>

            <input className="submit" type="submit" value="Login" />
          </form>

          <div className="navi-register">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
