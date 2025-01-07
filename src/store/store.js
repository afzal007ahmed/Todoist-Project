import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice.js";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
