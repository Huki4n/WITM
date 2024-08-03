import React, {memo, useContext} from "react";
import classNames from "classnames";
import {useHorizontalScroll} from "../../hooks/Horizontal_Scroll_Hook";
import getHourWeatherData from "../../constants/getHourWeatherData/getHourWeatherData";
import WeatherCharacteristic from "../WeatherTimeBlock/WeatherTimeBlock";
import styles from "./HoursWeather.module.scss";
import pagination_arrow from '../../assets/pagination_arrow.svg'

const Pagination = () => {
  return <div className={'city-pagination flex gap-[21px] items-center'}>
    <img src={pagination_arrow} alt="" className={'cursor-pointer'}/>
    <ul className={'city-pagination__list flex gap-[21px] items-center'}>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full "></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
      <li className="city-pagination__item w-[10px] h-[10px] bg-white/[.5] rounded-full"></li>
    </ul>
    <img src={pagination_arrow} alt="" className={'cursor-pointer relative rotate-180'}/>
  </div>
}

const HoursWeather = memo(() => {
  const scrollRef = useHorizontalScroll();
  const HourWeatherData = useContext(getHourWeatherData)

  return <section className={classNames(styles.container,'hours-weather__container col-start-1 col-end-3 row-start-4 row-end-5 flex flex-col items-center gap-12')}>
    <div ref={scrollRef} className={classNames(styles.flipped,styles.scrollList,'max-w-[1720px] pb-[44px] overflow-x-scroll')}>
      <ul className={classNames(styles.flipped,'flex gap-[55px] flipped w-[2660px]')}>
          {HourWeatherData.map((item,index) => {
            return <WeatherCharacteristic date={item.time} weather_icon={item.icon} temp={item.temp} key={index}/>;
          })}
      </ul>
    </div>
    <Pagination/>
  </section>
});

export default HoursWeather;