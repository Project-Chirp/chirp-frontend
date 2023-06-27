import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Conversation = {
  displayName: string;
  otherUserId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

type SelectedConversation = {
  displayName: string;
  userId: number;
  username: string;
};

type ConversationDetails = {
  selectedConversation: SelectedConversation;
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
    setSelectedConversation: (
      state,
      action: PayloadAction<SelectedConversation>
    ) => {
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
  },
});

export const { setConversations, setSelectedConversation, updateConversation } =
  messagesSlice.actions;

export default messagesSlice.reducer;
