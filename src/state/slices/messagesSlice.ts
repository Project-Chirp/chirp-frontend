import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Conversation, Message } from "../../types/messages";
import { AvatarUser } from "../../types/users";

type MessageState = {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: AvatarUser;
};

const initialState: MessageState = {
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
    setSelectedConversation: (state, action: PayloadAction<AvatarUser>) => {
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
