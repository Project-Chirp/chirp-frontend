import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

const initialState: User = {
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // state.displayName = action.payload.displayName;
      // state.isLoading = action.payload.isLoading;
      // state.userId = action.payload.userId;
      // state.username = action.payload.username;
      state = action.payload;
      console.log(state);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
