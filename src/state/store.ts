import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import messagesSlice from "./slices/messagesSlice";
import toastSlice from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    posts: postsSlice,
    toast: toastSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
