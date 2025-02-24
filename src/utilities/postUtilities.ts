import { AxiosRequestConfig } from "axios";
import { Post } from "../types/posts";

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

const transformPost = (post: Post): Post => {
  // If it's a regular post (no originalPostContent), return as is
  if (!post.originalPostContent) return post;

  // If it's a repost (has originalPostContent but no textContent)
  if (!post.textContent) {
    return {
      ...post,
      username: post.originalPostContent.username,
      displayName: post.originalPostContent.displayName,
      textContent: post.originalPostContent.textContent,
      timestamp: post.originalPostContent.timestamp,
      editedTimestamp: post.originalPostContent.editedTimestamp,
      imagePath: post.originalPostContent.imagePath,
      repostedByDisplayName: post.repostedByDisplayName,
      originalPostContent: post.originalPostContent,
    };
  }

  // If it's a quote post (has both originalPostContent and textContent), return as is
  return post;
};

export { toggleLikePostRequest, toggleRepostPostRequest, transformPost };
