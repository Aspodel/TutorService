import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Logo from "../Component/image/logo.png";

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
    var apiUrl = "/api/LoginRegister/Login";

    try {
      await axios
        .post(apiUrl, {
          Email: document.getElementById("email").value,
          Pass: document.getElementById("password").value,
        })
        .then((response) => {
          // console.log(response.statusText);
          // console.log(response.status);
          // console.log(response.data);
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
      console.log("Have an error!");
      this.setState({ noti: "Incorrect username or password" });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="box">
          <img src={Logo} alt="" className="logo"></img>
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
              <label
                onClick={() => document.getElementById("password").focus()}
              >
                Password
              </label>
            </div>

            <div className="noti">{this.state.noti}</div>

            <input className="submit" type="submit" value="Login" />
          </form>

          <div className="navi-register">
            Don't have an account? <a href="/explore">Explore</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
