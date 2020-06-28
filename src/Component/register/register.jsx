import React, { Component } from "react";
import axios from "axios";
// import { withRouter } from "react-router-dom";

import Lottie from "react-lottie";
import animationData from "../image/animation.json";
// const { BlobServiceClient } = require("@azure/storage-blob");

// const blobServiceClient = new BlobServiceClient(
//   "DefaultEndpointsProtocol=https;AccountName=giasuprofileimagecloud;AccountKey=YPVAclmUAv1jfDRSVBoSumWlyFDNNdrcUOKN9cqSvcPbsG/YS85m5Jtr+1pvaLUCB8i6Cxb7bgoXrLn+p6Anrg==;EndpointSuffix=core.windows.net"
// );
// const containerName = "profileimagecontainer" + new Date().getTime();
// const containerClient = blobServiceClient.getContainerClient(containerName);

class Register extends Component {
  // state = {
  //   // file: null,
  //   page: 1,
  //   define_months: [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ],
  // };
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      imgSrc: null,
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
      cityList: [],
      districtList: [],
      schoolList: [],
      majorGroupList: [],
      majorList: [],
    };
    this.GetImage = this.GetImage.bind(this);
  }

  async componentDidMount() {
    document.title = "Gia Sư | Register";
    console.log("hello");
    await axios.get("/api/VietNamLocation/CitiesList").then((response) => {
      console.log(response.data);
      this.setState({ cityList: response.data });
    });

    await axios.get("/api/SubjectControllers/StudyGroupList").then((result) => {
      console.log(result.data);
      this.setState({ majorGroupList: result.data });
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
        // alert("Please fill out the form");
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
        // alert("Please fill out the form");
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
    // var ImageUrl = this.UploadFiles();

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

    var ScName = document.getElementById("school").value;
    console.log(ScName);
    var ScID = "";
    var ScCity = "";
    var ScDistrict = "";
    var schoolList = this.state.schoolList;
    console.log(schoolList);
    for (var i = 0; i <= schoolList.length; i++) {
      if (schoolList[i].schoolName === ScName) {
        ScID = schoolList[i].SchoolID;
        ScCity = schoolList[i].SchoolCity;
        ScDistrict = schoolList[i].SchoolDistrict;
        break;
      } else {
        continue;
      }
    }

    // Check valid for form 3

    if (this.state.page === 3) {
      if (
        document.getElementById("school").value === "" ||
        document.getElementById("address").value === "" ||
        document.getElementById("district").value === "" ||
        document.getElementById("city").value === ""
      ) {
        // alert("Please fill out the form");
      } else {
        axios
          .post(apiUrl + "Register", {
            Username: document.getElementById("username").value,
            PhoneNumber: document.getElementById("phonenumber").value,
            Email: document.getElementById("email").value,
            ProfileImageUrl: "ImageUrl",
            DayOfBirth: dateOfBirth,
            Gender: gender,
            Role: role,
            Age: age,
            FirstName: document.getElementById("first-name").value,
            LastName: document.getElementById("last-name").value,
            Pass: document.getElementById("password").value,
            // Address: document.getElementById("address").value,
            // City: document.getElementById("city").value,
            // District: document.getElementById("district").value,
            // SchoolName: "",
            SchoolID: ScID,
            SchoolCity: ScCity,
            SchoolDistrict: ScDistrict,
            // SchoolAddress: "",
            StudyGroup: document.getElementById("majorGroup").value,
            StudyField: document.getElementById("major").value,
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
      // alert("Have an unexpected error. Please reload page");
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

  GetImage(event) {
    console.log("Where is my hope?");
    this.setState({
      imgSrc: URL.createObjectURL(event.target.files[0]),
    });
    console.log(this.state.imgSrc);
  }

  // GetDistrict = () => {
  //   var id = document.getElementById('ListCity').value;
  //   console.log(id);
  //   axios.get("/api/VietNamLocation/DistrictsList/" + id).then((response) => {
  //     console.log(response.data);
  //     this.setState({ districtList: response.data });
  //     console.log(this.state.districtList);
  //   });
  // };

  GetDistrict = () => {
    var city = document.getElementById("schoolCity").value;
    console.log(city);
    var id = "";
    var cityList = this.state.cityList;
    console.log(cityList);
    for (var i = 0; i <= cityList.length; i++) {
      if (cityList[i].cityName === city) {
        id = cityList[i].cityID;
        break;
      } else {
        continue;
      }
    }
    console.log(id);
    axios.get("/api/VietNamLocation/DistrictsList/" + id).then((response) => {
      console.log(response.data);
      this.setState({ districtList: response.data });
    });
  };

  GetSchool = () => {
    var district = document.getElementById("schoolDistrict").value;
    var id = "";
    var districtList = this.state.districtList;
    console.log(districtList);
    for (var i = 0; i <= districtList.length; i++) {
      if (districtList[i].districtName === district) {
        id = districtList[i].districtID;
        break;
      } else {
        continue;
      }
    }
    console.log(id);
    axios.get("/api/SubjectControllers/SchoolList/" + id).then((response) => {
      console.log(response.data);
      this.setState({ schoolList: response.data });
    });
  };

  // UploadFiles = async () => {
  //   console.log("Uploading !!!");
  //   const fileInput = document.getElementById("InputImage");
  //   // var blob = "";
  //   var account = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
  //   var cloudBlobClient = account.CreateCloudBlobClient();
  //   var container = cloudBlobClient.GetContainerReference("container-name");
  //   // var blob = container.GetBlockBlobReference("image.png");
  //   try {
  //     const promises = [];
  //     for (const file of fileInput.files) {
  //       const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  //       promises.push(blockBlobClient.uploadBrowserData(file));
  //       blob = container.GetBlockBlobReference("image.png");
  //     }
  //     var blobUrl = blob.Uri.AbsoluteUri;
  //     await Promise.all(promises);
  //     console.log("DONE !!!");
  //   } catch (error) {
  //     console.log("WTF !!! Have a big ERROR!!!");
  //   }
  //   return blobUrl;
  // };

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

            <div className="getImage">
              <input type="file" id="InputImage" onChange={this.GetImage} />
              <img className="ProImage" src={this.state.imgSrc} />
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
                  {this.state.define_months.map((months) => (
                    <option key={months} value={months} />
                  ))}
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
                id="schoolCity"
                placeholder="School's City"
                spellCheck="false"
                list="ListCity"
                onChange={this.GetDistrict}
              />
              <label
                onClick={() => document.getElementById("schoolCity").focus()}
              >
                School's City
              </label>
              <datalist id="ListCity">
                {this.state.cityList.map((city) => (
                  <option id={city.cityID}>{city.cityName}</option>
                ))}
              </datalist>
            </div>

            <div className="field">
              <input
                type="text"
                id="schoolDistrict"
                placeholder="Address"
                spellCheck="false"
                list="ListDistrict"
                onChange={this.GetSchool}
              />
              <label
                onClick={() =>
                  document.getElementById("schoolDistrict").focus()
                }
              >
                School's District
              </label>
              <datalist id="ListDistrict">
                {this.state.districtList.map((district) => (
                  <option id={district.districtID}>
                    {district.districtName}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="field">
              <input
                type="text"
                id="school"
                placeholder="school"
                spellCheck="false"
                list="ListSchool"
              />
              <label onClick={() => document.getElementById("School").focus()}>
                School
              </label>
              <datalist id="ListSchool">
                {this.state.schoolList.map((school) => (
                  <option id={school.schoolID}>{school.schoolName}</option>
                ))}
              </datalist>
            </div>

            <div className="field">
              <input
                type="text"
                id="majorGroup"
                placeholder="Major Group"
                spellCheck="false"
                list="ListMajorGroup"
              />
              <label
                onClick={() => document.getElementById("majorGroup").focus()}
              >
                Major Group
              </label>
              <datalist id="ListMajorGroup">
                {this.state.majorGroupList.map((majorGroup) => (
                  <option id={majorGroup.studyGroupID}>
                    {majorGroup.studyGroupName}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="field">
              <input
                type="text"
                id="major"
                placeholder="Major"
                spellCheck="false"
              />
              <label onClick={() => document.getElementById("major").focus()}>
                Major
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
