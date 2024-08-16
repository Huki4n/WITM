import { configureStore } from "@reduxjs/toolkit";
import { savedCitiesSlice } from "./savedCitiesSlice/savedCitiesSlice";
import { currentWeatherApi } from "../services/OpenWeatherApi";
import { currentWeatherSlice } from "./currentWeatherSlice/currentWeatherSlice";

export const store = configureStore({
  reducer: {
    [savedCitiesSlice.name]: savedCitiesSlice.reducer,
    [currentWeatherApi.reducerPath]: currentWeatherApi.reducer,
    [currentWeatherSlice.name]: currentWeatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currentWeatherApi.middleware),
});
