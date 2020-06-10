import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import boy from "./image/boy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVideo,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./nav_bar";

class RequestDetail extends Component {
  state = {
    detail: [],
    isLoading: true,
  };

  componentDidMount() {
    document.title = "Gia Sư | Request Detail";
    const { location } = this.props;
    const apiUrl = "/api/SubjectControllers/RequestDetail/";

    axios
      .get(apiUrl + location.state.id, {
        headers: { Authorization: `Bearer ${location.state.token}` },
      })
      .then((response) => {
        this.setState({
          detail: response.data,
          isLoading: false,
        });
        // console.log(this.state.detail.price);
      });
  }

  backUI = () => {
    const { location } = this.props;
    this.props.history.push({
      pathname: "/ui",
      state: { token: location.state.token },
    });
  };

  formatPrice(price) {
    if (price !== null || typeof price !== "undefined") {
      var p = price.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return p;
  }

  render() {
    var { detail, isLoading } = this.state;
    const { location } = this.props;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="request_detail">
        <Navbar token={this.props.location.state.token} />

        <div className="body">
          <div className="left">
            <div className="payment">
              <div className="header">Payment</div>

              <div>
                <span>
                  <span className="price">
                    {/* {() => this.formatPrice(detail.price)} */}
                    {this.formatPrice(detail.price)}
                    {/* {detail.price} */}
                  </span>
                  VND/hr
                </span>
              </div>

              <div>Method: Cash</div>
            </div>

            <div className="subject-infor">
              <div className="header">Subject Information</div>
              <span>Subject:</span>
              <span>{detail.name}</span>
              <span>Department:</span>
              <span>{detail.studyFieldName}</span>
              <span>Group:</span>
              <span>{detail.studyGroupName}</span>
              <span>Lecturer:</span>
              <span>{detail.teacher}</span>
            </div>

            <div className="school-infor">
              <div className="header">School Information</div>
              <img className="logo" src={detail.schoolLogo} alt="" />
              <span>Name:</span>
              <span className="school-name">{detail.schoolName}</span>
              <span>Address:</span>
              <span>{detail.schoolAddress}</span>
              <span>District:</span>
              <span>{detail.schooldistrict}</span>
              <span>City:</span>
              <span>{detail.schoolcity}</span>
            </div>
          </div>

          <div className="center">
            <button onClick={this.backUI}>
              <FontAwesomeIcon className="icon" icon={faChevronLeft} />
            </button>

            <div className="request">
              <img
                className="profile"
                src={location.state.profileUrlImage}
                alt="profile"
              />

              <div className="header">
                {"Request of " +
                  location.state.firstname +
                  " " +
                  location.state.lastname}
              </div>

              <span className="description">{detail.description}</span>

              <div className="contact">
                <FontAwesomeIcon className="icon" icon={faPhone} />
                <FontAwesomeIcon className="icon" icon={faVideo} />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="location">
              <div className="header">Location</div>
              <span>Address:</span>
              <span>{detail.learningAddress}</span>
              <span>District:</span>
              <span>{detail.districtName}</span>
              <span>City:</span>
              <span>{detail.cityName}</span>
            </div>

            <div className="bid-list">
              <div className="header">Bid List</div>
              <span>1</span>
              <span>Best Tutor</span>
              {/* <span>20.000 VND</span> */}
              <span>2</span>
              <span>IAmtheBest</span>
              {/* <span>20.000 VND</span> */}
              <span>3</span>
              <span>Hihi Haha</span>
              {/* <span>20.000 VND</span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RequestDetail);
