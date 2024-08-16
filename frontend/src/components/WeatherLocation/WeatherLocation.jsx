import maps from "../../assets/maps.svg";
import saved_cities from "../../assets/saved.svg";
import search from "../../assets/search.svg";
import { memo, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./WeatherLocation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/OpenWeatherApi";
import { savedCitiesSlice } from "../../store/savedCitiesSlice/savedCitiesSlice";
import { currentWeatherSlice } from "../../store/currentWeatherSlice/currentWeatherSlice";
import CitiesList from "./CitiesList/CitiesList";

/* TODO:
 *   Подключить библиотеку для уникальных id
 * */

const FormSearchCity = ({ city, setCity }) => {
  const [coordinates, setCoordinates] = useState([]);
  const dispatch = useDispatch();

  const { data } = useGetCurrentWeatherQuery(
    { lat: coordinates[1], lon: coordinates[0] },
    { refetchOnMountOrArgChange: false },
  );

  useEffect(() => {
    if (coordinates.length > 0) {
      dispatch(currentWeatherSlice.actions.setWeather(data));
    }
  }, [coordinates, data, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_ADRRESS_API_KEY}&geocode=${city.city}&lang=en_RU&results=1&format=json`,
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
              city: city.city,
              coord: { lat: coord[1], lon: coord[0] },
            }),
          );
        }
      })
      .catch(() => console.log("Error address"));

    setCoordinates([]);
  };

  const updateData = (e) => {
    e.preventDefault();
    setCity({
      ...city,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
        onChange={updateData}
        placeholder={"Search for other locations.."}
        size={22}
        className={classNames(
          styles.inputSearch,
          "placeholder:text-base placeholder:text-black/[.4] text-black outline-0 ]",
        )}
      />
    </form>
  );
};

const SavedCities = ({ city }) => {
  const savedCities = useSelector((state) => state.savedCities.savedCitiesList);

  return (
    <div className={classNames(styles.saved, "cursor-pointer relative")}>
      <img src={saved_cities} alt={""} className={"saved-cities__icon"} />
      <div
        className={classNames(
          styles.savedCities,
          "min-w-max max-h-0 overflow-hidden absolute top-[150%] left-[-300%] cursor-auto",
        )}
      >
        <ul
          className={
            "saved-cities__list grid grid-cols-2 bg-white p-4 rounded-xl"
          }
        >
          {!savedCities && <span>No one city is save</span>}
          {city && (
            <li className={"flex gap-1"}>
              <span>{city}</span>
              <div className={"cursor-pointer"}>+</div>
              <div className={"cursor-pointer"}>-</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const WeatherLocation = memo(() => {
  const [city, setCity] = useState([]);
  const savedCities = useSelector((state) => state.savedCities.savedCitiesList);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 mt-[19px]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center ">
        <CitiesList
          cities={savedCities.slice(0, 4).map((item) => item.city)}
          ids={[0, 1, 2, 3]}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
        <div className="flex gap-4 items-center justify-self-center mx-16">
          <div className="cursor-pointer">
            <img src={maps} alt={""} />
          </div>
          <div className="py-3 pl-[14px] pr-[23px] bg-white rounded-full ">
            <FormSearchCity city={city} setCity={setCity} />
          </div>
          <SavedCities city={city.city} />
        </div>
        <CitiesList
          cities={savedCities.slice(4, 8).map((item) => item.city)}
          ids={[4, 5, 6, 7]}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
    </header>
  );
});

export default WeatherLocation;
