import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Conversation = {
  displayName: string;
  otherUserId: number;
  textContent: string;
  timestamp: string;
  username: string;
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
    username: "",
    userId: 0,
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setSelectedConversation: (state, action: PayloadAction<SelectedUser>) => {
      state.selectedConversation = action.payload;
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const newConversations = state.conversations.map((o) => {
        if (o.otherUserId === action.payload.otherUserId) {
          return action.payload;
        }
        return o;
      });
      state.conversations = newConversations;
    },
    appendConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift({ ...action.payload });
    },
  },
});

export const {
  setConversations,
  setMessages,
  setSelectedConversation,
  updateConversation,
  appendConversation,
} = messagesSlice.actions;

export default messagesSlice.reducer;
