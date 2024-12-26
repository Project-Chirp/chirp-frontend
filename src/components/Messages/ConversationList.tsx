import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setConversations } from "../../state/slices/messagesSlice";
import useAxios from "../../utilities/useAxios";
import SearchBar from "../Common/SearchBar";
import ConversationListItem from "./ConversationListItem";
import CreateMessageModal from "./CreateMessageModal/CreateMessageModal";

const styles = {
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 1,
    paddingLeft: 2,
    paddingRight: 1,
  },
  searchBarContainer: { padding: 1 },
};

const ConversationList = () => {
  const { conversations, selectedConversation } = useAppSelector(
    (state) => state.messages,
  );
  const [messageModal, showMessageModal] = useState(false);
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchConversations = async () => {
      const conversations = await sendRequest(
        {
          method: "GET",
          params: { userId },
        },
        "messages",
      );
      dispatch(setConversations(conversations));
      console.log(conversations);
    };
    fetchConversations();
  }, [dispatch, userId, sendRequest]);

  return (
    <Box>
      <Box sx={styles.header}>
        <Typography variant="h2">Messages</Typography>
        <IconButton onClick={() => showMessageModal(true)}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Messages" />
      </Box>
      <Divider />
      <List component="div">
        {conversations.map((o) => (
          <ConversationListItem
            conversation={o}
            key={o.otherUserId}
            onClick={() => {
              navigate(`/messages/${userId}/${o.otherUserId}`);
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
