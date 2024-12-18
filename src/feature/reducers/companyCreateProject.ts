"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const companyCreateProjectIDSlice = createSlice({
  name: "CompanyCreateProjectID",
  initialState,
  reducers: {
    addProjectId: (state, action) => {
      return action.payload;
    },
    
    removeProjectId: () => {
      return initialState;
    },
  },
});

export const { addProjectId, removeProjectId } = companyCreateProjectIDSlice.actions;

export default companyCreateProjectIDSlice.reducer;
