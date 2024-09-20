import { memo, useCallback, useEffect, useState } from "react";
import style from "./SavedCitiesPopup.module.scss";
import classNames from "classnames";
import getWeatherIcon from "../../helpers/getWeatherIcon";
import useHistory from "../../hooks/useHistory";
import { useDispatch } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/OpenWeatherApi";
import { currentWeatherSlice } from "../../store/currentWeatherSlice/currentWeatherSlice";

const SavedCitiesPopup = memo(({ setOpenPopup, openPopup }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [favorites, setFavorites] = useHistory("favorites", []);
  const [weatherData, setWeatherData] = useState([]);
  const [coord, setCoord] = useState({});
  const dispatch = useDispatch();

  const { data } = useGetCurrentWeatherQuery({
    lat: coord.lat,
    lon: coord.lon,
  });

  const updateFavorites = useCallback(() => {
    const updatedFavorites = fetchFavoritesFromLocalStorage();
    setFavorites(updatedFavorites);
  }, [setFavorites]);

  const handleClick = (index) => {
    setCoord(favorites[index].coord);
    dispatch(currentWeatherSlice.actions.setWeather(data));
  };

  const fetchFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      const updatedWeatherData = await Promise.all(
        favorites.map(async (city) => {
          const { lat, lon } = city.coord;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
          );
          const data = await response.json();

          if (response.ok) {
            return {
              location: city.value,
              temperature: `${Math.round(data?.main?.temp)}°C`,
              weatherType: data?.weather[0]?.main,
              description: data?.weather[0]?.description,
              time: new Date(data?.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              gmt: `GMT${data?.timezone >= 0 ? "+" : ""}${data?.timezone / 3600}`,
              icon: getWeatherIcon(
                data?.weather[0]?.main,
                data?.weather[0]?.description,
              ),
            };
          }
          return null;
        }),
      );
      setWeatherData(updatedWeatherData.filter(Boolean));
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites, openPopup]);

  useEffect(() => {
    if (openPopup) {
      updateFavorites();
    }

    const handleStorageChange = () => {
      updateFavorites();
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("load", handleStorageChange);
    window.addEventListener("DOMContentLoaded", handleStorageChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleStorageChange);
      window.removeEventListener("DOMContentLoaded", handleStorageChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateFavorites, openPopup, setFavorites]);

  return (
    <div
      className={classNames(
        style.weatherPopup,
        !openPopup && style.visible,
        "bg-black/[0.5] backdrop-blur-[35px] text-white  px-[96px]",
      )}
      onMouseEnter={updateFavorites}
      onMouseLeave={updateFavorites}
    >
      <button
        className={classNames(
          style.closeButton,
          "bg-transparent text-white border-[none] text-2xl cursor-pointer",
        )}
        onClick={() => {
          setOpenPopup(false);
          updateFavorites();
        }}
      >
        ❌
      </button>
      <ul>
        {weatherData.map((data, index) => (
          <li
            key={index}
            className={classNames(
              style.weatherItem,
              "grid gap-x-5 justify-start py-[30px] col-start-1 row-start-1 row-end-3",
            )}
            onClick={() => handleClick(index)}
          >
            <img
              src={data.icon}
              className={
                "col-start-1 row-start-1 row-end-3 self-center min-w-max max-w-16 max-h-16 w-16"
              }
              alt={""}
            />
            <span
              className={
                "row-start-1 col-start-2 text-[32px] justify-self-start"
              }
            >
              {data.location}
            </span>
            <span
              className={"row-start-1 col-start-3 text-[#FFDF6E] text-[32px]"}
            >
              {data.temperature}
            </span>
            <div
              className={
                "justify-self-start row-start-2 col-start-2 flex gap-4 items-center justify-center"
              }
            >
              <span className={"text-white/[0.5] text-[15px]"}>
                {data.time}
              </span>
              <span className={"text-white/[0.5] text-[15px]"}>{data.gmt}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SavedCitiesPopup;
