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
    updateUserIntroVideo: (state: any, action: any) => {
      return {
        ...state,
        intro_video: action.payload,
      };
    },
  },
});

export const { addUserProfile, updateUserIntroVideo } = userProfileSlice.actions;

export default userProfileSlice.reducer;
