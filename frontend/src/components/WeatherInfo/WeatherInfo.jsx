/*interface WeatherInfo {
  city: string,
  temperature: number,
  weather_type: string;
}*/

import {memo, useEffect, useState} from "react";
import cloudy from '../../assets/weather_icons/cloudy.svg'
import allMonth from "../../constants/getMonth/getMonth";
import allDays from "../../constants/getDays/getDay";
import getOrdinalSuffix from "../../helpers/getOrdinalSuffix";

const WeatherInfo =  memo((weatherProps) => {
  const [date, setDate] = useState(new Date());

  let updateDate = {
    month: allMonth[date.getMonth()],
    day: date.getDate(),
    weekDay: allDays[date.getDay()-1]
  }

  useEffect(() => {
    const intervalId = setInterval(() => {

      setDate(new Date());
    }, 999);
    return () => {
      clearInterval(intervalId)
    }
  }, []);

  return <section className={'weather__container row-start-3 row-end-4 self-start'}>
    <div className={'weather grid grid-cols-[auto_1fr] grid-rows-[28px_minmax(auto,1fr)_28px} gap-x-[3.75rem] gap-y-5'}>
      <span className={'weather__timezone text-2xl text-white/[.5]'}>GMT +3</span>
      <div className={'weather__type self-center justify-self-start col-start-1 col-end-2'}>
        <img className={'weather__icon flex flex-col'} src={cloudy} alt={weatherProps.weatherType}/>
      </div>
      <span className={'weather__time col-start-1 col-end-2 text-white text-2xl'}>
        {date.toLocaleString('en-US', { hour: 'numeric', hour12: true ,minute:'numeric'}).toLowerCase()}
      </span>
      <span className={'weather__day text-2xl text-white justify-self-start row-start-1 row-end-2 col-start-2 col-end-3'}>
        {updateDate.weekDay} {getOrdinalSuffix(updateDate.day)} {updateDate.month}
      </span>
      <span className={'weather__now-temperature text-8xl text-[#FFDF6E] justify-self-start font-normal row-start-2 row-end-3 col-start-2 col-end-3'}>
        {weatherProps.nowTemperature}22&deg;C
      </span>
      <div className={'weather__minmax-temperature flex gap-6 justify-center text-white justify-self-start col-start-2 col-end-3'}>
        <span className={'weather__max-temperature text-2xl'}>Max.Temp. {weatherProps.maxTemperature}&deg;C</span>
        <span className={'weather__min-temperature text-2xl'}>Min.Temp. {weatherProps.minTemperature}&deg;C</span>
      </div>
    </div>
  </section>
})

export default WeatherInfo;