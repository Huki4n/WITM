import cloudy from '../assets/weather_icons/cloudy.svg'

export default function WeatherCharacteristic({date, weather_icon,temp}){
  return <>
    <li className={'weather__characteristic inline-flex flex-col justify-start gap-5 text-white'}>
      <span className={'weather__characteristic__calendar text-2xl w-[63px]'}>{date.substring(0, 3)}</span>
      <img src={cloudy} alt="" className="dweather__characteristic__icon w-[63px] h-[57px]"/>
      <span className="weather__characteristic__temp text-2xl">{temp}&deg;C</span>
    </li>
  </>
}