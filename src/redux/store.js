import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userDetailsSlice";
import PostReducer from "./allSlices/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: PostReducer,
  },
});
