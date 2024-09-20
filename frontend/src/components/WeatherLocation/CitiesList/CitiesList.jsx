import CitiesListItem from "./CitiesListItem/CitiesListItem";
import classNames from "classnames";

const CitiesList = ({ cities, ids, activeIndex, setActiveIndex }) => {
  return (
    <ul
      className={classNames(
        "flex text-white",
        cities.length === 4 ? "justify-between" : "gap-20",
      )}
    >
      {cities.map((city, index) => (
        <CitiesListItem
          key={ids[index]}
          id={ids[index]}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          {city}
        </CitiesListItem>
      ))}
    </ul>
  );
};

export default CitiesList;
