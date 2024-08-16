import React from "react";
import styles from "./Stars.module.scss";
import classNames from "classnames";

const Stars = ({ showStars }) => {
  return (
    <div
      className={classNames(
        styles.stars,
        showStars ? "opacity-1" : "opacity-0",
      )}
    >
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
    </div>
  );
};

export default Stars;
