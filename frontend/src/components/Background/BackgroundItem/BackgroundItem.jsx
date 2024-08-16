import GetTimeOfDay from "../../../helpers/getTimeOfDay";
import styles from "../Background.module.scss";
import React, { memo, useContext } from "react";
import getBackgrounds from "../../../constants/getBackgrounds/getBackgrounds";

const BackgroundItem = memo(({ styleItem }) => {
  const background = useContext(getBackgrounds);

  return (
    <div
      style={{
        backgroundImage: `url(${background[GetTimeOfDay()][styleItem]})`,
      }}
      className={styles[styleItem]}
    ></div>
  );
});

export default BackgroundItem;
