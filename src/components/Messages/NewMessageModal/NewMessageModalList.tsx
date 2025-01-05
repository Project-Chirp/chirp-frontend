import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../state/hooks";
import { Conversation } from "../../../types/messages";
import useAxios from "../../../utilities/useAxios";

const styles = {
  avatar: { margin: "auto" },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
};

type NewMessageModalListProps = {
  onSelect: (userId: number) => void;
};

const NewMessageModalList = ({ onSelect }: NewMessageModalListProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchConversationList = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { userId },
        },
        "messages",
      );
      setConversationList(result);
    };
    fetchConversationList();
  }, [userId, sendRequest]);

  return (
    <List component="div">
      {conversationList.map((o) => (
        <ListItemButton key={o.userId} onClick={() => onSelect(o.userId)}>
          <Box sx={styles.container}>
            <ListItemAvatar sx={styles.avatar}>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={o.displayName}
              primaryTypographyProps={{ variant: "subtitle1" }}
              secondary={`@${o.username}`}
              secondaryTypographyProps={{ variant: "subtitle2" }}
            />
          </Box>
        </ListItemButton>
      ))}
    </List>
  );
};

export default NewMessageModalList;
