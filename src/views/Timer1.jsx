import React, { useState, useEffect } from "react";

const Timer1 = ({ deadline }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const difference = deadlineTime - now;

      if (difference <= 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(difference);
      }
    };

    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const formatTime = () => {
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return `${hours.toString().padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}s`;
    } else {
      return `${days.toString().padStart(2, "0")}d:${hours.toString().padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    }
  };

  return <span>{formatTime()}</span>;
};

export default Timer1;
