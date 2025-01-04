import { BaseUser } from "./users";

export type Conversation = BaseUser & {
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
