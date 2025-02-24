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
          data: { postId, userId },
        },
        "posts/undoRepost",
      );

      return null;
    } else {
      const newPost = await sendRequest(
        {
          method: "PUT",
          data: { parentPostId: postId, userId },
        },
        "posts/addRepost",
      );

      return newPost;
    }
  } catch (error) {
    console.error(error);
  }
};

export { toggleLikePostRequest, toggleRepostPostRequest };
