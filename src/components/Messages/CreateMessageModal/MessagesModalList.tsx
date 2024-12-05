import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../state/hooks";
import { SelectedUser } from "../../../state/slices/messagesSlice";
import useAxios from "../../../utilities/useAxios";
import MessagesModalListItem from "./MessagesModalListItem";

type MessagesListProps = {
  onClose: () => void;
};

const MessagesList = ({ onClose }: MessagesListProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [conversationList, setConversationList] = useState<SelectedUser[]>([]);
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { userId },
        },
        "messages/getModalConversations",
      );
      setConversationList(result as SelectedUser[]);
    };
    fetchConversationList();
  }, [userId, sendRequest]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <MessagesModalListItem key={o.userId} onClose={onClose} otherUser={o} />
      ))}
    </List>
  );
};

export default MessagesList;
