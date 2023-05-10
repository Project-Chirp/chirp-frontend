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
  },
});

export const { addPosts } = postSlice.actions;

export default postSlice.reducer;
