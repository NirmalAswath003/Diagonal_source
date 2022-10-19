import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./data.js";

export default configureStore({
  reducer: {
    data: apiReducer,
  },
});
