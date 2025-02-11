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

const toggleRepostPostRequest = async (
  sendRequest: (config: AxiosRequestConfig, endpoint: string) => Promise<any>,
  isRepostedByCurrentUser: boolean,
  postId: number,
  userId?: number,
) => {
  try {
    if (isRepostedByCurrentUser) {
      await sendRequest(
        {
          method: "PUT",
          data: { parentPostId: postId },
        },
        "posts/deleteRepost",
      );
    } else {
      await sendRequest(
        {
          method: "PUT",
          data: { parentPostId: postId, userId },
        },
        "posts/addRepost",
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export { toggleLikePostRequest, toggleRepostPostRequest };
