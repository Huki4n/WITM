import maps from '../../assets/maps.svg'
import saved_cities from '../../assets/saved.svg'
import search from '../../assets/search.svg'
import {memo, useEffect, useState} from "react";
import classNames from "classnames";
import styles from './WeatherLocation.module.scss'

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

const FormSearchCity = ({city,setCity,setAddress}) => {
  const [coordinates,setCoordinates] = useState()

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_ADRRESS_API_KEY}&geocode=${city.city}}&lang=en_RU&results=1&format=json`)
        .then(response => response.json())
        .then(response => {
          if(response?.response){
            setCoordinates(response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' '))
          }
        })
        .catch(() => console.log('Error address'))

  }

  const updateData = e => {
    e.preventDefault();
    setCity({
          ...city,
          [e.target.name]: e.target.value
    });
  }

  return <form action="#" className={'flex gap-4 items-center'} onSubmit={handleSubmit}>
    <button className={'bg-none'} type={'submit'}>
      <img src={search} alt={''} className={'cursor-pointer'} />
    </button>
    <input type={'text'} name = {'city'} onChange={updateData}
        placeholder={'Search for other locations..'} size={22}
        className={classNames(styles.inputSearch,'placeholder:text-base placeholder:text-black/[.4] text-black outline-0 ]')}/>
  </form>
}

const SavedCities = () => {
  const [showCities,setShowCities] = useState(false)

  return <div className={classNames(styles.saved,'cursor-pointer relative')}>
    <img src={saved_cities} alt={''} className={'saved-cities__icon'}/>
    <div className={classNames(styles.savedCities,'min-w-max max-h-0 overflow-hidden absolute top-[150%] left-[-300%]')}>
      <ul className={'saved-cities__list grid grid-cols-2 bg-white p-4 rounded-xl'}>
        <li>Tulsa</li>
        <li>Los Angeles</li>
        <li>Dallas</li>
        <li>Washington</li>
        <li>Houston</li>
        <li>San Francisco</li>
        <li>New York</li>
        <li>Perryville</li>
      </ul>
    </div>
  </div>
}

const WeatherLocation = memo(() => {
  const [city, setCity] = useState([]);
  const [address, setAddress] = useState()

  return <header className="col-start-1 col-end-3 row-start-1 row-end-2 mt-[19px]">
    <div className="grid grid-cols-[auto_auto_auto] items-center ">
      <CitiesList cities={['Tulsa', 'Los Angeles', 'Dallas', 'Washington']} justify={'start'}/>
      <div className="flex gap-4 items-center justify-self-center ml-[68px]">
        <div className="cursor-pointer ">
          <img src={maps} alt={''}/>
        </div>
        <div className="py-3 pl-[14px] pr-[23px] bg-white rounded-full ">
          <FormSearchCity city={city} setCity={setCity} setAddress={setAddress}/>
        </div>
        <SavedCities/>
      </div>
      <CitiesList cities={['Houston', 'San Francisco', 'New York', 'Perryville']} justify={'end'}/>
    </div>
  </header>
});

export default WeatherLocation;