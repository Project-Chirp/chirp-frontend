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

type ConversationDetails = {
  selectedConversation: SelectedUser;
  conversations: Conversation[];
};

const initialState: ConversationDetails = {
  selectedConversation: { displayName: "", username: "", userId: 0 },
  conversations: [],
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
  },
});

export const {
  setConversations,
  setSelectedConversation,
  updateConversation,
  appendConversation,
} = messagesSlice.actions;

export default messagesSlice.reducer;
