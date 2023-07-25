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
      state.posts.unshift({ ...action.payload, numberOfLikes: 0 });
    },
    likePost: (state, action: PayloadAction<number>) => {
      const newPosts = state.posts.map((o) => {
        if (o.postId === action.payload) {
          return {
            ...o,
            isLikedByCurrentUser: true,
            numberOfLikes: o.numberOfLikes + 1,
          };
        }
        return o;
      });
      state.posts = newPosts;
      if (action.payload === state.expandedPost.postId) {
        state.expandedPost.isLikedByCurrentUser = true;
        state.expandedPost.numberOfLikes++;
      }
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setExpandedPost: (state, action: PayloadAction<Post>) => {
      state.expandedPost = action.payload;
    },
    unlikePost: (state, action: PayloadAction<number>) => {
      const newPosts = state.posts.map((o) => {
        if (o.postId === action.payload) {
          return {
            ...o,
            isLikedByCurrentUser: false,
            numberOfLikes: o.numberOfLikes - 1,
          };
        }
        return o;
      });
      state.posts = newPosts;
      if (action.payload === state.expandedPost.postId) {
        state.expandedPost.isLikedByCurrentUser = false;
        state.expandedPost.numberOfLikes--;
      }
    },
  },
});

export const {
  addReply,
  appendPost,
  likePost,
  setPosts,
  setExpandedPost,
  unlikePost,
} = postsSlice.actions;

export default postsSlice.reducer;
