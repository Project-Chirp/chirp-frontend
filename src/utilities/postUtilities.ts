import axios from "axios";

export const toggleLikePostRequest = async (
  isLikedByCurrentUser: boolean,
  postId: number,
  userId?: number
) => {
  if (isLikedByCurrentUser) {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/unlikePost`, {
      params: {
        postId,
        userId,
      },
    });
  } else {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/likePost`, {
      postId,
      userId,
    });
  }
};
