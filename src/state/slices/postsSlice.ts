import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Post = {
  displayName: string;
  followStatus: boolean;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  isRepostedByCurrentUser: boolean;
  isQuotePost?: boolean;
  isRepost?: boolean;
  numberOfLikes: number;
  numberOfReplies: number;
  numberOfReposts: number;
  parentPostId?: number;
  postId: number;
  textContent: string;
  timestamp: string;
  userId: number;
  username: string;
  repostedUsername?: string;
  editedTimestamp: string;
};

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
    postId: 0,
    textContent: "",
    timestamp: "",
    userId: 0,
    username: "",
    editedTimestamp: "",
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
        (post) => post.postId !== action.payload
      );
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setExpandedPost: (state, action: PayloadAction<Post>) => {
      state.expandedPost = action.payload;
    },
    toggleRepost: (state, action: PayloadAction<number>) => {
      const newPosts = state.posts.map((o) => {
        if (o.postId === action.payload) {
          const isRepostedByCurrentUser = !o.isRepostedByCurrentUser;
          return {
            ...o,
            isRepostedByCurrentUser,
            numberOfReposts: isRepostedByCurrentUser
              ? Number(o.numberOfReposts + 1)
              : Number(o.numberOfReposts - 1),
          };
        }
        return o;
      });

      state.posts = newPosts;

      if (action.payload === state.expandedPost.postId) {
        const isRepostedByCurrentUser =
          !state.expandedPost.isRepostedByCurrentUser;
        state.expandedPost.isRepostedByCurrentUser = isRepostedByCurrentUser;
        isRepostedByCurrentUser
          ? state.expandedPost.numberOfReposts++
          : state.expandedPost.numberOfReposts--;
      }
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
    toggleFollow: (state) => {
      state.expandedPost.followStatus = !state.expandedPost.followStatus;
    },
    undoRepost: (
      state,
      action: PayloadAction<{ parentPostId: number; repostedUsername?: string }>
    ) => {
      const { parentPostId, repostedUsername } = action.payload;

      state.posts = state.posts
        .filter((post) => {
          return !(
            post.isRepost &&
            post.parentPostId === parentPostId &&
            post.isRepostedByCurrentUser &&
            post.repostedUsername === repostedUsername
          );
        })
        .map((post) => {
          if (
            post.postId === parentPostId ||
            post.parentPostId === parentPostId
          ) {
            return { ...post, isRepostedByCurrentUser: false };
          }

          return post;
        });
    },
    updateDisplayNames: (
      state,
      action: PayloadAction<{ prevDisplayName: string; newDisplayName: string }>
    ) => {
      state.posts = state.posts.map((o) =>
        o.displayName === action.payload.prevDisplayName
          ? { ...o, displayName: action.payload.newDisplayName }
          : o
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
  toggleRepost,
  toggleLikePost,
  toggleFollow,
  undoRepost,
  updateDisplayNames,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;
