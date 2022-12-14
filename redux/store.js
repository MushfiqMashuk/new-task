import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import employeeReducer from "./employeeSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    employee: employeeReducer,
  },
});

export default store;
