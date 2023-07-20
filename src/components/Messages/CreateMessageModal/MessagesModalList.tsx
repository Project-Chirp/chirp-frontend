import axios from "axios";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import MessagesModalListItem from "./MessagesModalListItem";

export type OtherUser = {
  otherUserId: number;
  displayName: string;
  username: string;
};

type MessagesListProps = {
  onClose: () => void;
};

const MessagesList = ({ onClose }: MessagesListProps) => {
  const user = useAppSelector((state) => state.user);
  const [conversationList, setConversationList] = useState<OtherUser[]>([]);

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/getModalConversations",
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setConversationList(result.data as OtherUser[]);
    };
    fetchConversationList();
  }, [user]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <MessagesModalListItem
          otherUser={o}
          key={o.otherUserId}
          onClose={onClose}
        />
      ))}
    </List>
  );
};

export default MessagesList;