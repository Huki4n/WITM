import GetTimeOfDay from "../../../helpers/getTimeOfDay";
import styles from "../Background.module.scss";
import React, {memo, useContext} from "react";
import getBackgrounds from "../../../constants/getBackgrounds/getBackgrounds";

const BackgroundItem = memo(({style}) => {
  const background = useContext(getBackgrounds)

  return <div
      style={{backgroundImage: `url(${background[GetTimeOfDay()][style]})`}}
      className={styles[style]}>
  </div>
});

export default BackgroundItem;