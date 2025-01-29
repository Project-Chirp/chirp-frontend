import { BaseUser } from "./users";

export type ProfileContent = BaseUser & {
  bio?: string;
  birthDate?: string;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
  joinedDate: string;
  postCount: number;
};

export type EditableProfileContent = Pick<
  ProfileContent,
  "bio" | "birthDate" | "displayName"
>;
