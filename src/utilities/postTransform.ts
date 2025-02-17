import { Post } from "../types/posts";

export const convertRepostToPost = (post: Post): Post => {
  if (!post.originalPostContent) return post;

  return {
    username: post.originalPostContent.username,
    displayName: post.originalPostContent.displayName,
    originalPostContent: post.originalPostContent,
    textContent: post.originalPostContent.textContent,
    isLikedByCurrentUser: post.isLikedByCurrentUser,
    isRepostedByCurrentUser: post.isRepostedByCurrentUser,
    timestamp: post.originalPostContent.timestamp,
    editedTimestamp: post.originalPostContent.editedTimestamp,
    numberOfLikes: post.numberOfLikes,
    numberOfReposts: post.numberOfReposts,
    numberOfReplies: post.numberOfReplies,
    followStatus: post.followStatus,
    userId: post.userId,
    postId: post.postId,
    parentPostId: post.parentPostId,
    imagePath: post.originalPostContent.imagePath,
    repostedByDisplayName: post.repostedByDisplayName,
  };
};
