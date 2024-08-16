import CitiesListItem from "./CitiesListItem/CitiesListItem";

const CitiesList = ({ cities, ids, activeIndex, setActiveIndex }) => {
  return (
    <ul className="flex justify-between text-white">
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
