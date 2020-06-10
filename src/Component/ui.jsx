import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   /* faSearch */ /* , faPhone, faVideo  */
// } from "@fortawesome/free-solid-svg-icons";
// import boy from "./image/boy.png";
// import oldman from "./image/oldman.png";
import Lottie from "react-lottie";
import animationData from "./image/loading.json";
import { withRouter } from "react-router-dom";
import Navbar from "./nav_bar";

class UI extends Component {
  state = {
    // name: this.props.match.params.name,
    isLoading: true,
    requests: [],
    search: true,
    define_months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    /*-------------------------------Get current time--------------------------------- */
    today: new Date(),
  };

  async componentDidMount() {
    document.title = "Gia Sư | Subject Request";
    const url = "/api/SubjectControllers/RequestPage/0";
    const response = await fetch(url);
    const data = await response.json();

    var time_diff = 0;
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var days = 0;
    // var weeks = 0;
    // var months = 0;
    var years = 0;

    for (var i = 0; i < data.length; i++) {
      var posted_day = new Date(data[i].date);
      // console.log(posted_day);

      time_diff = this.state.today - posted_day;
      // console.log(time_diff);

      seconds = Math.round(time_diff / 1000);
      minutes = Math.round(seconds / 60);
      hours = Math.round(seconds / 3660);
      days = Math.round(seconds / 86400);
      // weeks = Math.round(seconds / 604800);
      // months = Math.round(seconds / 2629440);
      years = Math.round(seconds / 31553280);

      /*-----------------------------------Format Datetime----------------------------------*/

      if (years < 1) {
        if (days < 1) {
          if (hours < 1) {
            if (minutes < 1) {
              data[i].date = "Just now";
            } else if (minutes >= 1) {
              if (minutes > 1) {
                data[i].date = minutes + " minutes ago";
              } else {
                data[i].date = minutes + " minute ago";
              }
            }
          } else if (hours >= 1) {
            if (hours > 1) {
              data[i].date = hours + " hrs ago";
            } else {
              data[i].date = hours + " hr ago";
            }
          }
        } else if (days >= 1) {
          if (days > 1) {
            data[i].date =
              this.state.define_months[posted_day.getMonth() - 1] +
              " " +
              posted_day.getDay();
          } else {
            data[i].date =
              "Yesterday at " +
              posted_day.getHours() +
              ":" +
              posted_day.getMinutes();
          }
        }
      } else if (years >= 1) {
        data[i].date =
          this.state.define_months[posted_day.getMonth() - 1] +
          " " +
          posted_day.getDay() +
          ", " +
          posted_day.getFullYear();
      }
    }
    /* ---------------------------------------------------------------------------------- */

    this.setState({ requests: data, isLoading: false });
    // console.log(this.state.requests.profileUrlImage);
  }

  getDetail = (id, firstname, lastname, profileUrlImage) => {
    const { location } = this.props;
    // console.log(profileUrlImage);
    this.props.history.push({
      pathname: "/requestdetail",
      state: { id: id, firstname: firstname, lastname: lastname, profileUrlImage: profileUrlImage, token: location.state.token },
    });
  };

  render() {
    // const { match } = this.props;
    const { location } = this.props;

    // if (this.state.isLoading) {
    //   return <div>Loading...</div>;
    // }

    // if (!this.state.requests.length) {
    //   return <div>Have an error</div>;
    // }
    
    // console.log(location.state.token);

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="UI">
        <Navbar search={this.state.search} token={location.state.token} />

        <div className="requirement-table">
          <div className="subject-requirement">
            <div className="header">Subject Requirements</div>
            {this.state.isLoading ? (
              <div className="lottie">
                <Lottie options={defaultOptions} height={200} width={200} />
              </div>
            ) : (
              <div className="requirement-card">
                {this.state.requests.map((request) => (
                  <div
                    className="card"
                    key={request.requestID}
                    onClick={() => this.getDetail(request.requestID, request.firstname, request.lastname, request.profileUrlImage)}
                  >
                    <div className="profile-img">
                      <img
                        className="profile"
                        src={request.profileUrlImage}
                        alt="profile"
                      />
                    </div>
                    <div className="date-submitted">{request.date}</div>
                    <div className="subject">{request.sub}</div>
                    <div className="school">{request.schoolName}</div>
                    <div className="username">
                      {request.firstname + " " + request.lastname}
                    </div>
                    <div className="contact">Click to see more</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="my-requirement">
            <div className="header">My Request</div>
            <div className="requirement-card">
              <a href="/newrequest">
                <div className="new-card">
                  <span>+</span>
                  Create new request
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UI);
