import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser, updateUser } = employeeSlice.actions;
export default employeeSlice.reducer;
