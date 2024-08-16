import React, { memo } from "react";

const WeatherCity = memo(({ children, margin }) => {
  return (
    <div
      style={{ left: margin }}
      className={
        "text-[154px] mix-blend-soft-light text-black absolute top-6 tracking-[4.5rem] z-[2]"
      }
    >
      {children.toUpperCase()}
    </div>
  );
});

export default WeatherCity;
