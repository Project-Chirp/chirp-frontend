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
    addPost: (state, action: PayloadAction<Post>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
