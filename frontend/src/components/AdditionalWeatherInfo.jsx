import sun_line from '../assets/sun_line.svg'
import wind_arrow from '../assets/wind_arrow.svg'
import pressure_arrow from '../assets/pressure_arrow.svg'

const AdditionalWeatherWind = ({angel}) => {
  return <>
    <div className={'additional-weather__wind wind flex flex-col bg-black/[.50] rounded-full backdrop-blur-[20px] px-[43px] py-[18px] my-2'}>
      <span className={'wind__name text-sm text-white/[.5]'}>Wind</span>
      <span className="wind__speed text-5xl">6</span>
      <span className="wind__unit text-base">Km/h</span>
    </div>
    <img
        style={{rotate: `${angel}deg`}}
        className={'wind__arrow'} src={wind_arrow} alt={''}
    />
  </>
}
const AdditionalWeatherPressure = ({pressure}) => {
  return <>
    <div className={'additional-weather__pressure pressure flex flex-col bg-black/[.50] rounded-full backdrop-blur-[20px] px-[28.5px] pt-[22px] pb-[11px] mb-2 mt-2'}>
      <span className="pressure__num text-4xl mt-5 relative z-[5]">{pressure}</span>
      <span className={'pressure__name text-sm text-white/[.5] mt-[-3px] z-[5]'}>Atm</span>
      <span className="pressure__unit text-base mt-[-5px] z-[5]">mm Hg</span>
    </div>
    <img
        style={{rotate: `${(pressure-750)*2.7}deg`}}
        className={'pressure__arrow'} src={pressure_arrow} alt={''}
    />
  </>
}
const AdditionalWeatherUv = ({uvIndex}) => {
  return <div className="additional-weather__uv uv flex flex-col items-start gap-1">
    <span className="uv__name text-base">UV-Index</span>
    <div className={'flex items-end gap-[14px]'}>
      <span className="uv__num text-4xl">5</span>
      <span className={'uv__indicator text-[22px]'}>{'Normal'}</span>
    </div>
    <div className="uv__line w-[115px] h-[5px] mt-[17px] rounded-xl relative">
      <div className={'uv__line-indicator absolute w-3 h-3 bg-white rounded-full top-[-3px]'} style={{marginLeft: `${uvIndex*8.25}%`}}></div>
    </div>
  </div>
}

const AdditionalWeatherSun = ({sunrise,sunset}) => {
  return <div className="additional-weather__sun sun relative flex flex-grow justify-between">
    <div className="sunrise flex flex-col items-start gap-1">
      <span className="sunrise text-base">Sunrise</span>
      <span className="sunrise__time text-4xl">{sunrise}</span>
    </div>
    <div className="sun__line">
      <img src={sun_line} alt="" className="line absolute bottom-0 left-3"/>
      <div className="horizon absolute h-px w-[143px] bg-white/[0.7] bottom-[2.55rem] left-[7.55rem]"></div>
    </div>
    <div className="sunset flex flex-col items-start gap-1">
      <span className="sunset text-base">Sunset</span>
      <span className="sunset__time text-4xl">{sunset}</span>
    </div>
  </div>
}

export default function AdditionalWeatherInfo() {
  return <section className={'additional-weather__container row-start-2 row-end-3 col-start-2 col-end-3 '}>
    <div className={'additional-weather relative flex gap-[30px] text-white z-0 '}>
      <AdditionalWeatherPressure pressure={750}/>
      <AdditionalWeatherWind angel={0}/>
      <div className={'additional-weather__uv-sun bg-black/[.50] rounded-xl backdrop-blur-[20px] flex-grow flex gap-[62px] pt-[9px] pl-[28px] pr-[50px] pb-[34px] h-36'}>
        <AdditionalWeatherUv uvIndex={5}/>
        <AdditionalWeatherSun sunrise={'05:21'} sunset={'21:21'}/>
      </div>
    </div>
  </section>
}