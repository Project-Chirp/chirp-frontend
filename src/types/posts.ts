export type Post = {
  displayName: string;
  followStatus: boolean;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  isRepostedByCurrentUser: boolean;
  numberOfLikes: number;
  numberOfReplies: number;
  numberOfReposts: number;
  originalPostContent?: ReferencePost;
  parentPostId?: number;
  postId: number;
  textContent?: string;
  timestamp: string;
  username: string;
  editedTimestamp: string;
  repostedByDisplayName?: string;
  userId: number;
};

type ReferencePost = {
  textContent: string;
  timestamp: string;
  username: string;
  editedTimestamp: string;
  displayName: string;
  imagePath?: string;
};

//quote posts have both original post content and textContent
//reposts has original post content but do not have textContent
