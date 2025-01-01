import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AvatarUser = {
  displayName: string;
  imageUrl?: string;
  userId: number;
  username: string;
};

export type FollowableUser = AvatarUser & {
  isFollowing: boolean;
};

type User = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

const initialState: User = {
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setUser: (_, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
  },
});

export const { setDisplayName, setUser } = userSlice.actions;

export default userSlice.reducer;
