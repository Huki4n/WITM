import { useEffect, useState } from "react";

const GetTimeOfDay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const secondsTimer = setInterval(() => {
      if (date) {
        setDate(new Date());
      }
    }, 1000);
    return () => clearInterval(secondsTimer);
  }, [date]);

  if (date.getSeconds() >= 5 && date.getSeconds() <= 8) {
    return "sunrise";
  } else if (date.getSeconds() >= 9 && date.getSeconds() <= 11) {
    return "morning";
  } else if (date.getSeconds() >= 12 && date.getSeconds() <= 15) {
    return "midday";
  } else if (date.getSeconds() >= 16 && date.getSeconds() <= 19) {
    return "afternoon";
  } else if (date.getSeconds() >= 20 && date.getSeconds() <= 22) {
    return "sunset";
  } else {
    return "night";
  }
};
export default GetTimeOfDay;
