import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  value: User;
};

type User = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

const initialState: UserState = {
  value: { isLoading: true },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
