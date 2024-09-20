import { useEffect, useState } from "react";

const useTimeOfDay = () => {
  const [timeOfDay, setTimeOfDay] = useState(getCurrentTimeOfDay());

  useEffect(() => {
    const secondsTimer = setInterval(() => {
      setTimeOfDay(getCurrentTimeOfDay());
    }, 1000);

    return () => clearInterval(secondsTimer);
  }, []);

  return timeOfDay;
};

const getCurrentTimeOfDay = () => {
  const date = new Date();
  const seconds = date.getSeconds();

  if (seconds >= 5 && seconds <= 8) {
    return "sunrise";
  } else if (seconds >= 9 && seconds <= 11) {
    return "morning";
  } else if (seconds >= 12 && seconds <= 15) {
    return "midday";
  } else if (seconds >= 16 && seconds <= 19) {
    return "afternoon";
  } else if (seconds >= 20 && seconds <= 22) {
    return "sunset";
  } else {
    return "night";
  }
};

export default useTimeOfDay;
