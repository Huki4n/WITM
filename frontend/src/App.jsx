import React, { useContext, useEffect, useState } from "react";

import WeekWeather from "./components/WeatherWeek/WeatherWeek";
import HoursWeather from "./components/HoursWeather/HoursWeather";
import WeatherIndicators from "./components/WeatherIndicator/WeatherIndicators";

import "./App.scss";
import "./styles/style.scss";

import getBackgrounds from "./constants/getBackgrounds/getBackgrounds";
import WeatherLocation from "./components/WeatherLocation/WeatherLocation";
import checkTimeOfDay from "./helpers/getTimeOfDay";
import Background from "./components/Background/Background";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeatherCity from "./components/WeatherCity/WeatherCity";
import Information from "./components/Information/Information";
import Animations from "./components/Animations/Animations";

function App() {
  const [weatherData, setWeatherData] = useState({
    status: "loading",
    repos: {},
  });

  /*useEffect(() => {
    fetch('/api')
        .then((response) => response.json())
        .then((response) => {
          setWeatherData({status: 'good', repos: response.data});
        })
        .catch(() => console.log('Error write weather data'))

  }, []);*/

  const [date, setDate] = useState(new Date());
  const [animationTrajectory, setAnimationTrajectory] = useState(false);
  const [animationSun, setAnimationSun] = useState(false);
  const [animationLune, setAnimationLune] = useState(false);
  const [animationTrajectoryLune, setAnimationTrajectoryLune] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const [margin, setMargin] = useState("100px");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (date.getSeconds() === 3) {
        setAnimationTrajectoryLune(false);
        setAnimationTrajectory(false);
        setShowStars(false);
        setAnimationLune(false);
      } else if (date.getSeconds() === 4) {
        setAnimationTrajectory(true);
        setAnimationSun(true);
      } else if (date.getSeconds() === 24) {
        setAnimationTrajectory(false);
        setAnimationSun(false);
      } else if (date.getSeconds() === 25) {
        setAnimationTrajectory(true);
        setAnimationTrajectoryLune(true);
        setShowStars(true);
        setAnimationLune(true);
      }
    }, 500);
  }, [date]);

  const background = useContext(getBackgrounds);

  return (
    <div
      style={{ background: `${background[checkTimeOfDay()].bg}` }}
      className={"App"}
    >
      <Background />
      <WeatherCity margin={margin}>{"washington"}</WeatherCity>
      <Animations
        animation={{
          trajectory: animationTrajectory,
          trajectoryLune: animationTrajectoryLune,
          sun: animationSun,
          lune: animationLune,
        }}
        showStars={showStars}
      />
      <Information setMargin={setMargin}>
        <WeatherLocation />
        <WeatherInfo
          weatherProps={{
            weatherType: weatherData.repos?.fact?.condition,
          }}
        />
        <WeatherIndicators />
        <WeekWeather />
        <HoursWeather />
      </Information>
    </div>
  );
}

export default App;
