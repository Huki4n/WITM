import React, { memo } from "react";
import { useSelector } from "react-redux";

const WeatherCity = memo(({ margin }) => {
  const currentCity = useSelector(
    (state) => state.currentWeather.currentCity,
  ).split("");

  return (
    <div
      style={{ left: margin }}
      className={
        "text-[154px] mix-blend-soft-light text-black absolute top-6 z-[2] flex justify-between w-[1720px]"
      }
    >
      {currentCity.map((letter, index) => (
        <span key={index} style={{ display: "inline-block" }}>
          {letter.toUpperCase()}
        </span>
      ))}
    </div>
  );
});

export default WeatherCity;
