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
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faWindowClose,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

class UI extends Component {
  state = {
    items: [],
    isLoading: true,
    numberOfRequest: 0,
    totalPage: 0,
    current_page: 0,
    per_page: 18,
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
    axios.get("/api/SubjectControllers/NumberOfRecord").then((response) => {
      // console.log(response.data);
      this.setState({ numberOfRequest: response.data });
      var page = this.CalculatePage(response.data);
      // console.log(page);
      this.setState({ totalPage: page });
    });
    this.GetPage(0);

    // this.ActiveClass();

    // var numberOfRequest = 0;
    // axios.get("/api/SubjectControllers/NumberOfRecord").then((result) => {
    //   console.log(result.data);
    //   numberOfRequest = result.data;
    //   console.log(numberOfRequest);
    // });
    // var page = Math.ceil(numberOfRequest / 18);
    // console.log(page);

    //--------------------------------------------------------------------------------------------------------------
    // const url = "/api/SubjectControllers/RequestPage/0";
    // const response = await fetch(url);
    // const data = await response.json();

    // var time_diff = 0;
    // var seconds = 0;
    // var minutes = 0;
    // var hours = 0;
    // var days = 0;
    // var years = 0;

    // for (var i = 0; i < data.length; i++) {
    //   var posted_day = new Date(data[i].date);

    //   time_diff = this.state.today - posted_day;

    //   seconds = Math.round(time_diff / 1000);
    //   minutes = Math.round(seconds / 60);
    //   hours = Math.round(seconds / 3660);
    //   days = Math.round(seconds / 86400);
    //   years = Math.round(seconds / 31553280);

    //   /*-----------------------------------Format Datetime----------------------------------*/

    //   if (years < 1) {
    //     if (days < 1) {
    //       if (hours < 1) {
    //         if (minutes < 1) {
    //           data[i].date = "Just now";
    //         } else if (minutes >= 1) {
    //           if (minutes > 1) {
    //             data[i].date = minutes + " minutes ago";
    //           } else {
    //             data[i].date = minutes + " minute ago";
    //           }
    //         }
    //       } else if (hours >= 1) {
    //         if (hours > 1) {
    //           data[i].date = hours + " hrs ago";
    //         } else {
    //           data[i].date = hours + " hr ago";
    //         }
    //       }
    //     } else if (days >= 1) {
    //       if (days > 1) {
    //         data[i].date =
    //           this.state.define_months[posted_day.getMonth() - 1] +
    //           " " +
    //           posted_day.getDay();
    //       } else {
    //         data[i].date =
    //           "Yesterday at " +
    //           posted_day.getHours() +
    //           ":" +
    //           posted_day.getMinutes();
    //       }
    //     }
    //   } else if (years >= 1) {
    //     data[i].date =
    //       this.state.define_months[posted_day.getMonth() - 1] +
    //       " " +
    //       posted_day.getDay() +
    //       ", " +
    //       posted_day.getFullYear();
    //   }
    // }
    // /* ---------------------------------------------------------------------------------- */

    // this.setState({ requests: data, isLoading: false });
  }

  getDetail = (id, firstname, lastname, profileUrlImage) => {
    const { location } = this.props;
    this.props.history.push({
      pathname: "/detailexplore",
      state: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        profileUrlImage: profileUrlImage,
        // token: location.state.token,
      },
    });
  };

  CalculatePage = (requests) => {
    var page = Math.ceil(requests / 18);
    // console.log(page);
    return page;
  };

  GetPage = async (pageNumber) => {
    await axios
      .get("/api/SubjectControllers/RequestPage/" + pageNumber)
      .then((response) => {
        var data = response.data;
        var time_diff = 0;
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var days = 0;
        var years = 0;

        for (var i = 0; i < data.length; i++) {
          var posted_day = new Date(data[i].date);

          time_diff = this.state.today - posted_day;

          seconds = Math.round(time_diff / 1000);
          minutes = Math.round(seconds / 60);
          hours = Math.round(seconds / 3660);
          days = Math.round(seconds / 86400);
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
        this.setState({
          requests: data,
          isLoading: false,
          current_page: pageNumber,
        });
      });
  };

  checkValidUp = () => {
    if (this.state.current_page + 1 < this.state.totalPage) {
      this.GetPage(this.state.current_page + 1);
    }
  };

  Download() {}

  render() {
    // const { match } = this.props;
    const { location } = this.props;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.totalPage !== null) {
      for (
        let i = 0;
        i < Math.ceil(this.state.numberOfRequest / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
        // console.log(this.state.numberOfRequest);
      }

      renderPageNumbers = pageNumbers.map((number) => {
        let classes = this.state.current_page === number ? "active" : "";

        return (
          <span
            key={number}
            className={classes}
            onClick={() => this.GetPage(number)}
          >
            {number + 1}
          </span>
        );
      });
    }

    return (
      <div className="UI">
        {/* <Navbar search={this.state.search} token={location.state.token} /> */}

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
                    onClick={() =>
                      this.getDetail(
                        request.requestID,
                        request.firstname,
                        request.lastname,
                        request.profileUrlImage
                      )
                    }
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
            <div className="bottom">
              <div className="pagination">
                <span
                  className="icon"
                  onClick={() => this.GetPage(this.state.current_page - 1)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                {/* <span onClick={() => this.GetPage(0)}>1</span>
                <span onClick={() => this.GetPage(1)}>2</span>
                <span onClick={() => this.GetPage(2)}>3</span>
                <span onClick={() => this.GetPage(2)}>4</span> */}
                {renderPageNumbers}

                <span
                  className="icon"
                  // onClick={() => this.GetPage(this.state.current_page + 1)}
                  onClick={() => this.checkValidUp()}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
            </div>
          </div>

          <div className="my-requirement">
            <div className="header">Other Version</div>
            <div className="requirement-card">
              <a href="https://github.com/Strypper/GiaSuUWP" target="_blank">
                <div className="new-card" onClick={this.Download()}>
                  <FontAwesomeIcon className="icon" icon={faWindows} />
                  <span>App version for Win 10</span>
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
