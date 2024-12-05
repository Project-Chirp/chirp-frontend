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
      "posts/unlikePost"
    );
  } else {
    await sendRequest(
      {
        method: "POST",
        data: { postId, userId },
      },
      "posts/likePost"
    );
  }
};

export default toggleLikePostRequest;
