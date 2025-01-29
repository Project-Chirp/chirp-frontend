import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CurrentUser = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

const initialState: CurrentUser = {
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setUser: (_, action: PayloadAction<CurrentUser>) => {
      return { ...action.payload };
    },
  },
});

export const { setDisplayName, setUser } = userSlice.actions;

export default userSlice.reducer;
