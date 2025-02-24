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
    userId: 0,
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

      // required if statement because textContent in ReferencePost cannot be undefined whilst it can be in Post type.
      if (!newPost.textContent) return; // assuming there will always be textContent from the original post you plan on retweeting.

      state.posts.unshift({
        ...newPost,
        originalPostContent: {
          displayName: newPost.displayName,
          editedTimestamp: newPost.editedTimestamp,
          textContent: newPost.textContent,
          timestamp: newPost.timestamp,
          username: newPost.username,
          imagePath: newPost.imagePath,
        },
        textContent: "",
        isRepostedByCurrentUser: true,
        numberOfReposts: newPost.numberOfReposts + 1,
      });
    },
    undoRepost: (
      state,
      action: PayloadAction<{ postId: number; userId?: number }>,
    ) => {
      const { postId, userId } = action.payload;
      if (!postId || !userId) return;

      const userRepostIndex = state.posts.findIndex(
        (post) => post.parentPostId === postId && post.userId === userId,
      );

      if (postId && userRepostIndex !== -1) {
        state.posts.splice(userRepostIndex, 1); // filter out repost belonging to current user
      }
    },
    toggleRepost: (state, action: PayloadAction<number>) => {
      const postToUpdate = state.posts.find(
        (post) => post.postId === action.payload,
      );

      if (!postToUpdate) return;
      const originalPostId = postToUpdate.originalPostContent
        ? postToUpdate.parentPostId
        : postToUpdate.postId;

      const newPosts = state.posts.map((post) => {
        if (
          post.postId === originalPostId ||
          post.parentPostId === originalPostId
        ) {
          const isRepostedByCurrentUser = !post.isRepostedByCurrentUser;

          return {
            ...post,
            isRepostedByCurrentUser,
            numberOfReposts: isRepostedByCurrentUser
              ? post.numberOfReposts + 1
              : post.numberOfReposts - 1,
          };
        }
        return post;
      });

      state.posts = newPosts;
    },
    toggleExpandedPostRepost: (state) => {
      state.expandedPost.isRepostedByCurrentUser =
        !state.expandedPost.isRepostedByCurrentUser;

      if (state.expandedPost.isRepostedByCurrentUser) {
        state.expandedPost.numberOfReposts =
          state.expandedPost.numberOfReposts + 1;
      } else {
        state.expandedPost.numberOfReposts =
          state.expandedPost.numberOfReposts - 1;
      }
    },
    toggleLikePost: (state, action: PayloadAction<number>) => {
      const postToUpdate = state.posts.find((p) => p.postId === action.payload);
      if (!postToUpdate) return;

      // Get the original post ID - either from originalPostContent or the post itself
      const originalPostId = postToUpdate.originalPostContent
        ? postToUpdate.parentPostId
        : postToUpdate.postId;

      // Update all instances of this post (original and reposts)
      const newPosts = state.posts.map((post) => {
        // Match if this is the original post or any of its reposts
        if (
          post.postId === originalPostId || // if root post = originalPostId
          (post.originalPostContent && post.parentPostId === originalPostId) //if repost = original post id
        ) {
          const isLikedByCurrentUser = !post.isLikedByCurrentUser;
          return {
            ...post,
            isLikedByCurrentUser,
            numberOfLikes: isLikedByCurrentUser
              ? post.numberOfLikes + 1
              : post.numberOfLikes - 1,
          };
        }
        return post;
      });
      state.posts = newPosts;

      if (action.payload === state.expandedPost.postId) {
        console.log("I got here");
        const isLikedByCurrentUser = !state.expandedPost.isLikedByCurrentUser;
        state.expandedPost.isLikedByCurrentUser = isLikedByCurrentUser;
        if (isLikedByCurrentUser) {
          state.expandedPost.numberOfLikes++;
        } else {
          state.expandedPost.numberOfLikes--;
        }
      }
    },
    toggleLikeExpandedPost: (state, action: PayloadAction<number>) => {
      if (action.payload === state.expandedPost.postId) {
        console.log("I got here");
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
  toggleRepost,
  toggleExpandedPostRepost,
  toggleLikePost,
  toggleLikeExpandedPost,
  toggleFollow,
  updateDisplayNames,
  updatePost,
  undoRepost,
} = postsSlice.actions;

export default postsSlice.reducer;
