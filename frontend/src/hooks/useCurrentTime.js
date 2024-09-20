import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Обновление каждую секунду

    return () => clearInterval(intervalId);
  }, []);

  return time;
};

export default useCurrentTime;
