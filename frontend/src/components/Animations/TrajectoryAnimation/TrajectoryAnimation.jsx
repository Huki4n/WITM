import classNames from "classnames";
import React, { memo } from "react";
import SunAnimation from "./SunAnimation/SunAnimation";
import LuneAnimation from "./LuneAnimation/LuneAnimation";
import styles from "./TrajectoryAnimation.module.scss";

const TrajectoryAnimation = memo(({ animation }) => {
  return (
    <div
      className={classNames(
        animation.trajectory
          ? animation.trajectoryLune
            ? styles.trajectoryAnimateLune
            : styles.trajectoryAnimateSun
          : "",
        "trajectory w-[2611px] h-[2611px] rounded-full",
        styles.trajectory,
      )}
    >
      <SunAnimation animationSun={animation.sun} />
      <LuneAnimation animationLune={animation.lune} />
    </div>
  );
});

export default TrajectoryAnimation;
