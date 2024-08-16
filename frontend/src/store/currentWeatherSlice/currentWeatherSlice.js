import { createSlice } from "@reduxjs/toolkit";

const initialCurrentWeatherState = {
  currentWeatherInfo: {},
};

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: initialCurrentWeatherState,

  reducers: {
    setWeather: (state, action) => {
      state.currentWeatherInfo = action.payload;
    },
  },
});
