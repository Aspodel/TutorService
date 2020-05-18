import React, { Component } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "./image/newrequest.json";

class CreateRequest extends Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    document.title = "Gia Sư | New Request";
  }

  pageUp = () => {
    this.setState({ page: this.state.page + 1 });
  };

  pageDown = () => {
    this.setState({ page: this.state.page - 1 });
  };

  newRequest = (event) => {
    event.preventDefault();
    var apiUrl = "https://localhost:44316/api/SubjectControllers/CreateRequest";

    axios.post(apiUrl, {
      Subject: {
        Name: document.getElementById("subject").value,
        Department: document.getElementById("department").value,
      },
      Price: document.getElementById("price").value,
      LearningAddress: document.getElementById("address").value,
      LearningDistrict: document.getElementById("district").value,
      LearningCity: document.getElementById("city").value,
      Description: document.getElementById("description").value,
      SchoolName: document.getElementById("school").value,
      SchoolAddress: "Lang Dai Hoc",
      SchoolDistrict: "Thu Duc",
      SchoolCity: "Sai Gon",
    });
  };

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="create-request">
        <div className="box">
          <div className="giasu">Gia Su</div>
          <div className="intro">
            {this.state.page === 1
              ? "Create new request. Let's go!"
              : "Description and Location"}
          </div>

          <div className="lottie">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>

          <form
            id="form1"
            className={this.state.page === 1 ? "form" : "form off"}
          >
            <div className="field">
              <input
                type="text"
                id="subject"
                placeholder="subject"
                spellCheck="false"
                required
              />
              <label onClick={() => document.getElementById("subject").focus()}>
                Subject
              </label>
            </div>

            <div className="field">
              <input
                type="text"
                id="department"
                placeholder="department"
                spellCheck="false"
                required
              />
              <label
                onClick={() => document.getElementById("department").focus()}
              >
                Department
              </label>
            </div>

            <div className="field">
              <input
                type="text"
                id="school"
                placeholder="school"
                spellCheck="false"
                required
              />
              <label onClick={() => document.getElementById("school").focus()}>
                School
              </label>
            </div>

            <div className="field">
              <input
                type="number"
                id="price"
                placeholder="price"
                spellCheck="false"
                required
              />
              <label onClick={() => document.getElementById("price").focus()}>
                Price
              </label>
            </div>
          </form>

          <form
            id="form2"
            className={this.state.page === 2 ? "form" : "form off"}
          >
            <div className="field">
              <input
                type="text"
                id="description"
                placeholder="Description"
                spellCheck="false"
                required
              />
              <label
                onClick={() => document.getElementById("description").focus()}
              >
                Description
              </label>
            </div>
            <div className="field">
              <input
                type="text"
                id="address"
                placeholder="Address"
                spellCheck="false"
                required
              />
              <label onClick={() => document.getElementById("address").focus()}>
                Address
              </label>
            </div>
            <div className="field">
              <input
                type="text"
                id="district"
                placeholder="district"
                spellCheck="false"
                required
              />
              <label
                onClick={() => document.getElementById("district").focus()}
              >
                District
              </label>
            </div>
            <div className="field">
              <input
                type="text"
                id="city"
                placeholder="city"
                spellCheck="false"
                required
              />
              <label onClick={() => document.getElementById("city").focus()}>
                City
              </label>
            </div>
          </form>

          <div className="option">
            {this.state.page === 1 ? (
              <button id="back">
                <a href="/ui">Cancel</a>
              </button>
            ) : (
              <button id="back" onClick={this.pageDown}>
                Back
              </button>
            )}

            {this.state.page === 1 /* || this.state.page === 2 */ ? (
              <button onClick={this.pageUp} id="next">
                Next
              </button>
            ) : (
              <button onClick={this.newRequest} id="next">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRequest;
