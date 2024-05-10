import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./slices/messagesSlice";
import postsSlice from "./slices/postsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    posts: postsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
