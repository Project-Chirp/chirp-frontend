import { AxiosRequestConfig } from "axios";

const toggleLikePostRequest = async (
  sendRequest: (config: AxiosRequestConfig, endpoint: string) => Promise<any>,
  isLikedByCurrentUser: boolean,
  postId: number,
  userId?: number,
) => {
  if (isLikedByCurrentUser) {
    await sendRequest(
      {
        method: "DELETE",
        data: { postId, userId },
      },
      "posts/unlikePost",
    );
  } else {
    await sendRequest(
      {
        method: "POST",
        data: { postId, userId },
      },
      "posts/likePost",
    );
  }
};

export const toggleRepostRequest = async (
  isRepostedByCurrentUser: boolean,
  parentPostId: number,
  userId?: number,
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

export default toggleLikePostRequest;
