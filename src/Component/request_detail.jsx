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
    subject: [],
    owner: [],
    isLoading: true,
  };

  componentDidMount() {
    document.title = "Gia Sư | Request Detail";
    const { location } = this.props;
    const apiUrl =
      "https://localhost:44316/api/SubjectControllers/RequestDetail/";

    axios
      .get(apiUrl + location.state.id, {
        headers: { Authorization: `Bearer ${location.state.token}` },
      })
      .then((response) => {
        this.setState({
          detail: response.data,
          subject: response.data.subject,
          owner: response.data.owner,
          isLoading: false,
        });

        console.log("api  " + this.state.detail.price);
        // console.log(response.data.subject);
        // console.log(this.state.detail.subject.name);
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
    var { detail, subject, owner, isLoading } = this.state;
    console.log("heiyo " + detail.price);
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="request_detail">
        <Navbar />

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
              <span>{subject.name}</span>
              <span>Department:</span>
              <span>IT</span>
              <span>Semester:</span>
              <span>2019 - 2020</span>
              <span>Lecturer:</span>
              <span>Not yet supported</span>
            </div>

            <div className="school-infor">
              <div className="header">School Information</div>
              <span>Name:</span>
              <span>Not yet supported</span>
              <span>Address:</span>
              <span>Not yet supported</span>
              <span>District:</span>
              <span>Not yet supported</span>
              <span>City:</span>
              <span>Not yet supported</span>
            </div>
          </div>

          <div className="center">
            <button onClick={this.backUI}>
              <FontAwesomeIcon className="icon" icon={faChevronLeft} />
            </button>

            <div className="request">
              <img
                className="profile"
                src={owner.profileImageUrl}
                alt="profile"
              />

              <div className="header">{"Request of " + owner.userName}</div>

              <span>{detail.description}</span>

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
              <span>{detail.learningDistrict}</span>
              <span>City:</span>
              <span>{detail.learningCity}</span>
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
