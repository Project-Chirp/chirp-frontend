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

      state.posts.unshift({
        ...newPost,
        originalPostContent: {
          displayName: newPost.displayName,
          editedTimestamp: newPost.editedTimestamp,
          textContent: newPost.textContent!,
          timestamp: newPost.timestamp,
          username: newPost.username,
          imagePath: newPost.imagePath,
        },
        textContent: "",
        isRepostedByCurrentUser: true,
      });

      console.log(JSON.stringify(state.posts));

      const updatedRepostsWithPosts = state.posts.map((post) => {
        if ((post.parentPostId || post.postId) === newPost.parentPostId) {
          return {
            ...post,
            numberOfReposts: +post.numberOfReposts + 1,
            isRepostedByCurrentUser: true,
          };
        }

        return post;
      });

      state.posts = updatedRepostsWithPosts;
    },
    toggleLikePost: (state, action: PayloadAction<number>) => {
      console.log(JSON.stringify(state));

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
          console.log(JSON.stringify(post));

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

      // Update expanded post if it's related
      if (state.expandedPost) {
        if (
          state.expandedPost.postId === originalPostId ||
          (state.expandedPost.originalPostContent &&
            state.expandedPost.parentPostId === originalPostId)
        ) {
          const isLikedByCurrentUser = !state.expandedPost.isLikedByCurrentUser;
          state.expandedPost.isLikedByCurrentUser = isLikedByCurrentUser;
          state.expandedPost.numberOfLikes = isLikedByCurrentUser
            ? state.expandedPost.numberOfLikes + 1
            : state.expandedPost.numberOfLikes - 1;
        }
      }
      // const newPosts = state.posts.map((o) => {
      //   if (o.postId === action.payload) {
      //     const isLikedByCurrentUser = !o.isLikedByCurrentUser;
      //     return {
      //       ...o,
      //       isLikedByCurrentUser,
      //       numberOfLikes: isLikedByCurrentUser
      //         ? o.numberOfLikes + 1
      //         : o.numberOfLikes - 1,
      //     };
      //   }
      //   return o;
      // });
      // state.posts = newPosts;

      // if (action.payload === state.expandedPost.postId) {
      //   const isLikedByCurrentUser = !state.expandedPost.isLikedByCurrentUser;
      //   state.expandedPost.isLikedByCurrentUser = isLikedByCurrentUser;
      //   if (isLikedByCurrentUser) {
      //     state.expandedPost.numberOfLikes++;
      //   } else {
      //     state.expandedPost.numberOfLikes--;
      //   }
      // }
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
