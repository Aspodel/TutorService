import React, { Component } from "react";
import axios from "axios";
// import { withRouter } from "react-router-dom";

import Lottie from "react-lottie";
import animationData from "../image/animation.json";

class Register extends Component {
  state = {
    page: 1,
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
    
  };

  async componentDidMount() {
    document.title = "Gia Sư | Register";

    const [firstResponse, secondResponse] = await Promise.all([
      axios.get("/api/VietNamLocation/CitiesList"),
      axios.get(``)
    ]);
  
    // Make third request using responses from the first two
    const thirdResponse = await axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:' + firstResponse.data.results.place_id + '&destination=place_id:' + secondResponse.data.results.place_id + '&key=' + 'API-KEY-HIDDEN');
  
    // Update state once with all 3 responses
    this.setState({
      CityList: firstResponse.data,
      DistrictList: secondResponse.data,
      SchoolList: thirdResponse.data,
    });
  }

  pageUp = () => {
    this.setState({ page: this.state.page + 1 });
    document.getElementById("next").disabled = true;
    setTimeout('document.getElementById("next").disabled=false;', 700);

    var form1 = document.querySelector("#form1");
    var form2 = document.querySelector("#form2");

    if (this.state.page === 1) {
      if (
        document.getElementById("first-name").value === "" ||
        document.getElementById("last-name").value === "" ||
        document.getElementById("email").value === "" ||
        document.getElementById("password").value === "" ||
        document.getElementById("confirm-password").value === "" ||
        document.getElementById("username").value === ""
      ) {
        alert("Please fill out the form");
      } else if (
        document.getElementById("password").value !==
        document.getElementById("confirm-password").value
      ) {
        alert("Confirm password not correct");
      } else if (form1.checkValidity() === false) {
        alert("Your information not valid");
      } else {
        this.setState({ page: this.state.page + 1 });
      }
    } else if (this.state.page === 2) {
      if (
        document.getElementById("phonenumber").value === "" ||
        document.getElementById("month").value === "" ||
        document.getElementById("day").value === "" ||
        document.getElementById("year").value === "" ||
        document.getElementsByName("gender").value === null ||
        document.getElementsByName("role").value === null
      ) {
        alert("Please fill out the form");
      } else if (form2.checkValidity() === false) {
        alert("Your information not valid");
      } else {
        this.setState({ page: this.state.page + 1 });
      }
    }
  };

  pageDown = () => {
    this.setState({ page: this.state.page - 1 });
    document.getElementById("back").disabled = true;
    setTimeout('document.getElementById("back").disabled=false;', 700);
  };

