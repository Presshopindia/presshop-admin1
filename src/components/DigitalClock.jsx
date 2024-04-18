import React, { useState, useEffect } from "react";

const DigitalClock = ({shortMonth}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    };
    let formattedTime = date.toLocaleTimeString([], options);
    formattedTime = formattedTime.replace(/\b(am|pm)\b/gi, match => match.toUpperCase());
    return formattedTime;
  };

  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: shortMonth ? "short" : "long",
      year: "numeric"
    };
    return date.toLocaleDateString([],options);
  };

  return (
    <div className="digital-clock crnt_clock">
      <div className="time">{formatTime(currentTime)} <span>,</span></div>
      <div className="date">{formatDate(currentTime)}</div>
    </div>
  );
};

export default DigitalClock;


