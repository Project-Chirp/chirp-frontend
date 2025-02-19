import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/posts";
import { RootState } from "../store";

type PostState = {
  posts: Post[];
  expandedPost: Post;
};

const initialState: PostState = {
  posts: [],
  expandedPost: {
    displayName: "",
    followStatus: false,
    isLikedByCurrentUser: false,
    numberOfLikes: 0,
    numberOfReplies: 0,
    numberOfReposts: 0,
    postId: 0,
    textContent: "",
    timestamp: "",
    userId: 0,
    username: "",
    editedTimestamp: "",
  },
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addReply: (state, action: PayloadAction<Post>) => {
      const newReply = {
        ...action.payload,
        numberOfLikes: 0,
        numberOfReplies: 0,
        numberOfReposts: 0,
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
        numberOfReposts: 0,
      });
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(
        (post) => post.postId !== action.payload,
      );
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
        if (isLikedByCurrentUser) {
          state.expandedPost.numberOfLikes++;
        } else {
          state.expandedPost.numberOfLikes--;
        }
      }
    },
    toggleFollow: (state) => {
      state.expandedPost.followStatus = !state.expandedPost.followStatus;
    },
    updateDisplayNames: (
      state,
      action: PayloadAction<{
        prevDisplayName: string;
        newDisplayName: string;
      }>,
    ) => {
      state.posts = state.posts.map((o) =>
        o.displayName === action.payload.prevDisplayName
          ? { ...o, displayName: action.payload.newDisplayName }
          : o,
      );
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map((o) => {
        if (o.postId === action.payload.postId) {
          return action.payload;
        }
        return o;
      });
    },
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectExpandedPost = (state: RootState) =>
  state.posts.expandedPost;

export const selectNonReplyPosts = createSelector([selectPosts], (posts) =>
  posts.filter((o) => o.parentPostId == undefined),
);

export const selectReplies = createSelector(
  [selectPosts, (state, parentPostId) => parentPostId],
  (posts, parentPostId) => posts.filter((o) => o.parentPostId === parentPostId),
);

export const {
  addReply,
  appendPost,
  deletePost,
  setPosts,
  setExpandedPost,
  toggleLikePost,
  toggleFollow,
  updateDisplayNames,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;