  register = (event) => {
    event.preventDefault();
    var apiUrl = "https://localhost:44316/api/LoginRegister/";

    var check1 = document.getElementsByName("gender");
    var gender = "";
    for (var i = 0; i < check1.length; i++) {
      if (check1[i].checked) {
        gender = check1[i].value;
        break;
      }
    }

    var check = document.getElementsByName("role");
    var role = "";
    for (var j = 0; j < check.length; j++) {
      if (check[j].checked) {
        role = check[j].value;
        break;
      }
    }

    var age = "";
    const today = new Date();
    const dOB = Date.parse(
      document.getElementById("day").value +
        document.getElementById("month").value +
        document.getElementById("year").value
    );
    const dateOfBirth = new Date(dOB);
    age = today.getFullYear() - dateOfBirth.getFullYear();
    var m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    /* console.log(age);
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("phonenumber").value);
    console.log(document.getElementById("email").value);
    console.log(gender);
    console.log(role);
    console.log(age);
    console.log(document.getElementById("first-name").value);
    console.log(document.getElementById("last-name").value);
    console.log(document.getElementById("password").value);
    console.log(document.getElementById("address").value);
    console.log(document.getElementById("city").value);
    console.log(document.getElementById("district").value);
    console.log(document.getElementById("school").value); */

    // Check valid for form 3

    if (this.state.page === 3) {
      if (
        document.getElementById("school").value === "" ||
        document.getElementById("address").value === "" ||
        document.getElementById("district").value === "" ||
        document.getElementById("city").value === ""
      ) {
        alert("Please fill out the form");
      } else {
        axios
          .post(apiUrl + "Register", {
            Username: document.getElementById("username").value,
            PhoneNumber: document.getElementById("phonenumber").value,
            Email: document.getElementById("email").value,
            DayOfBirth: dateOfBirth,
            Gender: gender,
            Role: role,
            Age: age,
            FirstName: document.getElementById("first-name").value,
            LastName: document.getElementById("last-name").value,
            Pass: document.getElementById("password").value,
            Address: document.getElementById("address").value,
            City: document.getElementById("city").value,
            District: document.getElementById("district").value,
            SchoolName: "",
            SchoolID: "",
            SchoolCity: "",
            SchoolDistrict: "",
            SchoolAddress: "",
            StudyGroup: "",
            StudyField: ""
          })
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              alert("Successful! Welcome to Gia Su");
              this.props.history.push({
                pathname: "/ui",
                state: { name: document.getElementById("username").value },
              });
            }
          });
      }
    } else {
      alert("Have an unexpected error. Please reload page");
    }
  };

  checkConfirm = () => {
    if (
      document.getElementById("password").value !==
        document.getElementById("confirm-password").value &&
      document.getElementById("confirm-password").value !== ""
    ) {
      document.getElementById("confirm-password").style.borderColor =
        "hsl(0, 76%, 50%)";
    } else {
      document.getElementById("confirm-password").style.borderColor = "#818a89";
    }
  };

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="register">
        <div className="box">
          {/* <div id="heyzo"></div> */}
          <div className="giasu">Gia Su</div>
          <div className="intro">
            {this.state.page === 1
              ? "Create your Gia Su Account"
              : document.getElementById("first-name").value +
                " " +
                document.getElementById("last-name").value +
                ", welcome to Gia Su"}
          </div>

          <div className="lottie">
            <Lottie options={defaultOptions} height={350} width={280} />
          </div>

          <form
            id="form1"
            className={this.state.page === 1 ? "form" : "form off"}
          >
            <div className="div2">
              <div className="field">
                <input
                  type="text"
                  id="first-name"
                  placeholder="First name"
                  spellCheck="false"
                  required
                />
                <label
                  onClick={() => document.getElementById("first-name").focus()}
                >
                  First name
                </label>
              </div>

              <div className="field">
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                  spellCheck="false"
                  required
                />
                <label
                  onClick={() => document.getElementById("last-name").focus()}
                >
                  Last name
                </label>
              </div>
            </div>

            <div className="field">
              <input
                type="email"
                id="email"
                placeholder="Email"
                spellCheck="false"
                required
              />

              <label onClick={() => document.getElementById("email").focus()}>
                Email
              </label>
            </div>

            <div className="div2">
              <div className="field">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  spellCheck="false"
                  autoComplete="off"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <label
                  onClick={() => document.getElementById("password").focus()}
                >
                  Password
                </label>
              </div>

              <div className="field">
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  spellCheck="false"
                  autoComplete="off"
                  required
                  onChange={this.checkConfirm}
                />
                <label
                  onClick={() =>
                    document.getElementById("confirm-password").focus()
                  }
                >
                  Confirm password
                </label>
              </div>
            </div>

            <div className="field">
              <input
                type="text"
                id="username"
                placeholder="Username"
                spellCheck="false"
                required
              />
              <label
                onClick={() => document.getElementById("username").focus()}
              >
                Username
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
                id="phonenumber"
                placeholder="Phone number"
                spellCheck="false"
              />
              <label
                onClick={() => document.getElementById("phonenumber").focus()}
              >
                Phone number
              </label>
            </div>

            <div className="div3">
              <div className="field">
                <input
                  type="text"
                  id="month"
                  placeholder="Month"
                  spellCheck="false"
                  list="data"
                />
                <datalist id="data">
                  <select >
                    {this.state.define_months.map((months) => (
                      <option key={months} value={months} />
                    ))}
                  </select>
                </datalist>

                <label onClick={() => document.getElementById("month").focus()}>
                  Month
                </label>
              </div>

              <div className="field">
                <input
                  type="text"
                  id="day"
                  placeholder="Day"
                  spellCheck="false"
                />
                <label onClick={() => document.getElementById("day").focus()}>
                  Day
                </label>
              </div>
              <div className="field">
                <input
                  type="text"
                  id="year"
                  placeholder="Year"
                  spellCheck="false"
                />
                <label onClick={() => document.getElementById("year").focus()}>
                  Year
                </label>
              </div>
            </div>
            <div
              className="radio"
              onChange={() =>
                (document.getElementById("gender").style.color = "#00c2e7")
              }
            >
              <div id="gender" className="heading">
                Gender:
              </div>
              <div className="radio-div">
                <input
                  required
                  type="radio"
                  name="gender"
                  id="male"
                  value="true"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-div">
                <input type="radio" name="gender" id="female" value="false" />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div
              className="radio"
              onChange={() =>
                (document.getElementById("role").style.color = "#00c2e7")
              }
            >
              <div id="role" className="heading">
                Role:
              </div>
              <div className="radio-div">
                <input type="radio" name="role" id="student" value="Student" />
                <label htmlFor="student">Student</label>
              </div>
              <div className="radio-div">
                <input type="radio" name="role" id="tutor" value="Tutor" />
                <label htmlFor="tutor">Tutor</label>
              </div>
            </div>
          </form>

          <form className={this.state.page === 3 ? "form" : "form off"}>
            <div className="field">
              <input
                type="text"
                id="school"
                placeholder="School"
                spellCheck="false"
              />
              <label onClick={() => document.getElementById("school").focus()}>
                School
              </label>
            </div>

            <div className="field">
              <input
                type="text"
                id="address"
                placeholder="Address"
                spellCheck="false"
              />
              <label onClick={() => document.getElementById("address").focus()}>
                Address
              </label>
            </div>

            <div className="field">
              <input
                type="text"
                id="district"
                placeholder="District"
                spellCheck="false"
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
                placeholder="City"
                spellCheck="false"
              />
              <label onClick={() => document.getElementById("city").focus()}>
                City
              </label>
            </div>
          </form>

          <div className="option">
            {this.state.page === 1 ? (
              <button id="back">
                <a href="/">Sign in instead</a>
              </button>
            ) : (
              <button onClick={this.pageDown} id="back">
                Back
              </button>
            )}

            {this.state.page === 1 || this.state.page === 2 ? (
              <button onClick={this.pageUp} id="next">
                Next
              </button>
            ) : (
              <button onClick={this.register} id="next">
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default /* withRouter(Register) */ Register;
