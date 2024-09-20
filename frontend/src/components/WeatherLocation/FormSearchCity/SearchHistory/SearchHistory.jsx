import search from "../../../../assets/search.svg";

import useHistory from "../../../../hooks/useHistory";

const SearchHistory = ({ onClick, onMouseLeave, history }) => {
  const [favorites, setFavorites] = useHistory("favorites", []);

  const isFavorite = (item, favorites) => {
    return favorites.some(
      (favorite) =>
        favorite.value === item.value &&
        favorite.coord.lat === item.coord.lat &&
        favorite.coord.lon === item.coord.lon,
    );
  };

  const handleStarClick = (item) => {
    if (isFavorite(item, favorites)) {
      setFavorites(
        favorites.filter((favorite) => {
          return !(
            favorite.value === item.value &&
            favorite.coord.lat === item.coord.lat &&
            favorite.coord.lon === item.coord.lon
          );
        }),
      );
    } else {
      if (favorites.length <= 7) {
        setFavorites([...favorites, item]);
      } else {
        alert("Нельзя сохранить больше 8 городов");
      }
    }
  };

  return (
    <div
      className={"absolute top-10 left-0 bg-white w-[100%] rounded-b-[13px]"}
      onMouseLeave={onMouseLeave}
    >
      <div className={"border-t-[#5f6368] border-t-[1px] pb-1 mx-3 "}></div>
      <ul
        tabIndex="0"
        className={
          "flex flex-col gap-1 items-start pl-[15px] py-2 max-h-[125px] overflow-y-scroll"
        }
      >
        {history.map((item, index) => (
          <li
            tabIndex="0"
            key={index}
            onClick={() => onClick(item.value)}
            className={"cursor-pointer flex justify-between w-full"}
          >
            <div className={"flex gap-4"}>
              <img src={search} alt={""} className={"cursor-pointer"} />
              <span className={""}>{item.value}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite(item, favorites) ? "yellow" : "none"}
              stroke={isFavorite(item, favorites) ? "yellow" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={"lucide lucide-star cursor-pointer mr-2"}
              onClick={(e) => {
                e.stopPropagation();
                handleStarClick(item);
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
