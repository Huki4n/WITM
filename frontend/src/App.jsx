import React, {useContext, useEffect, useState} from 'react';

import MainWeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeekWeather from "./components/WeatherWeek/WeatherWeek";
import HoursWeather from "./components/HoursWeather/HoursWeather";
import WeatherIndicators from "./components/WeatherIndicator/WeatherIndicators";

import './App.scss';
import './styles/style.scss'

import getBackgrounds from './constants/getBackgrounds/getBackgrounds'
import WeatherLocation from "./components/WeatherLocation/WeatherLocation";
import checkTimeOfDay from "./helpers/getTimeOfDay";
import Background from "./components/Background/Background";
import Preload from "./components/Preload/Preload";


function App() {
  const [weatherData, setWeatherData] = useState({
    status: 'loading',
    repos: {},
  });

  useEffect(() => {
    let weather = fetch('/api')
        .then((response) => response.json())
        .then((response) => {
          setWeatherData({status: 'good', repos: response.data});
        })
        .catch(() => console.log('Error write weather data'))

  }, []);

  const [date,setDate] = useState(new Date())
  const [animationTrajectory,setAnimationTrajectory] = useState(false);
  const [animationSun,setAnimationSun] = useState(false);
  const [animationLune,setAnimationLune] = useState(false);
  const [animationTrajectoryLune,setAnimationTrajectoryLune] = useState(false);
  const [showStars,setShowStars] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 500);
    return () => {
      clearInterval(intervalId)
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (date.getSeconds() === 3){
        setAnimationTrajectoryLune(false);
        setAnimationTrajectory(false);
        setShowStars(false)
        setAnimationLune(false);
      } else if(date.getSeconds() === 4){
        setAnimationTrajectory(true);
        setAnimationSun(true);
      } else if(date.getSeconds() === 24){
        setAnimationTrajectory(false);
        setAnimationSun(false);
      } else if(date.getSeconds() === 25){
        setAnimationTrajectory(true);
        setAnimationTrajectoryLune(true);
        setShowStars(true);
        setAnimationLune(true);
      }
    },500);
  }, [date]);

  const background = useContext(getBackgrounds)

  return <div style={{background: `${background[checkTimeOfDay()].bg}`}} className={'App'}>
    <Preload/>
    <Background/>
    <div className={'weather__city text-[154px] mix-blend-soft-light text-black absolute left-24 top-6 tracking-[4.5rem] z-[2]'}>
      WASHINGTON
    </div>
    <div
        className={
        animationTrajectory ?
            animationTrajectoryLune ? 'trajectory animate-lune w-[2611px] h-[2611px] rounded-full':
                'trajectory animate-sun w-[2611px] h-[2611px] rounded-full' :
                'trajectory w-[2611px] h-[2611px] rounded-full'
    }>
      <div className={animationSun ? "trajectory__sun animate" : "trajectory__sun"}></div>
      <div className={animationLune ? "trajectory__lune animate" : "trajectory__lune"}></div>
    </div>
    <div className={showStars ? 'stars opacity-1' : 'stars opacity-0'}>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
    </div>
    <div
        className={'wrapper max-w-[1720px] mx-[100px] grid grid-cols-[auto_minmax(auto,980px)] grid-rows-[275px_142px_219px_319px] gap-y-10 relative z-[3]'}>
      <WeatherLocation/>
      <MainWeatherInfo nowTemperature={weatherData.repos?.fact?.temp}
                       maxTemperature={weatherData.repos?.fact?.temp}
                       minTemperature={weatherData.repos?.fact?.temp}
                       weatherType={weatherData.repos?.fact?.condition}
      />
      <WeatherIndicators/>
      <WeekWeather/>
      <HoursWeather/>
    </div>
  </div>
}

export default App;
