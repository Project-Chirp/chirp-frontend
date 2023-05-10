import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../components/Posts/PostList";

type PostState = {
  value: Post[];
};

const initialState: PostState = {
  value: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.value = action.payload;
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const newPosts = state.value.map((o) => {
        if (o.postId === action.payload.postId) {
          return action.payload;
        }
        return o;
      });
      state.value = newPosts;
    },
  },
});

export const { addPosts, updatePost } = postSlice.actions;

export default postSlice.reducer;
