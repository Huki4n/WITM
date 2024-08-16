import TrajectoryAnimation from "./TrajectoryAnimation/TrajectoryAnimation";
import Stars from "./TrajectoryAnimation/Stars/Stars";
import React, { memo } from "react";

/*
 * TODO:
 *  При ширине 1920px у Trajectory left = -17% у Stars left = 0%
 *  2048px у Trajectory left = -13% у Stars left = 3%
 *  2176px у Trajectory left = -9% у Stars left = 6%
 *  */
const Animations = memo(({ animation, showStars }) => {
  return (
    <div className={"animation relative"}>
      <TrajectoryAnimation animation={animation} />
      <Stars showStars={showStars} />
    </div>
  );
});

export default Animations;
