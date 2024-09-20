import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useHistory from "../../../hooks/useHistory";
import classNames from "classnames";

import { useGetCurrentWeatherQuery } from "../../../services/OpenWeatherApi";
import { currentWeatherSlice } from "../../../store/currentWeatherSlice/currentWeatherSlice";
import { savedCitiesSlice } from "../../../store/savedCitiesSlice/savedCitiesSlice";

import search from "../../../assets/search.svg";
import styles from "../WeatherLocation.module.scss";
import SearchHistory from "./SearchHistory/SearchHistory";

const FormSearchCity = ({ setActiveIndex }) => {
  const [inputValue, setInputValue] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  const [history, setHistory] = useHistory("searchHistory", []);

  const { data } = useGetCurrentWeatherQuery(
    { lat: coordinates[1], lon: coordinates[0] },
    { refetchOnMountOrArgChange: false },
  );

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.length > 1) {
      fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_ADRRESS_API_KEY}&geocode=${inputValue}&lang=en_RU&results=1&format=json`,
      )
        .then((response) => response.json())
        .then((response) => {
          if (response?.response?.GeoObjectCollection) {
            const coord =
              response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                " ",
              );

            setCoordinates(coord);

            dispatch(
              savedCitiesSlice.actions.cityAdd({
                city: inputValue,
                coord: { lat: coord[1], lon: coord[0] },
              }),
            );
            dispatch(currentWeatherSlice.actions.setCity(inputValue));

            setActiveIndex(index);
            setIndex(index + 1);

            const cityData = {
              value: inputValue,
              coord: { lat: coord[1], lon: coord[0] },
            };

            // Проверка, есть ли уже такой город в истории
            const isCityInHistory = history.some(
              (item) =>
                item.value === cityData.value &&
                item.coord.lat === cityData.coord.lat &&
                item.coord.lon === cityData.coord.lon,
            );

            if (!isCityInHistory) {
              setHistory([cityData, ...history]);
            }
          }
        })
        .catch(() => {
          console.log("Error address");
          alert("Нет такой локации");
        });
    } else {
      alert("Нет такой локации");
    }

    setCoordinates([]);
    setInputValue("");
  };

  const handleHistoryCityClick = (name) => {
    setInputValue(name);
    setIsActive(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const showHistory = () => {
    if (history.length > 0) setIsActive(true);
  };

  const hideHistory = (e) => {
    if (e.relatedTarget && e.relatedTarget.tagName === "LI") {
      return;
    }
    setIsActive(false);
  };

  useEffect(() => {
    if (coordinates.length > 0) {
      dispatch(currentWeatherSlice.actions.setWeather(data));
    }
  }, [coordinates, data, dispatch]);

  return (
    <div
      className={classNames(
        "py-3 pl-[14px] pr-[23px] bg-white relative",
        isActive ? "rounded-b-[0] rounded-t-[25px]" : "rounded-[25px]",
      )}
    >
      <form
        action="#"
        className={"flex gap-4 items-center"}
        onSubmit={handleSubmit}
      >
        <button className={"bg-none"} type={"submit"}>
          <img src={search} alt={""} className={"cursor-pointer"} />
        </button>
        <input
          type={"text"}
          name={"city"}
          value={inputValue}
          placeholder={"Search for other locations.."}
          size={22}
          ref={inputRef}
          className={classNames(
            styles.inputSearch,
            "placeholder:text-base placeholder:text-black/[.4] text-black outline-0 ]",
          )}
          onChange={handleChange}
          onFocus={showHistory}
          onMouseEnter={showHistory}
        />

        {isActive && (
          <SearchHistory
            onClick={handleHistoryCityClick}
            onMouseLeave={hideHistory}
            history={history}
          />
        )}
      </form>
    </div>
  );
};

export default FormSearchCity;
