import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/posts";

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
    isRepostedByCurrentUser: false,
    numberOfLikes: 0,
    numberOfReplies: 0,
    numberOfReposts: 0,
    parentPostId: 0,
    postId: 0,
    textContent: "",
    timestamp: "",
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
        followStatus: false,
        isLikedByCurrentUser: false,
        isRepostedByCurrentUser: false,
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
    addRepost: (state, action: PayloadAction<Post>) => {
      const newPost = action.payload;

      if (newPost.textContent) {
        state.posts.unshift({
          ...newPost,
          textContent: "",
          originalPostContent: {
            displayName: newPost.displayName,
            editedTimestamp: newPost.editedTimestamp,
            textContent: newPost.textContent,
            timestamp: newPost.timestamp,
            username: newPost.username,
            imagePath: newPost.imagePath,
          },
          isRepostedByCurrentUser: true,
          followStatus: newPost.followStatus,
          isLikedByCurrentUser: newPost.isLikedByCurrentUser,
          numberOfLikes: newPost.numberOfLikes,
          numberOfReposts: newPost.numberOfReposts,
          numberOfReplies: newPost.numberOfReplies,
          displayName: newPost.displayName,
        });
      }

      const updatedRepostsWithPosts = state.posts.map((post) => {
        if (post.parentPostId || post.postId === newPost.parentPostId) {
          return {
            ...post,
            numberOfReposts: post.numberOfReposts + 1,
            isRepostedByCurrentUser: true,
          };
        }

        return post;
      });

      console.log(updatedRepostsWithPosts);

      state.posts = updatedRepostsWithPosts;
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

export const {
  addReply,
  appendPost,
  deletePost,
  setPosts,
  setExpandedPost,
  addRepost,
  toggleLikePost,
  toggleFollow,
  updateDisplayNames,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;
