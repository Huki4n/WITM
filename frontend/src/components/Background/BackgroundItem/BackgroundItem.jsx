import styles from "../Background.module.scss";
import React, { memo, useContext } from "react";
import getBackgrounds from "../../../constants/getBackgrounds/getBackgrounds";
import useTimeOfDay from "../../../hooks/useTimeOfDay";

const BackgroundItem = memo(({ styleItem }) => {
  const background = useContext(getBackgrounds);

  const timeOfDay = useTimeOfDay();

  return (
    <div
      style={{
        backgroundImage: `url(${background[timeOfDay][styleItem]})`,
      }}
      className={styles[styleItem]}
    ></div>
  );
});

export default BackgroundItem;
