export type Post = {
  displayName: string;
  followStatus: boolean;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  isQuotePost?: boolean;
  isRepost?: boolean;
  numberOfLikes: number;
  numberOfReplies: number;
  numberOfReposts: number;
  parentPostId?: number;
  postId: number;
  textContent: string;
  timestamp: string;
  userId: number;
  username: string;
  editedTimestamp: string;
};
