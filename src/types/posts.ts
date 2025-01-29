export type Post = {
  displayName: string;
  followStatus: boolean;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  isRepostedByCurrentUser: boolean;
  numberOfLikes: number;
  numberOfReplies: number;
  numberOfReposts: number;
  originalPostContent?: {
    textContent: string;
    timestamp: string;
    username: string;
    editedTimestamp: string;
    displayName: string;
    imagePath?: string;
  };
  parentPostId?: number;
  postId: number;
  textContent?: string;
  timestamp: string;
  username: string;
  editedTimestamp: string;
};
