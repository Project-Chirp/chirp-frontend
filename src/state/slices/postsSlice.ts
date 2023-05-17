import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Post = {
  displayName: string;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  numberOfLikes: number;
  postId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

const initialState: Post[] = [];

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (_, action: PayloadAction<Post[]>) => {
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

export const { setPosts, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
