import React from "react";
import moment from "moment";

class Countdown extends React.Component {
  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  state = {
    endDate: null,
    countdownTime: {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0
    }
  };

  handleChange = e => {
    this.setState({ endDate: e.target.value }, () => {
      if (
        this.state.endDate &&
        moment(new Date(this.state.endDate)).isAfter(moment(), "day")
      ) {
        this.countdown = setInterval(() => this.calculateCountDownTime(), 1000);
      } else {
        alert("Please select a valid future date.");
        console.log("Please select a valid future date.");
      }
      // this.countdown = setInterval(() => this.startTimer(), 1000);
    });
  };

  calculateCountDownTime = () => {
    let endDate = this.state.endDate;
    let compareTo = moment(new Date(endDate));
    let now = moment();

    // calculate difference in dates
    let difference = moment.duration(compareTo.diff(now));
    let totalSeconds = difference.asSeconds();

    let remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));

    let divisorForHours = Math.floor(totalSeconds % (24 * 60 * 60));
    let remainingHours = Math.floor(divisorForHours / (60 * 60));

    let divisorForMins = Math.floor(totalSeconds % (60 * 60));
    let remainingMinutes = Math.floor(divisorForMins / 60);

    let divisorForSeconds = divisorForMins % 60;
    let remainingSeconds = Math.ceil(divisorForSeconds);

    this.setState({
      countdownTime: {
        days: remainingDays,
        hours: remainingHours,
        mins: remainingMinutes,
        secs: remainingSeconds
      }
    });
  };

  render() {
    return (
      <div className="countdownContainer">
        <h3>Select Your Future Date to Start the CountDown !!!</h3>
        <input type="date" onChange={this.handleChange} />
        {this.state.countdownTime.secs > 0 && (
          <h4>
            Time Remaining : {this.state.countdownTime.days} Days{" "}
            {this.state.countdownTime.hours} Hours{" "}
            {this.state.countdownTime.mins} Minutes{" "}
            {this.state.countdownTime.secs} Seconds
          </h4>
        )}
      </div>
    );
  }
}

export default Countdown;
