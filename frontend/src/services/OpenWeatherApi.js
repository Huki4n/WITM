import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currentWeatherApi = createApi({
  reducerPath: "currentWeatherApi",

  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),

  endpoints: (build) => ({
    getCurrentWeather: build.query({
      query: (args) => {
        const { lat, lon } = args;
        return {
          url: `weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric&lang=ru`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCurrentWeatherQuery } = currentWeatherApi;
export const { getCurrentWeather } = currentWeatherApi.endpoints;
