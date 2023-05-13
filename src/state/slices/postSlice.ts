import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../components/Posts/PostList";

const initialState: Post[] = [];

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload;
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const newPosts = state.map((o) => {
        if (o.postId === action.payload.postId) {
          return action.payload;
        }
        return o;
      });
      return newPosts;
    },
  },
});

export const { addPosts, updatePost } = postSlice.actions;

export default postSlice.reducer;
