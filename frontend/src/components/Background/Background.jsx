import React, { memo } from "react";
import BackgroundItem from "./BackgroundItem/BackgroundItem";

/*TODO:
 *  исправить постоянное обновление фона
 * */
const Background = memo(() => {
  return (
    <div>
      <BackgroundItem styleItem={"upper"} />
      <BackgroundItem styleItem={"mid"} />
      <BackgroundItem styleItem={"lower"} />
    </div>
  );
});

export default Background;
