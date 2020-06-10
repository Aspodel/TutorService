import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
// import boy from "./image/boy.png";
import Menu from "./menu";
import axios from "axios";
import Logo from "../Component/image/logo.png"

class NavBar extends Component {
  state = { isClicked: false, data: []};

  componentDidMount() {
    axios
      .get("api/LoginRegister/GetUserInfo", {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((result) => {
        this.setState({ data: result.data });
        // console.log(result.data.userName);
        // console.log(this.state.name);
      });
  }

  callBack = (childData) => {
    this.setState({ isClicked: childData });
  };

  // logOut = (child) =>{
  //   this.setState({isLogin: child});
  // }

  render() {
    return (
      <React.Fragment>
        <Menu callBack={this.callBack} isClicked={this.state.isClicked}></Menu>
        <div id="navbar" className="navbar">
          <div
            onClick={() => this.setState({ isClicked: true })}
            className="menu"
          >
            <FontAwesomeIcon className="icon" icon={faBars} />
          </div>

          {this.props.search ? (
            <div className="search">
              <FontAwesomeIcon className="icon" icon={faSearch} />
              <input
                type="text"
                placeholder="Search subject here"
                spellCheck="false"
              />
            </div>
          ) : (
            <img src={Logo} alt="" className="Giasu"></img>
          )}

          <div className="user">
            <div className="username">
              {this.state.data.userName}
            </div>
            <img className="profile" src={this.state.data.profileImageUrl} alt="profile" />
            <div className="manage">
              <div>Notifications</div>
              <div>Profile</div>
              <div>Settings</div>
              <a href="/">
                <div className="logout">Log out </div>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
