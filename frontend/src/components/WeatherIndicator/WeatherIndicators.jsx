import { memo } from "react";
import WindIndicator from "./WindIndicator/WindIndicator";
import PressureIndicator from "./PressureIndicator/PressureIndicator";
import UvIndicator from "./UvIndicator/UvIndicator";
import SunIndicator from "./SunIndicator/SunIndicator";
import { useSelector } from "react-redux";

const WeatherIndicators = memo(() => {
  const weather = useSelector(
    (state) => state.currentWeather.currentWeatherInfo,
  );

  return (
    <section
      className={
        "weather-indicator__container row-start-2 row-end-3 col-start-2 col-end-3 "
      }
    >
      <div
        className={
          "weather-indicator relative flex gap-[30px] text-white z-0 justify-end"
        }
      >
        <PressureIndicator pressure={weather?.main?.pressure} />
        <WindIndicator
          angle={weather?.wind?.deg}
          windSpeed={weather?.wind?.speed}
        />
        <div
          className={
            "bg-black/[.50] rounded-xl backdrop-blur-[20px] flex gap-[62px] pt-[9px] pl-[28px] pr-[50px] pb-[34px] h-36 w-[626px]"
          }
        >
          <UvIndicator uvIndex={8} />
          <SunIndicator
            sunrise={weather?.sys?.sunrise}
            sunset={weather?.sys?.sunset}
          />
        </div>
      </div>
    </section>
  );
});

export default WeatherIndicators;
