import React from 'react';

import sunrise_upper from '../../assets/background_mountain/sunrise/upper_layer.svg'
import sunrise_mid from '../../assets/background_mountain/sunrise/mid_layer.svg'
import sunrise_lower from '../../assets/background_mountain/sunrise/lower_layer.svg'

import morning_upper from '../../assets/background_mountain/morning/upper_layer.svg'
import morning_mid from '../../assets/background_mountain/morning/mid_layer.svg'
import morning_lower from '../../assets/background_mountain/morning/lower_layer.svg'

import midday_upper from '../../assets/background_mountain/midday/upper_layer.svg'
import midday_mid from '../../assets/background_mountain/midday/mid_layer.svg'
import midday_lower from '../../assets/background_mountain/midday/lower_layer.svg'

import afternoon_upper from '../../assets/background_mountain/afternoon/upper_layer.svg'
import afternoon_mid from '../../assets/background_mountain/afternoon/mid_layer.svg'
import afternoon_lower from '../../assets/background_mountain/afternoon/lower_layer.svg'

import sunset_upper from '../../assets/background_mountain/sunset/upper_layer.svg'
import sunset_mid from '../../assets/background_mountain/sunset/mid_layer.svg'
import sunset_lower from '../../assets/background_mountain/sunset/lower_layer.svg'

import night_upper from '../../assets/background_mountain/night/upper_layer.svg'
import night_mid from '../../assets/background_mountain/night/mid_layer.svg'
import night_lower from '../../assets/background_mountain/night/lower_layer.svg'

const backgroundColor = React.createContext({
  sunrise: {
    sun: '#FFFFFF',
    bg: '#B4DFFF',
    upper: sunrise_upper,
    mid: sunrise_mid,
    lower: sunrise_lower
  },
  morning: {
    sun: '#FFF2C5',
    bg: '#E1F3FF',
    upper: morning_upper,
    mid: morning_mid,
    lower: morning_lower
  },
  midday: {
    sun: '#FFE99C',
    bg: '#A0D4E7',
    upper: midday_upper,
    mid: midday_mid,
    lower: midday_lower
  },
  afternoon:{
    sun: '#FFDF6E',
    bg: '#A1BCE7',
    upper: afternoon_upper,
    mid: afternoon_mid,
    lower: afternoon_lower
  },
  sunset:{
    sun: '#FF7F3F',
    bg: '#FABCAC',
    upper: sunset_upper,
    mid: sunset_mid,
    lower: sunset_lower
  },
  night:{
    sun: '#FFFFFF',
    bg: '#342BA2',
    upper: night_upper,
    mid: night_mid,
    lower: night_lower
  }
});

export default backgroundColor;