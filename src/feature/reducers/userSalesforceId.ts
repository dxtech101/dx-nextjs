"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const userSalesforceIDSlice = createSlice({
  name: "UserSalesforceID",
  initialState,
  reducers: {
    addSalesforceId: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSalesforceId } = userSalesforceIDSlice.actions;

export default userSalesforceIDSlice.reducer;
