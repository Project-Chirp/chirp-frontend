import { ProfileContent } from "./profile";

export type ChatBioType = Pick<
  ProfileContent,
  "bio" | "displayName" | "followerCount" | "joinedDate" | "userId" | "username"
>;
