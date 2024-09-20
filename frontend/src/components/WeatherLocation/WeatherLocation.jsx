import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./WeatherLocation.module.scss";
import classNames from "classnames";

import CitiesList from "./CitiesList/CitiesList";

import maps from "../../assets/maps.svg";
import saved_cities from "../../assets/saved.svg";
import SavedCitiesPopup from "../SavedCitiesPopup/SavedCitiesPopup";
import FormSearchCity from "./FormSearchCity/FormSearchCity";
import useHistory from "../../hooks/useHistory";

const SavedCities = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick = () => {
    setOpenPopup(!openPopup);
  };

  return (
    <div className={classNames(styles.saved, "cursor-pointer relative")}>
      <img
        src={saved_cities}
        alt={""}
        className={"saved-cities__icon"}
        onClick={handleClick}
      />
      <SavedCitiesPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  );
};

const WeatherLocation = memo(() => {
  const [activeIndex, setActiveIndex] = useState(null);
  const savedCities = useSelector((state) => state.savedCities.savedCitiesList);
  const [favorites, setFavorites] = useHistory("favorites", []);

  const updateFavorites = useCallback(() => {
    const updatedFavorites = fetchFavoritesFromLocalStorage();
    setFavorites(updatedFavorites);
  }, [setFavorites]);

  const fetchFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  useEffect(() => {
    updateFavorites();
  }, []);

  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 mt-[19px]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center ">
        <CitiesList
          cities={favorites.slice(0, 4).map((item) => item.value)}
          ids={[0, 1, 2, 3]}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
        <div className="flex gap-4 items-center justify-self-center mx-16">
          <div className="cursor-pointer">
            <img src={maps} alt={""} />
          </div>
          <FormSearchCity setActiveIndex={setActiveIndex} />
          <SavedCities />
        </div>
        <CitiesList
          cities={favorites.slice(4, 8).map((item) => item.value)}
          ids={[4, 5, 6, 7]}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
    </header>
  );
});

export default WeatherLocation;
