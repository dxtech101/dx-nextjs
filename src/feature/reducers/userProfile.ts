"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const userProfileSlice = createSlice({
  name: "UserProfile",
  initialState,
  reducers: {
    addUserProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
