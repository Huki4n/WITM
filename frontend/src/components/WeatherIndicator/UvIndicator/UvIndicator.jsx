import classNames from "classnames";
import styles from "./UvIndicator.module.scss";

const UvIndicator = ({ uvIndex }) => {
  return (
    <div className="{flex flex-col items-start gap-1}">
      <span className={"text-base"}>UV-Index</span>
      <div className={"flex items-end gap-[14px]"}>
        <span className={"text-4xl"}>{uvIndex}</span>
        <span className={"text-[22px]"}>{"Normal"}</span>
      </div>
      <div
        className={classNames(
          styles.line,
          "w-[115px] h-[5px] mt-[17px] rounded-xl relative bg-gradient-to-r-",
        )}
      >
        <div
          className={"absolute w-3 h-3 bg-white rounded-full top-[-3px]"}
          style={{ marginLeft: `${uvIndex * 8.25}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UvIndicator;
