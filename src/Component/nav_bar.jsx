import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import boy from "./image/boy.png";
import Menu from "./menu";

class NavBar extends Component {
  state = { isClicked: false };

  callBack = (childData) => {
    this.setState({ isClicked: childData });
  };

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
            <div className="Giasu">Gia Sư</div>
          )}

          <div className="user">
            <div className="username">
              {/* {location.state.name} */}
              Hihi Haha
            </div>
            <img className="profile" src={boy} alt="profile" />
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
