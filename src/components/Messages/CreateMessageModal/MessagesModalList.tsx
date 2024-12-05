import axios from "axios";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import { SelectedUser } from "../../../state/slices/messagesSlice";
import MessagesModalListItem from "./MessagesModalListItem";

type MessagesListProps = {
  onClose: () => void;
};

const MessagesList = ({ onClose }: MessagesListProps) => {
  const user = useAppSelector((state) => state.user);
  const [conversationList, setConversationList] = useState<SelectedUser[]>([]);

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/getModalConversations",
        {
          params: {
            userId: user.userId,
          },
        },
      );
      setConversationList(result.data as SelectedUser[]);
    };
    fetchConversationList();
  }, [user]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <MessagesModalListItem key={o.userId} onClose={onClose} otherUser={o} />
      ))}
    </List>
  );
};

export default MessagesList;
