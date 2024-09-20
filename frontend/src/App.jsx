import React, { useContext, useState } from "react";

import WeekWeather from "./components/WeatherWeek/WeatherWeek";
import HoursWeather from "./components/HoursWeather/HoursWeather";
import WeatherIndicators from "./components/WeatherIndicator/WeatherIndicators";

import "./App.scss";
import "./styles/style.scss";

import getBackgrounds from "./constants/getBackgrounds/getBackgrounds";
import WeatherLocation from "./components/WeatherLocation/WeatherLocation";
import Background from "./components/Background/Background";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeatherCity from "./components/WeatherCity/WeatherCity";
import Information from "./components/Information/Information";
import Animations from "./components/Animations/Animations";
import useTimeOfDay from "./hooks/useTimeOfDay";
import useCurrentTime from "./hooks/useCurrentTime";

function App() {
  const date = useCurrentTime();
  const [margin, setMargin] = useState("100px");

  // const [animationStates, setAnimationStates] = useState({
  //   trajectory: false,
  //   sun: false,
  //   lune: false,
  //   trajectoryLune: false,
  //   stars: false,
  // });
  //
  // const updateAnimationStates = (seconds) => {
  //   return {
  //     trajectory: seconds === 4 || seconds === 25,
  //     sun: seconds === 4,
  //     lune: seconds === 25,
  //     trajectoryLune: seconds === 25,
  //     stars: seconds === 25,
  //   };
  // };
  //
  // // Используем useMemo для кеширования вычисленного состояния
  // const newAnimationStates = useMemo(() => {
  //   const seconds = date.getSeconds();
  //   return updateAnimationStates(seconds);
  // }, [date]);
  //
  // // Обновляем состояние, если новое состояние отличается от текущего
  // if (JSON.stringify(animationStates) !== JSON.stringify(newAnimationStates)) {
  //   setAnimationStates(newAnimationStates);
  // }

  const background = useContext(getBackgrounds);
  const timeOfDay = useTimeOfDay();

  return (
    <div
      style={{ background: `${background[timeOfDay].bg}` }}
      className={"App"}
    >
      <Background />
      <WeatherCity margin={margin} />
      {/*<Animations*/}
      {/*  animation={{*/}
      {/*    trajectory: animationTrajectory,*/}
      {/*    trajectoryLune: animationTrajectoryLune,*/}
      {/*    sun: animationSun,*/}
      {/*    lune: animationLune,*/}
      {/*  }}*/}
      {/*  showStars={showStars}*/}
      {/*/>*/}
      <Information setMargin={setMargin}>
        <WeatherLocation />
        <WeatherInfo />
        <WeatherIndicators />
        <WeekWeather />
        <HoursWeather />
      </Information>
    </div>
  );
}

export default App;
