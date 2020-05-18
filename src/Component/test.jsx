import React, { Component } from "react";

class Test extends Component {
  state = {};
  render() {
    return (
      <div className="test">
        <div className="box">
          {/* <div className="logo">Logo</div> */}
          <div className="giasu">Gia Sư</div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="field">
              <input
                id="EmailBox"
                type="email"
                className="email"
                placeholder="Email"
                spellCheck="false"
                autoComplete="off"
                name="Email"
                required
                pattern="\S+"
              />
              <label>Email</label>
            </div>

            <div className="field">
              <input
                id="PasswordBox"
                type="password"
                className="password"
                placeholder="Password"
                // onFocus={(e) => (e.target.placeholder = "")}
                // onBlur={(e) => (e.target.placeholder = "Password")}
                autoComplete="off"
                name="Pass"
                required
              />
              <label>Password</label>
            </div>

            {/* <input className="submit" type="submit" value="Login" /> */}

            <div>{this.state.noti}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Test;
