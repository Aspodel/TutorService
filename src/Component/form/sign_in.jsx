import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
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
        Email: document.getElementById("EmailBox").value,
        Pass: document.getElementById("PasswordBox").value,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ noti: "Successful" });
          axios
            .get(apiUrl + "GetUserInfo", {
              headers: { Authorization: `Bearer ${response.data.token}` },
            })
            .then((result) => {
              this.setState({ name: result.data.userName });
              this.props.history.push(
                /* `/ui/${result.data.userName}` */ {
                  pathname: "/ui",
                  // search: "?query=abc",
                  state: { name: result.data.userName },
                }
              );
            });
        }
      });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          id="EmailBox"
          type="email"
          className="account"
          placeholder="Email"
          spellCheck="false"
          autoComplete="off"
          name="Email"
        />

        <input
          id="PasswordBox"
          type="password"
          className="password"
          placeholder="Password"
          autoComplete="off"
          name="Pass"
        />

        <input className="submit" type="submit" value="Login" />

        <div>{this.state.noti}</div>
      </form>
    );
  }
}

export default withRouter(SignIn);
