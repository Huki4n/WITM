import sun_line from "../../../assets/day_animation/sun_line.svg";
import styles from "./SunIndicator.module.scss";
import classNames from "classnames";

const SunIndicatorStages = ({ text, time }) => {
  return (
    <div className={"flex flex-col items-start gap-1"}>
      <span className={"text-base"}>{text}</span>
      <span className={"text-4xl"}>
        {time.toLocaleString("ru-RU", {
          hour: "numeric",
          minute: "numeric",
        }) !== "Invalid Date"
          ? time.toLocaleString("ru-RU", {
              hour: "numeric",
              minute: "numeric",
            })
          : "0:00"}
      </span>
    </div>
  );
};

const SunIndicator = ({ sunrise, sunset }) => {
  return (
    <div
      className={classNames(
        styles.sun,
        "relative flex gap-[98px] min-w-[370.5px]",
      )}
    >
      <SunIndicatorStages text={"Sunrise"} time={new Date(sunrise * 1000)} />
      <div className={"sun__line"}>
        <img src={sun_line} alt="" className="absolute bottom-0 left-3" />
        <div
          className={
            "absolute h-px w-[143px] bg-white/[0.7] bottom-[2.55rem] left-[7.55rem]"
          }
        ></div>
      </div>
      <SunIndicatorStages text={"Sunset"} time={new Date(sunset * 1000)} />
    </div>
  );
};

export default SunIndicator;
