import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import SearchBar from "../Common/SearchBar";
import ConversationListItem from "./ConversationListItem";
import NewMessageModal from "./NewMessageModal/NewMessageModal";

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
  const [messageModal, showMessageModal] = useState(false);

  const conversations = useAppSelector((state) => state.messages.conversations);
  const selectedConversationUserId = useAppSelector(
    (state) => state.messages.selectedConversation.userId,
  );
  const userId = useAppSelector((state) => state.user.userId);

  const navigate = useNavigate();

  return (
    <>
      <Box sx={styles.header}>
        <Typography variant="h2">Messages</Typography>
        <IconButton onClick={() => showMessageModal(true)}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search messages" />
      </Box>
      <Divider />
      <List component="div">
        {conversations.map((o) => (
          <ConversationListItem
            conversation={o}
            key={o.userId}
            onClick={() => {
              navigate(`/messages/${userId}/${o.userId}`);
            }}
            selected={selectedConversationUserId === o.userId}
          />
        ))}
      </List>
      <NewMessageModal
        activeConversations={conversations.map((o) => ({
          displayName: o.displayName,
          imageUrl: o.imageUrl,
          userId: o.userId,
          username: o.username,
        }))}
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </>
  );
};

export default ConversationList;
