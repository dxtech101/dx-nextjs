"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const developerProfileSlice = createSlice({
  name: "DeveloperProfile",
  initialState,
  reducers: {
    addDeveloperProfile: (state, action) => {
      return action.payload;
    },
    addSalesforceId: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDeveloperProfile } = developerProfileSlice.actions;

export default developerProfileSlice.reducer;
