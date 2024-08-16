import classNames from "classnames";
import React, { memo } from "react";
import styles from "./LuneAnimation.module.scss";

const LuneAnimation = memo(({ animationLune }) => {
  return (
    <div
      className={classNames(styles.lune, animationLune && styles.luneAnimate)}
    ></div>
  );
});

export default LuneAnimation;
