import React, {memo, useContext} from "react";
import BackgroundItem from "./BackgroundItem/BackgroundItem";



const Background = () => {
  return <>
    <BackgroundItem style={'upper'}/>
    <BackgroundItem style={'mid'}/>
    <BackgroundItem style={'lower'}/>
  </>
};
export default Background;