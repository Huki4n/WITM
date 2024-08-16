import { createSlice } from "@reduxjs/toolkit";

const initialSavedCitiesState = {
  savedCitiesList: [],
};

export const savedCitiesSlice = createSlice({
  name: "savedCities",
  initialState: initialSavedCitiesState,

  reducers: {
    cityAdd: (state, action) => {
      const savedCity = action.payload;
      state.savedCitiesList.push(savedCity);
    },
  },
});
