import { useState, useEffect } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import MessagesModalListItem from "./MessagesModalListItem";
import { SelectedUser } from "../../../state/slices/messagesSlice";
import useAxios from "../../../utilities/useAxios";

type MessagesListProps = {
  onClose: () => void;
};

const MessagesList = ({ onClose }: MessagesListProps) => {
  const user = useAppSelector((state) => state.user);
  const [conversationList, setConversationList] = useState<SelectedUser[]>([]);
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await sendRequest({
        endpoint: "messages/getModalConversations",
        method: "GET",
      });
      setConversationList(result as SelectedUser[]);
    };
    fetchConversationList();
  }, [user, sendRequest]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <MessagesModalListItem otherUser={o} key={o.userId} onClose={onClose} />
      ))}
    </List>
  );
};

export default MessagesList;
