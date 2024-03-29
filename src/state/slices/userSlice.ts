import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

const initialState: User = {
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
