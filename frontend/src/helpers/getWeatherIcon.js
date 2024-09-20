import rain from "../assets/weather_icons/rain.svg";
import clouds from "../assets/weather_icons/cloudy.svg";
import clear from "../assets/weather_icons/clear.svg";
import strong_clouds from "../assets/weather_icons/strong_cloudy.svg";

const getWeatherIcon = (weatherType, weatherTypeStrength) => {
  const weatherTypes = {
    clear: clear,
    clouds: {
      "few clouds": clouds,
      "scattered clouds": clouds,
      "broken clouds": strong_clouds,
      "overcast clouds": strong_clouds,
    },
    rain: rain,
  };

  const selectedWeather = weatherTypes[weatherType.toLowerCase()];
  return selectedWeather[weatherTypeStrength] || selectedWeather || clear;
};

export default getWeatherIcon;
