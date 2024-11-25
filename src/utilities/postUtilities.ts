import { SendRequestProps } from "./useAxios";

const toggleLikePostRequest = async (
  sendRequest: (config: SendRequestProps) => Promise<any>,
  isLikedByCurrentUser: boolean,
  postId: number,
  userId?: number
) => {
  if (isLikedByCurrentUser) {
    await sendRequest({
      endpoint: "posts/unlikePost",
      config: {
        method: "DELETE",
        data: { postId, userId },
      },
    });
  } else {
    await sendRequest({
      endpoint: "posts/likePost",
      config: {
        method: "POST",
        data: { postId, userId },
      },
    });
  }
};

export default toggleLikePostRequest;
