export type BaseUser = {
  displayName: string;
  imageUrl?: string;
  userId: number;
  username: string;
};

export type FollowableUser = BaseUser & {
  isFollowing: boolean;
};
