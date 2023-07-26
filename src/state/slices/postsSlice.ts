import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Post = {
  displayName: string;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  numberOfLikes: number;
  numberOfReplies: number;
  postId: number;
  textContent: string;
  timestamp: string;
  username: string;
  isRepost: boolean;
  isQuotePost: boolean;
  parentPostId?: number;
};

type PostSliceType = {
  posts: Post[];
  expandedPost: Post;
};

const initialState: PostSliceType = {
  posts: [],
  expandedPost: {
    displayName: "",
    isLikedByCurrentUser: false,
    numberOfLikes: 0,
    numberOfReplies: 0,
    postId: 0,
    textContent: "",
    timestamp: "",
    username: "",
    isRepost: false,
    isQuotePost: false,
  },
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addReply: (state, action: PayloadAction<Post>) => {
      const newReply = {
        ...action.payload,
        numberOfLikes: 0,
        numberOfReplies: 0,
      };
      const newPosts = state.posts.map((o) => {
        if (o.postId === action.payload.parentPostId) {
          return {
            ...o,
            numberOfReplies: o.numberOfReplies + 1,
          };
        }
        return o;
      });
      state.posts = [newReply, ...newPosts];
      if (action.payload.parentPostId === state.expandedPost.postId) {
        state.expandedPost.numberOfReplies++;
      }
    },
    appendPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift({
        ...action.payload,
        numberOfLikes: 0,
        numberOfReplies: 0,
      });
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setExpandedPost: (state, action: PayloadAction<Post>) => {
      state.expandedPost = action.payload;
    },
    toggleLikePost: (state, action: PayloadAction<number>) => {
      const newPosts = state.posts.map((o) => {
        if (o.postId === action.payload) {
          const isLikedByCurrentUser = !o.isLikedByCurrentUser;
          return {
            ...o,
            isLikedByCurrentUser,
            numberOfLikes: isLikedByCurrentUser
              ? o.numberOfLikes + 1
              : o.numberOfLikes - 1,
          };
        }
        return o;
      });
      state.posts = newPosts;

      if (action.payload === state.expandedPost.postId) {
        const isLikedByCurrentUser = !state.expandedPost.isLikedByCurrentUser;
        state.expandedPost.isLikedByCurrentUser = isLikedByCurrentUser;
        isLikedByCurrentUser
          ? state.expandedPost.numberOfLikes++
          : state.expandedPost.numberOfLikes--;
      }
    },
  },
});

export const {
  addReply,
  appendPost,
  setPosts,
  setExpandedPost,
  toggleLikePost,
} = postsSlice.actions;

export default postsSlice.reducer;
