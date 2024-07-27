import WeatherCharacteristic from "./Weather_Characteristic";

export default function WeekWeather(){
  const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

   return <div className={'week-weather-container row-start-3 row-end-4 col-start-2 self-center'}>
    <ul className="week-weather flex gap-[66px] bg-black/[.50] rounded-xl backdrop-blur-[20px] px-[4.5rem] py-[1.75rem] ">
      <WeatherCharacteristic date={allDays[0]} weather_icon={''} temp={'30'}/>
      <WeatherCharacteristic date={allDays[1]} weather_icon={''} temp={'22'}/>
      <WeatherCharacteristic date={allDays[2]} weather_icon={''} temp={'28'}/>
      <WeatherCharacteristic date={allDays[3]} weather_icon={''} temp={'20'}/>
      <WeatherCharacteristic date={allDays[4]} weather_icon={''} temp={'29'}/>
      <WeatherCharacteristic date={allDays[5]} weather_icon={''} temp={'32'}/>
      <WeatherCharacteristic date={allDays[6]} weather_icon={''} temp={'24'}/>
    </ul>
   </div>
 }