import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPlus,
  faCalendarAlt,
  faTimes,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

class Menu extends Component {
  // state = {};

  componentDidMount() {
    const item = document.getElementsByClassName("item");
    for (var i = 0; i < item.length; i++) {
      if (item[i].href === window.location.href) {
        item[i].style.borderRight = "7px solid";
        item[i].style.borderImageSource =
          "linear-gradient(to bottom,#36d1dc, #00c2e7,#00b1ef, #0c9def,#5b86e5)";
        item[i].style.borderImageSlice = "1";
      }
    }
  }

  closeMenu = () => {
    this.props.callBack(false);
  };

  render() {
    // console.log(this.props.isClicked);
    return (
      <div className={this.props.isClicked ? "menu-bar" : "menu-bar menuoff"}>
        <div
          onClick={this.closeMenu}
          className={this.props.isClicked ? "cover" : "cover coveroff"}
        ></div>

        <div className={this.props.isClicked ? "content " : "content off"}>
          <div onClick={this.closeMenu} className="close">
            <FontAwesomeIcon className="icon" icon={faTimes} />
          </div>

          <a className="item" href="/ui">
            <FontAwesomeIcon className="icon" icon={faList} />
            <span>Subject Request</span>
          </a>

          <a className="item" href="/newrequest">
            <FontAwesomeIcon className="icon" icon={faPlus} />
            <span>Create Request</span>
          </a>

          <a className="item" href="/menu">
            <FontAwesomeIcon className="icon" icon={faCalendarAlt} />
            <span>Schedule</span>
          </a>

          <div className="under">
            <a className="item" href="/notyetsupported">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <span>Profile</span>
            </a>

            <a className="item" href="/notyetsupported">
              <FontAwesomeIcon className="icon" icon={faCog} />
              <span>Setting</span>
            </a>

            <p>&copy;2020 ToTechs. All rights reserved.</p>
          </div>
        </div>

        {/* <div
          onClick={this.closeMenu}
          className={this.props.isClicked ? "right" : "right rightoff"}
        ></div> */}
      </div>
    );
  }
}

export default Menu;
