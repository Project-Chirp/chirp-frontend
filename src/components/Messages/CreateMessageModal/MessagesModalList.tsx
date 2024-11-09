import axios from "axios";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import MessagesModalListItem from "./MessagesModalListItem";
import { SelectedUser } from "../../../state/slices/messagesSlice";

type MessagesListProps = {
  onClose: () => void;
};

const MessagesList = ({ onClose }: MessagesListProps) => {
  const user = useAppSelector((state) => state.user);
  const [conversationList, setConversationList] = useState<SelectedUser[]>([]);

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/messages/getModalConversations`,
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setConversationList(result.data as SelectedUser[]);
    };
    fetchConversationList();
  }, [user]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <MessagesModalListItem otherUser={o} key={o.userId} onClose={onClose} />
      ))}
    </List>
  );
};

export default MessagesList;
