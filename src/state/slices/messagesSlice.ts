import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type selectedConversation = {
  displayName: string;
  userId: number;
  username: string;
};

const initialState: selectedConversation = {
  displayName: "",
  username: "",
  userId: 0,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSelectedConversation: (
      _,
      action: PayloadAction<selectedConversation>
    ) => {
      return action.payload;
    },
  },
});

export const { setSelectedConversation } = messagesSlice.actions;

export default messagesSlice.reducer;
