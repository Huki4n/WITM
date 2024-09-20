import { createSlice } from "@reduxjs/toolkit";

const initialCurrentWeatherState = {
  currentWeatherInfo: {},
  currentCity: "",
};

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: initialCurrentWeatherState,

  reducers: {
    setWeather: (state, action) => {
      state.currentWeatherInfo = action.payload;
    },
    setCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});
