import React, {useEffect, useState} from 'react';
import './App.css';
import MainWeatherInfo from "./components/Main_Weather_Info";
import WeekWeather from "./components/Week_Weather";
import HoursWeather from "./components/Hours_Weather";
import './styles/style.scss'
import AdditionallWeatherInfo from "./components/AdditionalWeatherInfo";

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

  return <div className={'App bg-[#A0D4E7]'}>
    <div className={'background-upper'}></div>
    <div className={'background-mid'}></div>
    <div className={'background-lower'}></div>

    <div className={'weather__city text-[154px] mix-blend-soft-light text-black absolute left-24 top-6 tracking-[5.3rem]'}>
      CALIFORNIA
    </div>
    <div className={'wrapper max-w-[1720px] mx-[100px] grid grid-cols-[auto_minmax(auto,980px)] grid-rows-[275px_142px_219px_319px] gap-y-10 relative z-[3]'}>
      <MainWeatherInfo nowTemperature={weatherData.repos?.fact?.temp}
                       maxTemperature={weatherData.repos?.fact?.temp}
                       minTemperature={weatherData.repos?.fact?.temp}
                       weatherType={weatherData.repos?.fact?.condition}
      />
      <AdditionallWeatherInfo/>
      <WeekWeather/>
      <HoursWeather/>
    </div>
  </div>
}

export default App;
