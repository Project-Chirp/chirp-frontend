import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
  bio?: string;
  joinedDate?: string;
  followerCount?: string;
};

type ConversationDetails = {
  selectedConversation: SelectedUser;
  conversations: Conversation[];
};

const initialState: ConversationDetails = {
  selectedConversation: {
    displayName: "",
    username: "",
    userId: 0,
  },
  conversations: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift({ ...action.payload });
    },
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
      newConversations.sort((a, b) => {
        const dateA = dayjs(a.timestamp);
        const dateB = dayjs(b.timestamp);
        if (dateA.isAfter(dateB)) {
          return -1;
        }
        if (dateA.isBefore(dateB)) {
          return 1;
        }
        return 0;
      });
      state.conversations = newConversations;
    },
  },
});

export const {
  addConversation,
  setConversations,
  setSelectedConversation,
  updateConversation,
} = messagesSlice.actions;

export default messagesSlice.reducer;
