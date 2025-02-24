import { Post } from "../types/posts";

/**
 * Repost Item data that needs to be transformed to how a Regular Post Item is being displayed.
 * I needed this because when we return a post object from the database,
 * we cannot simply populate the Post object like a regular post.
 *
 * It is important to take the original content object being returned
 * and transforming this data to look like a regular post item so that the
 * post item component can read it like normal without needing to place conditionals
 * depending on whether it is a repost or a regular post.
 *
 * TODO: move to postUtilities.ts
 */
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
