import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Conversation = SelectedUser & {
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

export type SelectedUser = {
  bio?: string;
  displayName: string;
  followerCount?: string;
  joinedDate?: string;
  userId: number;
  username: string;
};

type ConversationDetails = {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: SelectedUser;
};

const initialState: ConversationDetails = {
  conversations: [],
  messages: [],
  selectedConversation: {
    displayName: "",
    followerCount: "0",
    username: "",
    userId: 0,
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const updatedConversation = {
        displayName: state.selectedConversation.displayName,
        textContent: action.payload.textContent,
        timestamp: action.payload.timestamp,
        userId: state.selectedConversation.userId,
        username: state.selectedConversation.username,
      };
      const conversationExists = state.conversations.some(
        (o) =>
          o.userId === action.payload.receivedUserId ||
          o.userId === action.payload.sentUserId,
      );
      if (!conversationExists) {
        state.conversations.unshift(updatedConversation);
      } else {
        const newConversations = state.conversations.map((o) => {
          if (o.userId === updatedConversation.userId) {
            return updatedConversation;
          }
          return o;
        });
        state.conversations = newConversations;
      }
      state.messages = [...state.messages, action.payload];
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setSelectedConversation: (state, action: PayloadAction<SelectedUser>) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const {
  addMessage,
  setConversations,
  setMessages,
  setSelectedConversation,
} = messagesSlice.actions;

export default messagesSlice.reducer;
