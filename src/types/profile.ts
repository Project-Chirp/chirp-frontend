export type ProfileContent = {
  bio?: string;
  birthDate?: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  followStatus: boolean;
  joinedDate: string;
  postCount: number;
  userId?: number;
  username: string;
};

export type EditableProfileContent = Pick<
  ProfileContent,
  "bio" | "birthDate" | "displayName"
>;
