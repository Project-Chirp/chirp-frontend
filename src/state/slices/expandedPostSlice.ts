import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "./postsSlice";

const initialState: Post = {
  displayName: "",
  isLikedByCurrentUser: false,
  numberOfLikes: 0,
  postId: 0,
  textContent: "",
  timestamp: "",
  username: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setExpandedPost: (_, action: PayloadAction<Post>) => {
      return action.payload;
    },
    updateExpandedPost: (_, action: PayloadAction<Post>) => {
      return action.payload;
    },
  },
});

export const { setExpandedPost, updateExpandedPost } = postSlice.actions;

export default postSlice.reducer;
