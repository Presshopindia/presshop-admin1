import React, { useState, useEffect } from "react";
import moment from "moment";

const Timer = ({ deadline }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  function calculateTimeRemaining() {
    const currentTime = moment();
    const deadlineTime = moment(deadline).startOf("second");
    const duration = moment.duration(deadlineTime.diff(currentTime));

    if (duration.asSeconds() <= 0) {
      return "Expired";
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (days === 0) {
      return formatTime(hours, minutes, seconds);
    }

    return formatTimeWithDays(days, hours, minutes, seconds);
  }

  function formatTime(hours, minutes, seconds) {
    return `${padZero(hours)}h:${padZero(minutes)}m:${padZero(seconds)}s`;
  }

  function formatTimeWithDays(days, hours, minutes, seconds) {
    return `${days} days ${formatTime(hours, minutes, seconds)}`;
  }

  function padZero(value) {
    return value.toString().padStart(2, "0");
  }

  return <li>{timeRemaining}</li>;
};

export default Timer;
