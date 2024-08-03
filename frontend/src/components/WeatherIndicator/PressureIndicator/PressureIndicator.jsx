import pressure_arrow from "../../../assets/pressure_arrow.svg";
import classNames from "classnames";
import styles from './PressureIndicator.module.scss'

const PressureIndicator = ({pressure}) => {
  return <>
    <div className={classNames(styles.pressure,'flex flex-col bg-black/[.50] rounded-full backdrop-blur-[20px] px-[28.5px] pt-[22px] pb-[11px] mb-2 mt-2')}>
      <span className={classNames(styles.pressureNum,'text-4xl mt-5 relative z-[5]')}>{pressure}</span>
      <span className={'text-sm text-white/[.5] mt-[-3px] z-[5]'}>Atm</span>
      <span className={'text-base mt-[-5px] z-[5]'}>mm Hg</span>
    </div>
    <img
        style={{rotate: `${(pressure-750)*2.7}deg`}}
        className={styles.pressureArrow} src={pressure_arrow} alt={''}
    />
  </>
}
export default PressureIndicator;