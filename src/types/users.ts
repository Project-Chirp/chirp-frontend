export type AvatarUser = {
  displayName: string;
  imageUrl?: string;
  userId: number;
  username: string;
};

export type FollowableUser = AvatarUser & {
  isFollowing: boolean;
};
