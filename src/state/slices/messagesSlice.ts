import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Conversation = {
  displayName: string;
  otherUserId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

export type SelectedUser = {
  displayName: string;
  userId: number;
  username: string;
};

export type Message = {
  messageId: number;
  timestamp: string;
  textContent: string;
  sentUserId: number;
  receivedUserId: number;
};

type ConversationDetails = {
  selectedConversation: SelectedUser;
  conversations: Conversation[];
  messages: Message[];
};

const initialState: ConversationDetails = {
  selectedConversation: { displayName: "", username: "", userId: 0 },
  conversations: [],
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
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
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  updateConversation,
  appendConversation,
  setMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
