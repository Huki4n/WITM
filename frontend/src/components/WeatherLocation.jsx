import maps from '../assets/maps.svg'
import saved_cities from '../assets/saved.svg'
import search from '../assets/search.svg'

const CitiesList = ({cities, justify}) => {
  return <ul
      style={{
        justifySelf:`${justify}`
      }}
      className="weather-location__cities flex gap-[68px] text-white">
    <li className="city text-xl opacity-70 cursor-pointer">{cities[0]}</li>
    <li className="city text-xl opacity-70 cursor-pointer">{cities[1]}</li>
    <li className="city text-xl opacity-70 cursor-pointer">{cities[2]}</li>
    <li className="city text-xl opacity-70 cursor-pointer">{cities[3]}</li>
  </ul>
}

export default function WeatherLocation() {
  return <section className="weather-location__container col-start-1 col-end-3 row-start-1 row-end-2 mt-[19px]">
    <div className="weather-location grid grid-cols-[auto_auto_auto] items-center ">
      <CitiesList cities={['Tulsa','Los Angeles','Dallas','Washington']} justify={'start'}/>
      <div className="weather-location__panel flex gap-4 items-center justify-self-center ml-[68px]">
        <div className="weather-location__map cursor-pointer ">
          <img src={maps} alt={''}/>
        </div>
        <div className="weather-location__search py-3 pl-[14px] pr-[23px] bg-white rounded-full ">
          <form action="#" className={'flex gap-4 items-center'}>
            <img src={search} alt={''} className={'cursor-pointer'}/>
            <input placeholder={'Search for other locations..'} size={22} className={'input-search placeholder:text-base placeholder:text-black/[.4] text-black outline-0 ]'}/>
          </form>
        </div>
        <div className="weather-location__saved cursor-pointer">
          <img src={saved_cities} alt={''}/>
        </div>
      </div>
      <CitiesList cities={['Houston','San Francisco','New York','Perryville']} justify={'end'}/>
    </div>
  </section>
}