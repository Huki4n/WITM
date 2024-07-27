import WeatherCharacteristic from "./Weather_Characteristic";
import React from "react";
import {useHorizontalScroll} from "./Horizontal_Scroll_Hook";

export default function HoursWeather(){
  const HourWeatherData = [
    {time: '00', icon: '', temp: 24},
    {time: '01', icon: '', temp: 25},
    {time: '02', icon: '', temp: 25},
    {time: '03', icon: '', temp: 25},
    {time: '04', icon: '', temp: 26},
    {time: '05', icon: '', temp: 26},
    {time: '06', icon: '', temp: 26},
    {time: '07', icon: '', temp: 28},
    {time: '09', icon: '', temp: 29},
    {time: '10', icon: '', temp: 29},
    {time: '11', icon: '', temp: 30},
    {time: '12', icon: '', temp: 31},
    {time: '13', icon: '', temp: 32},
    {time: '14', icon: '', temp: 32},
    {time: '15', icon: '', temp: 32},
    {time: '16', icon: '', temp: 32},
    {time: '17', icon: '', temp: 31},
    {time: '18', icon: '', temp: 30},
    {time: '19', icon: '', temp: 29},
    {time: '20', icon: '', temp: 28},
    {time: '21', icon: '', temp: 27},
    {time: '22', icon: '', temp: 26},
    {time: '23', icon: '', temp: 25}
  ]
  const scrollRef = useHorizontalScroll();

  return <section className={'hours-weather__container col-start-1 col-end-3 row-start-4 row-end-5'}>
    <div ref={scrollRef} className="hours-weather max-w-[1720px] pb-[44px] overflow-x-scroll flipped scroll-list ">
      <ul className={'hours-weather__list flex gap-[55px] flipped w-[2660px]'}>
          {HourWeatherData.map((item,index) => {
            return <WeatherCharacteristic date={item.time} weather_icon={item.icon} temp={item.temp} key={index}/>;
          })
          }
      </ul>
    </div>
  </section>
}