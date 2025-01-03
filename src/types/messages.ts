import { AvatarUser } from "./users";

export type Conversation = AvatarUser & {
  textContent?: string;
  timestamp?: string;
};

export type Message = {
  messageId: number;
  timestamp: string;
  textContent: string;
  sentUserId: number;
  receivedUserId: number;
};
