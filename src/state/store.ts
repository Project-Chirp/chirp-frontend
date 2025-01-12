import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./slices/messagesSlice";
import postsSlice from "./slices/postsSlice";
import toastSlice from "./slices/toastSlice";
import userSlice from "./slices/userSlice";

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
