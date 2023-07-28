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
