"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const UserCompanySlice = createSlice({
  name: "UserCompany",
  initialState,
  reducers: {
    addUserCompany: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserCompany } = UserCompanySlice.actions;

export default UserCompanySlice.reducer;
