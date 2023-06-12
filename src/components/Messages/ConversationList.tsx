import axios from "axios";
import { useState, useEffect } from "react";
import ConversationListItem, {
  LatestMessageDetails,
} from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../state/slices/messagesSlice";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SearchBar from "../Common/SearchBar";

const styles = {
  container: {
    maxWidth: "30%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
    paddingBottom: 0,
  },
};

const ConversationList = () => {
  const selectedConversation = useAppSelector((state) => state.messages);
  const [latestMessageDetails, setlatestMessageDetails] = useState<
    LatestMessageDetails[]
  >([]);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get("http://localhost:3001/api/messages", {
        params: {
          userId: user.userId,
        },
      });
      setlatestMessageDetails(result.data as LatestMessageDetails[]);
    };
    fetchMessages();
  }, [user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h6">Messages</Typography>
        <IconButton>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
      <SearchBar placeholder="Search Messages" />
      <Divider />
      <List component="div">
        {latestMessageDetails.map((o) => (
          <ConversationListItem
            key={o.otherUserId}
            latestMessageDetails={o}
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
    </Box>
  );
};

export default ConversationList;
