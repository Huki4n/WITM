import React, {useContext, useEffect, useState} from 'react';

import MainWeatherInfo from "./components/Main_Weather_Info";
import WeekWeather from "./components/Week_Weather";
import HoursWeather from "./components/Hours_Weather";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo";

import './App.scss';
import './styles/style.scss'

import backgroundColor from './components/Variables/BackgroundMountainColor'
import WeatherLocation from "./components/WeatherLocation";


function App() {
  const [weatherData, setWeatherData] = useState({
    status: 'loading',
    repos: {},
  });
  const [address, setAddress] = useState()


  useEffect(() => {
    let weather = fetch('/api')
        .then((response) => response.json())
        .then((response) => {
          setWeatherData({status: 'good', repos: response.data});
        })
        .catch(() => console.log('Error write weather data'))

    let adrs = fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_ADRRESS_API_KEY}&geocode=35.446871,54.574113&format=json`)
        .then((response) => response.json())
        .then((response) => {
          setAddress(response);
        })
        .catch(() => console.log('Error write address'))
  }, []);

  const click = () => {
    console.log(weatherData.repos)
  }

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


  const checkTimeOfDay = () => {
    if (date.getSeconds() >= 5 && date.getSeconds() <= 8){
      return 'sunrise'
    } else if (date.getSeconds() >= 9 && date.getSeconds() <= 11){
      return 'morning'
    } else if (date.getSeconds() >= 12 && date.getSeconds() <= 15){
      return 'midday'
    } else if (date.getSeconds() >= 16 && date.getSeconds() <= 19){
      return 'afternoon'
    } else if (date.getSeconds() >= 20 && date.getSeconds() <= 22){
      return 'sunset'
    } else{
      return 'night'
    }
  }


  const background = useContext(backgroundColor)

  return <div style={{background: `${background[checkTimeOfDay()].bg}`}}
      className={'App'}>
    <div className="preload"></div>
    <div  style={{
      background: `url(${background[checkTimeOfDay()].upper})`
    }} className={`background-upper`}></div>
    <div style={{
      background: `url(${background[checkTimeOfDay()].mid})`
    }} className={'background-mid'}></div>
    <div style={{
      background: `url(${background[checkTimeOfDay()].lower})`
    }} className={'background-lower'}></div>
    <div
        className={'weather__city text-[154px] mix-blend-soft-light text-black absolute left-24 top-6 tracking-[4.5rem] z-[2]'}>
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
      <AdditionalWeatherInfo/>
      <WeekWeather/>
      <HoursWeather/>
    </div>
  </div>
}

export default App;
