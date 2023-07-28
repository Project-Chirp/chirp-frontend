import { useEffect, useState } from "react";
import ConversationListItem from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  setConversations,
  setSelectedConversation,
} from "../../state/slices/messagesSlice";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SearchBar from "../Common/SearchBar";
import CreateMessageModal from "./CreateMessageModal/CreateMessageModal";
import useAxios from "../../utilities/useAxios";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingX: 2,
  },
};

const ConversationList = () => {
  const { conversations, selectedConversation } = useAppSelector(
    (state) => state.messages
  );
  const [messageModal, showMessageModal] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await sendRequest({
        url: "/messages",
        method: "get",
        params: { userId: user.userId },
      });
      dispatch(setConversations(result));
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  return (
    <Box>
      <Box sx={styles.header}>
        <Typography variant="h6">Messages</Typography>
        <IconButton onClick={() => showMessageModal(true)}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
      <SearchBar placeholder="Search Messages" />
      <Divider />
      <List component="div">
        {conversations.map((o) => (
          <ConversationListItem
            key={o.otherUserId}
            conversation={o}
            onClick={() => {
              dispatch(
                setSelectedConversation({
                  displayName: o.displayName,
                  username: o.username,
                  userId: o.otherUserId,
                })
              );
              navigate(`/messages/${user.userId}/${o.otherUserId}`);
            }}
            selected={selectedConversation.userId === o.otherUserId}
          />
        ))}
      </List>
      <CreateMessageModal
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </Box>
  );
};

export default ConversationList;
