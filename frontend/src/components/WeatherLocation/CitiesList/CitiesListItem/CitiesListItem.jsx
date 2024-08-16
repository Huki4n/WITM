import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../../../services/OpenWeatherApi";
import { currentWeatherSlice } from "../../../../store/currentWeatherSlice/currentWeatherSlice";
import classNames from "classnames";
import styles from "./CitiesListItem.module.scss";

const CitiesListItem = ({ children, id, activeIndex, setActiveIndex }) => {
  const dispatch = useDispatch();
  const savedCityCoord = useSelector(
    (state) => state.savedCities.savedCitiesList[id],
  );

  const { data } = useGetCurrentWeatherQuery({
    lat: savedCityCoord?.coord.lat,
    lon: savedCityCoord?.coord.lon,
  });

  const handleClick = () => {
    setActiveIndex(id);
    dispatch(currentWeatherSlice.actions.setWeather(data));
  };

  return (
    <li
      key={id}
      className={classNames(
        styles.cityHover,
        "text-xl opacity-70 cursor-pointer",
        activeIndex === id ? styles.active : "",
      )}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default CitiesListItem;
