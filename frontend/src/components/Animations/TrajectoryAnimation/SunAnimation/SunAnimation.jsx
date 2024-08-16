import classNames from "classnames";
import React, { memo } from "react";
import styles from "./SunAnimation.module.scss";

const SunAnimation = memo(({ animationSun }) => {
  return (
    <div
      className={classNames(styles.sun, animationSun && styles.sunAnimate)}
    ></div>
  );
});

export default SunAnimation;
