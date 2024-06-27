import axios, { AxiosRequestConfig } from "axios";
import useAxios, { SendRequestProps } from "./useAxios";

const toggleLikePostRequest = async (
  sendRequest: (config: SendRequestProps) => Promise<any>,
  isLikedByCurrentUser: boolean,
  postId: number,
  userId?: number
) => {
  if (isLikedByCurrentUser) {
    await sendRequest({
      endpoint: "posts/unlikePost",
      method: "DELETE",
      body: { postId, userId },
    });
  } else {
    await sendRequest({
      endpoint: "posts/likePost",
      method: "POST",
      body: { postId, userId },
    });
  }
};

export default toggleLikePostRequest;
