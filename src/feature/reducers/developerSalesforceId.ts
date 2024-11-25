"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const developerSalesforceIDSlice = createSlice({
  name: "DeveloperSalesforceID",
  initialState,
  reducers: {
    addSalesforceId: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSalesforceId } = developerSalesforceIDSlice.actions;

export default developerSalesforceIDSlice.reducer;
