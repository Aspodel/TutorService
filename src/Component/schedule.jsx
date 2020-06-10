import React, { Component } from "react";

class Schedule extends Component {
  state = {
    define_weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  componentDidMount = () => {
    // ------------Add value to array to render hours----------------

    // ---------------------------------------------------------------

    var time_start = new Date("May 24, 2020 6:25:00");
    var time_end = new Date("May 24, 2020 11:30:00");
    var midpoint = new Date((time_start.getTime() + time_end.getTime()) / 2);
    console.log(midpoint);

    var m = ((((midpoint.getMinutes() + 7.5) / 15) | 0) * 15) % 60;
    var h =
      (((midpoint.getMinutes() / 105 + 0.5) | 0) + midpoint.getHours()) % 24;
    console.log(m);
    console.log(h);
  };

  /* createHours = () => {
    var t = 0;
    for (var i = 0; i <= 17; i++) {
      t = 15.5 + i * 5.5;
      console.log(i);
      return (
        <div className="break" style={{ top: t + "%" }}>
          {i + 6}
        </div>
      );
    }
  }; */

  // renderTimeline = (timeline) => {
  //   console.log("hello");
  //   return timeline.map((timeline) => <div className="break">{timeline}</div>);
  // };

  render() {
    return (
      <div className="schedule">
        <div className="table">
          {/* <div className="header"> */}
          <span>Time</span>
          {this.state.define_weekdays.map((weekdays) => (
            <React.Fragment key={weekdays}>
              <span>{weekdays}</span>
            </React.Fragment>
          ))}
          {/* </div> */}
          <span>Hours</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <span className="break">hello</span>
        </div>

        {/* <div className="break"></div> */}

        {/* <span className="r2">hours</span>
        <span className="t2"></span>
        <span className="t3"></span>
        <span className="t4"></span>
        <span className="t5"></span>
        <span className="t6"></span>
        <span className="t7"></span>
        <span className="tcn"></span> */}
      </div>
    );
  }
}

export default Schedule;
