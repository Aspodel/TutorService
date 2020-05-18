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
    await axios
      .post(apiUrl + "Login", {
        Email: document.getElementById("email").value,
        Pass: document.getElementById("password").value,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ noti: "Successful" });
          // axios
          //   .get(apiUrl + "GetUserInfo", {
          //     headers: { Authorization: `Bearer ${response.data.token}` },
          //   })
          //   .then((result) => {
          //     this.setState({ name: result.data.userName });
          //     this.props.history.push(
          //       /* `/ui/${result.data.userName}` */ {
          //         pathname: "/ui",
          //         // search: "?query=abc",
          //         state: { name: result.data.userName },
          //       }
          //     );
          //   });
          this.props.history.push(
            /* `/ui/${result.data.userName}` */ {
              pathname: "/ui",
              // search: "?query=abc",
              state: { token: response.data.token },
            }
          );
        }
      });
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

            <input className="submit" type="submit" value="Login" />

            <div className="noti">{this.state.noti}</div>
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
