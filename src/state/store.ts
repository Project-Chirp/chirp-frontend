import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import messagesSlice from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    posts: postsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
