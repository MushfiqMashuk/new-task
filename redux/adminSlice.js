import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const adminSlice = createSlice({
  name: "admin",
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

export const { addUser, updateUser } = adminSlice.actions;
export default adminSlice.reducer;
