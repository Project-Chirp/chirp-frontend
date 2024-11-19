import axios from "axios";

export const toggleLikePostRequest = async (
  isLikedByCurrentUser: boolean,
  postId: number,
  userId?: number
) => {
  if (isLikedByCurrentUser) {
    await axios.delete("http://localhost:3001/api/posts/unlikePost", {
      params: {
        postId,
        userId,
      },
    });
  } else {
    await axios.post("http://localhost:3001/api/posts/likePost", {
      postId,
      userId,
    });
  }
};

export const toggleRepostRequest = async (
  isRepostedByCurrentUser: boolean,
  parentPostId: number,
  userId?: number
) => {
  if (isRepostedByCurrentUser) {
    await axios.delete("http://localhost:3001/api/posts/deleteRepost", {
      params: {
        userId,
        parentPostId,
      },
    });
  } else {
    await axios.post("http://localhost:3001/api/posts/addRepost", {
      userId,
      parentPostId,
    });
  }
};
